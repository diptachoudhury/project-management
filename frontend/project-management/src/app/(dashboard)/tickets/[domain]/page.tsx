'use client';

import apiProtected from "../../../../lib/axiosProtected";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import TicketCard from '../../../../components/TicketCard';
import CreateTicketModal from "../../../../components/models/CreateTicketModal";
import {use} from 'react';


interface RandomTask {
    id: string;
    key: string;
    summary: string; 
    description: string;
    issue_type: string;
    status: string;
    priority: string;
}


interface Ticket {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    assignee: {
        _id: string;
        name: string;
        email: string;
    }
    assignedBy: {
        _id: string;
        name: string;
        email: string;
    }
   domain: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
    _id: string,
        name: string,
        email: string,
        domain: string,
       createdAt: string,
        updatedAt: string,
        __v: number
}


async function fetchTicketData(): Promise<Ticket[]> {
 try {
    const res = await apiProtected.get('/tasks');
    if(res.status != 200){
        console.error('API response with non-200 status', res.status);
    }
    return res.data;

 }catch(error:any){
    console.error('Error in task api', error);
 }
}

async function fetchOrgUsers(): Promise<User[]>{
try {
    const res = await apiProtected.get('/users');
    if(res.status != 200){
        console.error('API response with non-200 status', res.status);
    }
    return res.data;

 }catch(error:any){
    console.error('Error in users api', error);
 }
}

async function fetchRandomTask(): Promise<RandomTask> {
    try {
        const res = await fetch('https://random-task.onrender.com/random_task'); // Use fetch for external API
        if (!res.ok) {
            const errorText = await res.text(); 
            throw new Error(`Failed to fetch random task: ${res.status} - ${errorText}`);
        }
        return res.json();
    } catch (error: any) {
        console.error('Error fetching random task:', error);
        throw error;
    }
}

export default function OrgTickets({
    params
}: {
    params:Promise<{ domain: string}>
}){

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null> (null);
    const [orgUsers, setOrgUsers] = useState<User[]>([]);
    
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

      // --- New State for Random Task ---
    const [randomTaskSummary, setRandomTaskSummary] = useState<string | null>(null);
    const [randomTaskLoading, setRandomTaskLoading] = useState<boolean>(false);
    const [randomTaskError, setRandomTaskError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    // --- End New State ---

 const toggleModal = () => setIsModalOpen(!isModalOpen);
 const {domain} =use(params);
 
    useEffect(() =>{
        
        const loadTickets = async() => {
         try{
            setLoading(true);
            setError(null);
            const data = await fetchTicketData();
            const userData  = await fetchOrgUsers();
            setTickets(data);
            setOrgUsers(userData);
         }  catch (err: any) {
            setError(err);
         }finally{
            setLoading(false);
         }

        }
        loadTickets();
    }, [])

  // --- New Function to Handle Random Task Generation ---
    const handleGenerateRandomTask = async () => {
        setRandomTaskLoading(true);
        setRandomTaskError(null);
        setCopySuccess(false); 
        try {
            const task = await fetchRandomTask();
            setRandomTaskSummary(task.summary);
        } catch (err: any) {
            setRandomTaskError(err.message || 'Failed to fetch random task.');
        } finally {
            setRandomTaskLoading(false);
        }
    };
    // --- End New Function ---

    // --- New Function to Copy Summary ---
    const handleCopySummary = async () => {
        if (randomTaskSummary) {
            try {
                await navigator.clipboard.writeText(randomTaskSummary);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 6000); 
            } catch (err) {
                console.error('Failed to copy text:', err);
              
            }
        }
    };
    // --- End New Function ---



    if(loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-400">Loading Tickets...</p>
            </div>
        )
    }

    if(error){
        return(
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-md font-semibold text-gray-500 ">Error Loading Tickets</h1>
                <p className=" text-xs text-gray-500 mt-4">{error?.message}</p>

                  <button
                    onClick={() => window.location.reload()} 
                    className="mt-6 px-4 py-2 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors font-semibold text-xs"
                >
                    Try Again
                </button>
                </div>

            </div>
        )
    }

    const  statusGroups ={
        pending: tickets.filter( ticket => ticket.status == "pending"),
        "in-progress": tickets.filter(ticket => ticket.status == 'in-progress'),
        completed: tickets.filter(ticket => ticket.status === "completed")
        
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8 pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="w-full flex justify-between max-w-7xl mx-auto">
            <div className="text-left pt-8 pb-12"> {/* Changed to text-left */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2"> {/* Using h1 for main title, adjusted size/weight */}
                Board 
              </h1>
              <p className="text-sm text-gray-400 w-1/2"> {/* Added description */} 
                This section displays all the active tasks and issues within your current sprint for the selected domain.
                Track progress, add tickets, and prioritize work efficiently.
              </p>
              {/* --- Random Task Section --- */}
                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-inner">
                            <h3 className="text-lg font-bold text-blue-800 mb-3">Feeling Stuck? Get a Random Task!</h3>
                            <button
                                onClick={handleGenerateRandomTask}
                                className="text-sm bg-blue-600 hover:bg-blue-700 text-white  py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={randomTaskLoading}
                            >
                                {randomTaskLoading ? 'Generating...' : 'Generate Random Task'}
                            </button>

                            {randomTaskError && (
                                <p className="text-red-500 text-sm mt-2">{randomTaskError}</p>
                            )}

                            {randomTaskSummary && (
                                <div className="mt-4 p-3 bg-white border border-gray-300 rounded-md flex items-center justify-between shadow-sm">
                                    <p className="text-gray-600 font-md font-medium break-words pr-2">{randomTaskSummary}</p>
                                    <button
                                        onClick={handleCopySummary}
                                        className="ml-2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                                        title="Copy Summary"
                                    >
                                        {copySuccess ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v2M8 8H6v2m-2-2h0v2" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* --- End Random Task Section --- */}
            </div>
            <div className="pt-12 pb-12"> <div className="text-gray-700  text-xs font-extrabold p-4 bg-gray-200 rounded-2xl">{decodeURIComponent(domain).replace(/\s+/g, '-')}</div></div>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(statusGroups).map(([status, groupTickets]) => (
                <motion.div
                key={status}
               initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-[#f1f2f6] rounded-xl shadow-lg border border-gray-200 overflow-hidden"
               >
                <div className="p-4 border-b border-gray-200 bg-gray-500">
                      <h2 className="font-medium text-white capitalize flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    status === 'pending' ? 'bg-red-500' :
                    status === 'in-progress' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                  {status.replace('-', ' ')} ({groupTickets.length})
                      </h2>
                </div>

        <div className="p-4 space-y-4">
                {groupTickets.length > 0 ? (
                  groupTickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No tickets in this status
                  </div>
                )}

                              

                <button   onClick={toggleModal} className="w-full bg-white py-2 px-3 text-sm text-gray-500 hover:text-gray-700 rounded-md border border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add ticket
                </button>
                <CreateTicketModal 
                   isOpen={isModalOpen}
                    onClose={toggleModal}
                    orgUsers={orgUsers}
                   
                   />
              </div>                  

                </motion.div>


            ))}
        </div>

        </div>
      </div>  
        
    )
}


