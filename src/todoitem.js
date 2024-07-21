import React from 'react';
import { IoTrashBin } from "react-icons/io5";

export default function Todoitem({ title, checked, id, handlechange, handledel }) {
  const handleChange = (id) => {
    handlechange(id);
  };
  const handleDel = (id) => {
    handledel(id);
  };

  return (
    <li className='flex items-center m-2'>
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={()=>handleChange(id)}
          className="w-4 h-4 text-blue-600 bg-yellow-100 border-gray-300 rounded"
        />
      </div>
      <div className='ml-2'>
        <span className='popr text-lg font-medium'>{title}</span>
      </div>
      <IoTrashBin className='text-lg ml-3 cursor-pointer' onClick={()=>handleDel(id)} />
    </li>
  );
}
