'use client'; 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import toast from 'react-hot-toast';
import apiProtected from '../../lib/axiosProtected'; 
interface User {
  _id: string;
  name: string;
}

interface CreateTicketModalProps {
  isOpen: boolean; 
  onClose: () => void;
  orgUsers: User[]; 
}

export default function CreateTicketModal({
  isOpen,
  onClose,
  orgUsers,
  
}: CreateTicketModalProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Disable button during submission

    // Basic validation
    if (!title || !description || !assigneeId) {
      toast.error('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {

   
      const payload = {
        title,
        description,
        assignee: assigneeId, 
      };

      const response = await apiProtected.post('/tasks', payload); // API endpoint to create tasks

      if (response.status === 201) { 
        setTitle('');
        setDescription('');
        setAssigneeId('');
        onClose();
      } else {
        const errorMessage = response.data?.message || `Failed to create ticket with status: ${response.status}`;
        toast.error(errorMessage);
        console.error('API response with non-201 status:', response.status, response.data);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred while creating ticket.';
      toast.error(errorMessage);
      console.error('Error creating ticket:', err);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative z-50">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose} // Allow closing modal by clicking backdrop
          />

          {/* Modal Content Container */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              {/* Actual Modal Panel */}
              <motion.div
                className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Modal Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold leading-6 text-gray-900">
                      Create New Ticket
                    </h3>
                    {/* Close button */}
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={onClose}
                    >
                      {/* Inline SVG for the close icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Ticket Title</label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={isSubmitting}
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
                      <select
                        id="assignee"
                        value={assigneeId}
                        onChange={(e) => setAssigneeId(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select an assignee</option>
                        {orgUsers.map(user => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={onClose}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Creating...' : 'Create Ticket'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
