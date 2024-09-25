// import React from 'react';

function Navbar() {
  return (
    <nav className= 'text-white bg-slate-800 '>
      <div className="flex items-center justify-around px-4 py-5 mycontainer h-14">
        <div className='text-2xl font-bold text-white logo'>
          <span className="text-green-700"> &lt;</span>
           Pass
           <span className="text-green-700">OP/ &gt;</span>

        </div>
        {/* <ul>
            <li className='flex gap-3'>
                <a className='hover:font-bold' href="#">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul> */}
        <button className="flex items-center text-white bg-green-600 rounded-full w-28 justify-evenly ring-1 ring-white">
  <img className="w-8 my-1 rounded-full invert" src="/icons/GitHub-logo.png" alt="github" />
  
  <span className="font-bold"><a href="https://github.com/Ankit-singhtest/">GitHub</a></span>
</button>
        </div>
     </nav>
    
  );
}

export default Navbar;

