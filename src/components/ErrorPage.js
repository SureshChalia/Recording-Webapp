import React from 'react'
import {Link} from 'react-router-dom';

const ErrorPage = () => {

  return (
    <div>
       <div className="flex justify-center items-center h-screen bg-[#F5F5F5]">
        <div className='flex flex-col gap-5'>
          <h1 className="lg:text-6xl font-bold text-2xl text-black">Oops!</h1>
          <p className="text-xl text-black">
            Sorry, an unexpected error has occurred.
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage