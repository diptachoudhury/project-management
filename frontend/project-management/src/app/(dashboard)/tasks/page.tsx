'use client';

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast'; // For displaying notifications
import apiProtected from '../../../lib/axiosProtected'; 
import { motion, AnimatePresence } from 'framer-motion'; 

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignee: {
    _id: string;
    name: string;
    email: string;
  };
  assignedBy: {
    _id: string;
    name: string;
    email: string;
  };
  domain: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TaskCardProps {
  task: Ticket;
  onStatusUpdate: () => void; 
}

function TaskCard({ task, onStatusUpdate }: TaskCardProps) {
  const [currentStatus, setCurrentStatus] = useState<Ticket['status']>(task.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Ticket['status'];
    setIsUpdating(true); 

    try {
      // Make the PATCH request to update the task status
      const response = await apiProtected.patch(`/tasks/${task._id}`, { status: newStatus });

      if (response.status === 200) {
        setCurrentStatus(newStatus); // Update local state on success
        toast.success(`Task "${task.title}" status updated to ${newStatus.replace('-', ' ')}!`);
        onStatusUpdate(); // Trigger re-fetch in parent to update columns
      } else {
        const errorMessage = response.data?.message || `Failed to update status for task: ${task.title}`;
        toast.error(errorMessage);
        console.error('API response with non-200 status:', response.status, response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred while updating status.';
      toast.error(errorMessage);
      console.error('Error updating task status:', err);
    } finally {
      setIsUpdating(false); // Reset update status
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-800 bg-yellow-100';
      case 'in-progress':
        return 'text-blue-800 bg-blue-100';
      case 'completed':
        return 'text-green-800 bg-green-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
        <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
        <span className={`px-2 py-0.5 rounded ${getStatusColor(currentStatus)}`}>
          {currentStatus.replace(/-/g, ' ').toUpperCase()}
        </span>
      </div>
      <div className="text-sm text-gray-700 space-y-1 mb-3">
        <p><span className="font-medium">Assigned To:</span> {task.assignee.name}</p>
        <p><span className="font-medium">Assigned By:</span> {task.assignedBy.name}</p>
      </div>

      {/* Status Update Dropdown */}
      <div>
        <label htmlFor={`status-select-${task._id}`} className="block text-xs font-medium text-gray-500 mb-1">
          Update Status
        </label>
        <select
          id={`status-select-${task._id}`}
          value={currentStatus}
          onChange={handleStatusChange}
          disabled={isUpdating} // Disable while updating
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}


// --- MyTasksPage Component ---
export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiProtected.get('/tasks/my-tasks');
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        const errorMessage = response.data?.message || `Failed to fetch tasks with status: ${response.status}`;
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred while fetching tasks.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching my tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyTasks();
  }, [fetchMyTasks]); 

  const statusGroups = {
    'pending': tasks.filter(task => task.status === 'pending'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    'completed': tasks.filter(task => task.status === 'completed'),
  };

  // Helper function for column header background colors
  const getColumnHeaderBgColor = (status: keyof typeof statusGroups) => {
    switch (status) {
      case 'pending': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[calc(100vh-120px)] p-6">
        <div className="text-xl font-medium text-gray-700">Loading your assigned tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full min-h-[calc(100vh-120px)] p-6">
        <div className="text-xl font-medium text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
                  <div className="w-full flex justify-between max-w-7xl mx-auto">
            <div className="text-left pt-8 pb-12"> {/* Changed to text-left */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2"> {/* Using h1 for main title, adjusted size/weight */}
               My Assigned Tasks
              </h1>
              <p className="text-sm text-gray-400 w-1/2"> {/* Added description */}
                This section displays all the active tasks and issues within your current sprint for the selected domain.
                Track progress, add tickets, and prioritize work efficiently.
              </p>
            </div>
            </div>

        {tasks.length === 0 && !loading && !error ? (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <p className="text-2xl font-medium text-gray-600">You currently have no tasks assigned.</p>
            <p className="text-md text-gray-500 mt-2">Time to relax, or perhaps create a new task!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(statusGroups).map(([status, groupTickets]) => (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Column Header */}
                <div className={`p-4 border-b border-gray-200 bg-gray-500`}>
                  <h2 className="font-medium text-white capitalize flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      status === 'pending' ? 'bg-red-500' : // Lighter shade for contrast on dark background
                      status === 'in-progress' ? 'bg-yellow-200' : // Lighter shade
                      status === 'completed' ? 'bg-green-200' : '' // Lighter shade
                    }`}></span>
                    {status.replace('-', ' ')} ({groupTickets.length})
                  </h2>
                </div>

                {/* Task List */}
                <div className="p-4 space-y-4">
                  {groupTickets.length > 0 ? (
                    <AnimatePresence>
                      {groupTickets.map(task => (
                        <motion.div
                          key={task._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }} // Animate out when task moves
                          transition={{ duration: 0.3 }}
                        >
                          <TaskCard task={task} onStatusUpdate={fetchMyTasks} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No tasks in this status
                    </div>
                  )}

                  {/* Optional: Add Task button (if relevant for this page) */}
                  {/* <button className="w-full py-2 px-3 text-sm text-gray-500 hover:text-gray-700 rounded-md border border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add task
                  </button> */}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
