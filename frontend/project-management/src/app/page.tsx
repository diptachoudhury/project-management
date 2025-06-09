'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, User, Plus } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Mock task data (replace with API call to /tasks)
  const tasks = [
    { id: '1', title: 'Implement user authentication', status: 'pending', assignee: 'John Doe' },
    { id: '2', title: 'Design dashboard UI', status: 'in-progress', assignee: 'Jane Smith' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 240 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
              <nav className="mt-4 space-y-2">
                <Link href="/tasks" className="block p-2 rounded hover:bg-blue-100 text-gray-700">
                  All Tasks
                </Link>
                <Link href="/tasks/my-tasks" className="block p-2 rounded hover:bg-blue-100 text-gray-700">
                  My Tasks
                </Link>
                <Link href="/users" className="block p-2 rounded hover:bg-blue-100 text-gray-700">
                  Team
                </Link>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="focus:outline-none">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold">Jira Clone</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-2 py-1 rounded text-gray-800"
              />
            </div>
            <Link href="/tasks/create" className="bg-white text-blue-600 px-3 py-1 rounded flex items-center">
              <Plus size={20} className="mr-1" /> Create
            </Link>
            <button className="focus:outline-none">
              <User size={24} />
            </button>
          </div>
        </header>

        {/* Task Dashboard */}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded shadow-md"
              >
                <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600">Status: {task.status}</p>
                <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                <Link href={`/tasks/${task.id}`} className="text-blue-600 text-sm mt-2 inline-block">
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;