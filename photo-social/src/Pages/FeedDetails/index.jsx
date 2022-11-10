import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import Feed from '../../Components/Feed';

export default function FeedDetails() {
  let history = useNavigate();
  let { state } = useLocation();

  return (
    <div>
      <div
        onClick={() => history(-1)}
        className='cursor-pointer flex gap-4 items-center my-5'
      >
        <IoIosArrowBack size={20} />
        <span>
          <h3 className='text-semibold font-semibold'>Back</h3>
        </span>
      </div>

      <div className='flex flex-col'>
        <Feed data={state} />;
      </div>
    </div>
  );
}
