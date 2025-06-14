'use client'

import { motion, AnimatePresence } from 'framer-motion' // Import motion and AnimatePresence from framer-motion

interface TicketModalProps {
  isOpen: boolean
  onClose: () => void
  ticket: {
    _id: string
    title: string
    description: string
    status: 'pending' | 'in-progress' | 'completed'
    assignee: {
      _id: string
      name: string
      email: string
    }
    assignedBy: {
      _id: string
      name: string
      email: string
    }
    domain: string
    createdAt: string
    updatedAt: string
  }
}

export default function TicketModal({ isOpen, onClose, ticket }: TicketModalProps) {
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    
    <AnimatePresence>
      
      {isOpen && (
       
        <div className="relative z-50">
          {/* Overlay / Backdrop */}
          
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-150"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
            onClick={onClose} 
          />

          
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
             
              <motion.div
                className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                transition={{ duration: 0.3 }} 
              >
                {/* Modal Header and Close Button */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {ticket.title}
                    </h3>
                    {/* Close button, replacing XMarkIcon with a simple SVG */}
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={onClose}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 whitespace-pre-line">
                      {ticket.description}
                    </p>
                  </div>

                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Assignee</h4>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 mr-2">
      
                          {ticket.assignee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{ticket.assignee.name}</p>
                          <p className="text-xs text-gray-500">{ticket.assignee.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Created By Details */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Created By</h4>
                      <div className="flex items-center">
                        {/* Created By initials avatar */}
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 mr-2">
                          {/* Generates initials from assignedBy's name */}
                          {ticket.assignedBy.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{ticket.assignedBy.name}</p>
                          <p className="text-xs text-gray-500">{ticket.assignedBy.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Selection */}
                    {/* <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Status</h4>
                      <select
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={ticket.status}
                        onChange={(e) => console.log(e.target.value)} 
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div> */}

                    {/* Created At Date */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500">Created At</h4>
                      <p className="text-sm text-gray-900">{formattedDate}</p>
                    </div>
                  </div>

                  {/* Action Buttons (Close and Save Changes) */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    {/* <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Save Changes
                    </button> */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
