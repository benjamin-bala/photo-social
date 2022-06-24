import React from 'react';
import Cardsm from '../Cardsm';
import { Link } from 'react-router-dom';

export default function Slider(props) {
  return (
    <div className='my-8'>
      <div className='flex justify-between items-center my-5'>
        <h2 className='text-semibold font-bold'>{props.name}</h2>
        <Link to={'/details'} className='text-sm cursor-pointer'>
          See all
        </Link>
      </div>
      <div className='flex gap-8 overflow-x-scroll'>
        <div className='flex-none'>
          <Cardsm />
        </div>
        <div className='flex-none'>
          <Cardsm />
        </div>
        <div className='flex-none'>
          <Cardsm />
        </div>
        <div className='flex-none'>
          <Cardsm />
        </div>
        <div className='flex-none'>
          <Cardsm />
        </div>
      </div>
    </div>
  );
}
