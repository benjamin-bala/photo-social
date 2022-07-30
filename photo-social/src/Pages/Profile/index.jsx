import React from 'react';
import Cardsm from '../../Components/Cardsm';

export default function Profile() {
  return (
    <div>
      <div className='flex gap-5'>
        <div className='bg-gray-400/30 w-24 h-24 rounded-full'>
          <img
            src='https://i.pinimg.com/236x/4e/9f/03/4e9f035d05faeb0561835197a51a51f5.jpg'
            alt=''
            className='w-full h-full rounded-full object-cover'
          />
        </div>
        <div>
          <div>
            <p className='text-xl capitalize'>Some name</p>
            <p className='text-bold text-lg'>@rete</p>
          </div>
          <div className='my-5 w-full'>
            <button
              name='login'
              type='button'
              className='btn bg-gray-400/50 hover:bg-gray-400/90 py-3 px-8 rounded-3xl w-full md:w-[230px]'
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center text-center border-b border-gray-100'>
        <div className='text-bold border-b-2 border-gray-600 py-3'>
          <h4>Photos</h4>
          <p>2</p>
        </div>
        <div>
          <h4>Likes</h4>
          <p>2</p>
        </div>
        <div>
          <h4>Collections</h4>
          <p>2</p>
        </div>
        <div>
          <h4>Followers</h4>
          <p>2</p>
        </div>
      </div>

      {/*<div className='grid grid-cols-2 gap-5 py-5'>
        <Cardsm />
        <Cardsm />
        <Cardsm />
        </div>*/}

      <div className='grid grid-cols-1 gap-5 py-5'>
        <Followers />
        <Followers />
        <Followers />
      </div>
    </div>
  );
}

function Followers() {
  return (
    <div className='flex items-center justify-between my-1'>
      <div className='flex items-center gap-2'>
        <div className='bg-gray-400/30 w-16 h-16 rounded-full'>
          <img
            src='https://i.pinimg.com/236x/4e/9f/03/4e9f035d05faeb0561835197a51a51f5.jpg'
            alt=''
            className='w-full h-full rounded-full object-cover'
          />
        </div>
        <div>
          <p className='text-lg capitalize'>Some name</p>
          <p className='text-bold text-sm'>@rete</p>
        </div>
      </div>
      <div>
        <div className='my-5 w-full'>
          <button
            type='button'
            className='btn bg-gray-400/50 hover:bg-gray-400/90 py-2 px-4 rounded-3xl w-full md:w-[140px]'
          >
            Following
          </button>
        </div>
      </div>
    </div>
  );
}

function Photos() {
  return <Cardsm />;
}
