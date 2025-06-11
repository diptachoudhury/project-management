import React from 'react';

export default function FeaturesSection() {
  return (
    <section className="relative bg-[#deebfe] py-20 lg:py-32 overflow-hidden">
      {/* Background wave pattern */}
      <div className='mx-auto max-w-screen-lg'>
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/assets/wave-pattern.svg")', // You'll need to create this SVG
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Feature Block 1: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 lg:mb-32">
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            {/* Image Placeholder 1: Kanban Board */}
            <img
              src="/images/kanban-board-mockup.png" // Placeholder, replace with your actual image path
              alt="Kanban Board Mockup"
              className="w-full max-w-md rounded-lg shadow-xl border border-gray-100"
            />
          </div>
          <div className="lg:w-1/2 text-gray-900 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Customize how your team's work flows
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              Set up, clean up, and automate even the most complicated project workflows.
            </p>
          </div>
        </div>

        {/* Feature Block 2: Image Right, Text Left */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20 lg:mb-32">
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            {/* Image Placeholder 2: Gantt Chart/Timeline */}
            <img
              src="/images/gantt-chart-mockup.png" // Placeholder, replace with your actual image path
              alt="Gantt Chart Mockup"
              className="w-full max-w-md rounded-lg shadow-xl border border-gray-100"
            />
          </div>
          <div className="lg:w-1/2 text-gray-900 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Stay on track - even when the track changes
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              Use the timeline view to map out the big picture, communicate updates to stakeholders, and ensure your team stays on the same page.
            </p>
          </div>
        </div>

        {/* Feature Block 3: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            {/* Image Placeholder 3: Detailed Task View */}
            <img
              src="/images/task-details-mockup.png" // Placeholder, replace with your actual image path
              alt="Task Details Mockup"
              className="w-full max-w-md rounded-lg shadow-xl border border-gray-100"
            />
          </div>
          <div className="lg:w-1/2 text-gray-900 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Bye-bye, spreadsheets
            </h2>
            <p className="text-lg md:text-xl text-gray-700">
              Keep every detail of a project centralized in real time so up-to-date info can flow freely across people, teams, and tools.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}