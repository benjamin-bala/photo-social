import React from 'react';
import Roller from '../../Components/Loader/Roller';

export default function AdditionalInformation() {
  return (
    <div className='max-w-2xl mx-auto'>
      <form className='flex gap-6 flex-col justify-center items-center p-8'>
        <div className='my-6'>
          <h2 className='text-3xl'>Additional Information</h2>
        </div>
        <div className='w-full md:w-[500px]'>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Email</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='email'
              placeholder='Someone@photo.com'
            />
          </div>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Password</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='password'
              placeholder='**********'
            />
            <p className='text-sm my-1'>Forgot password?</p>
          </div>

          <div className='my-8 gap-5 flex flex-col justify-center items-center'>
            <div>
              <Roller />
            </div>
            <div>
              <button
                type='submit'
                className='btn bg-gray-400/50 hover:bg-gray-400/90 py-3 px-8 rounded-3xl w-[200px]'
              >
                Login
              </button>
            </div>

            <div className='w-full mt-8'>
              <p className='text-center text-sm'>
                Don't have an account? signup
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
