import React from 'react';
import Cardsm from '../Cardsm';
import { Link } from 'react-router-dom';
import { uuid } from '../../utils/uuid';

export default function Slider(props) {
  const photoData = props.photo && props.photo.map((_data) => _data);

  return (
    <div className='my-8'>
      <div className='flex justify-between items-center my-5'>
        <h2 className='text-semibold font-bold'>{props.name}</h2>
        <Link
          state={photoData}
          to={'/dash/details'}
          className='text-sm cursor-pointer'
        >
          See all
        </Link>
      </div>
      <div className='flex flex-row-reverse gap-8 overflow-x-scroll'>
        {photoData.map((_data) => {
          return (
            <div key={uuid()} className='flex-none'>
              <Cardsm data={_data} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
