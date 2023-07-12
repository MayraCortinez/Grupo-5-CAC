import React from 'react';
import {Link} from 'react-router-dom';
import useAuth  from '../../hooks/useAuth';

export const Sidebar = () => {
  
    const {auth} = useAuth(); 

  return (

      <div className='px-4 py-5 bg-white-border-b'>
        
        <aside className='md:w-80 px-5 py-10'>


            <div className='flex flex-col gap-4'>
            <div className='inline-flex justify-center flex-row gap-2'>
            <Link to='create-project' className='inline-flex justify-between flex-row gap-2 bg-pink-200/50 w-full p-3 text-pink-600 uppercase font-bold rounded-md items-center text-center  hover:bg-white'>
                Crear nuevo proyecto
                <img src="https://img.icons8.com/fluency/48/null/plus-2-math.png"/>
            </Link>
            </div>
            <div className='inline-flex justify-center flex-row gap-4'>
            <Link to='/' className='inline-flex justify-between flex-row gap-2 bg-pink-200/50 w-full p-3 text-pink-600 uppercase font-bold rounded-md items-center text-center  hover:bg-white'>
                Listar proyectos
            <img src="https://img.icons8.com/color/48/null/bulleted-list.png"/>
            </Link>
            </div>
            </div>
            
            
        </aside>

      </div>
  )
}
