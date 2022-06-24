import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Cardsm from '../../Components/Cardsm';
import { useNavigate } from 'react-router-dom';

export default function Details() {
  let history = useNavigate();
  return (
    <div>
      <div
        onClick={() => history(-1)}
        className='cursor-pointer flex gap-4 items-center my-5'
      >
        <IoIosArrowBack size={20} />
        <span>
          <h3 className='text-semibold font-semibold'>
            Recently added backdrops
          </h3>
        </span>
      </div>

      <div className='grid grid-cols-2 gap-5'>
        <Cardsm />
        <Cardsm />
        <Cardsm />
        <Cardsm />
      </div>
    </div>
  );
}
