'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import TicketModal from './TicketModal'

interface Ticket {
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

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const [isOpen, setIsOpen] = useState(false)
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-sm transition-shadow"
      >
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{ticket.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
          }`}>
            {ticket.status.replace('-', ' ')}
          </span>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
              {ticket.assignee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-sm text-gray-600">{ticket.assignee.name}</span>
          </div>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
      </motion.div>

      <TicketModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        ticket={ticket}
      />
    </>
  )
}