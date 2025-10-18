import React from 'react'

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated
}) => {
  return (
    <div className='flex flex-col gap-4 bg-white relative overflow-hidden mt-4'>
      {/* Content Section */}
      <div className='container mx-auto px-10 md:px-8 relative z-10'>
        <div className='h-[20px] flex flex-col justify-center'>
          <div className='flex items-center'>
            <div className='flex-grow'>
              <div className='flex flex-col sm:items-center sm:gap-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>{role}</h2>
                <p className='text-gray-600'>{topicsToFocus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Pills */}
        <div className='flex items-center gap-3 mt-2'>
          <div className='bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium'>
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>
          <div className='bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium'>
            {questions} Q&A
          </div>
          <div className='bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium'>
            Last Updated: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Background Blobs */}
      <div className='absolute top-0 right-0 w-[50vw]  h-[200px] overflow-hidden flex items-center justify-end pointer-events-none'>
        <div className='absolute w-40 h-40 bg-lime-400 blur-[90px] opacity-60 top-10 right-20 animate-blob1'></div>
        <div className='absolute w-40 h-40 bg-teal-400 blur-[90px] opacity-60 top-20 right-40 animate-blob2'></div>
        <div className='absolute w-40 h-40 bg-cyan-400 blur-[90px] opacity-60 top-40 right-10 animate-blob3'></div>
        <div className='absolute w-40 h-40 bg-fuchsia-400 blur-[90px] opacity-60 top-0 right-0 animate-blob4'></div>
      </div>
    </div>
  )
}

export default RoleInfoHeader
