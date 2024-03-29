import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Cardsm from '../../Components/Cardsm';
import { useNavigate, useLocation } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import Feed from '../../Components/Feed';

export default function Details() {
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

      <div className='flex flex-col-reverse '>
        {state &&
          state.map((_data) => {
            return <Feed key={uuid()} data={_data} />;
          })}
      </div>
    </div>
  );
}
