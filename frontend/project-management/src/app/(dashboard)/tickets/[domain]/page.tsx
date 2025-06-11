'use client';

import apiProtected from "../../../../lib/axiosProtected";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { motion } from 'framer-motion';
import TicketCard from '../../../../components/TicketCard';
import CreateTicketModal from "../../../../components/models/CreateTicketModal";

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



export default function OrgTickets({
    params
}: {
    params: { domain: string}
}){

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null> (null);
    const [orgUsers, setOrgUsers] = useState<User[]>([]);
    
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

 const toggleModal = () => setIsModalOpen(!isModalOpen);

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
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-2xl font-medium pt-8 pb-12">
            Tickets for <span className="text-[#6366f1]">{params.domain.toUpperCase()}</span>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(statusGroups).map(([status, groupTickets]) => (
                <motion.div
                key={status}
               initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
               >
                <div className="p-4 border-b border-gray-200 bg-[#6366f1]">
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

                              

                <button   onClick={toggleModal} className="w-full py-2 px-3 text-sm text-gray-500 hover:text-gray-700 rounded-md border border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center">
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


