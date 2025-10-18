import React, { useState } from 'react'
import { LucideCheck,LucidePencil, Target } from 'lucide-react'
const TiteleInput = ({title,setTitle}) => {
    const [showInput, setShowInput] = useState(false);
  return (
    <div className='flex items-center gap-3'>
          {showInput ? (
              <>
                  <input type="text"
                      placeholder='Resume Title'
                      className='text-sm md:text-[17px] bg-transparent outline-none text-black font-semibold border border-gray-300 pb-1.5'
                      value={title}
                      onChange={({ target }) => setTitle(target.value)}></input>
                  <button className='cursor-pointer'>
                      <LucideCheck className='text-[16px] text-purple-600'
                      onClick={()=>setShowInput((prevState)=>!prevState)}/>
                  </button>
              </>
          ) : (
                  <>
                      <h2 className='text-sm md:text-[17px] font-semibold'>{title}</h2>
                      <button className='cursor-pointer'>
                          <LucidePencil className='text-sm text-purple-600'
                          onClick={()=>setShowInput((prevState) => !prevState)}/>
                      </button>
                  </>    
          )
      }
    </div>
  )
}

export default TiteleInput
