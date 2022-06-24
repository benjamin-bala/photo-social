import React from 'react';

export default function Feed() {
  return (
    <div className='my-5'>
      <div>
        <div className='flex gap-4 items-center'>
          <div className='bg-gray-400/30 w-12 h-12 rounded-full'>
            <img
              src='https://i.pinimg.com/236x/4e/9f/03/4e9f035d05faeb0561835197a51a51f5.jpg'
              alt=''
              className='w-full h-full rounded-full object-cover'
            />
          </div>
          <div>
            <p className='text-semibold mb-1 text-sm'>@backdrop</p>
            <p className='text-sm text-gray-500'>
              Published a new spot{' '}
              <span className='text-black ml-4 text-semibold font-bold'>
                &#8226; 33d
              </span>
            </p>
          </div>
        </div>
        <div className='my-4'>
          <div className='h-[350px] md:h-[500px] w-full bg-gray-400/30 rounded-lg'>
            <img
              src='https://pbs.twimg.com/media/E286aBkWQAACTpE.jpg'
              alt=''
              className='w-full h-full rounded-lg object-cover'
            />
          </div>
        </div>
        <div className='my-6'>
          <h3 className='text-semibold font-bold my-3'>Pleasure Park (PPK)</h3>
          <p className='text-gray-700 text-sm'>
            If you are looking to soak in nature from a distance preferably from
            an antique velvet chaise lounge then you'd
          </p>
        </div>
      </div>
    </div>
  );
}
