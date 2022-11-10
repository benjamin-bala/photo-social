import React, { useContext, useEffect, useState } from 'react';
import { BsBookmark } from 'react-icons/bs';
import { GET_PHOTOS } from '../../Api';
import Cardsm from '../../Components/Cardsm';
import { storeContext } from '../../Context';
import { uuid } from '../../utils/uuid';

export default function Saved() {
  const { state } = useContext(storeContext);

  const [savedPhoto, setSavedPhoto] = useState([]);

  useEffect(() => {
    async function GET_PROFILE_PHOTO() {
      let _data = {
        token: state.user.token,
        id: state.user.user.saved_backdrops,
      };
      const { error, loading, data } = await GET_PHOTOS(_data.token);

      let newData = [];
      data.data.length > 0 &&
        data.data.map((_data) => {
          return (
            state.user &&
            state.user.user.saved_backdrops.map((_savedID) => {
              // console.log({ savedId: _savedID, posted_by: _data._id });
              if (_data._id === _savedID) {
                console.log('yesss');
                return newData.push(_data);
              }
            })
          );
        });

      setSavedPhoto(newData);

      // if (error.state || userData.error.state) {
      //   setResponse({ ...response, loading, error });
      // } else {
      //   setResponse({ ...response, photo: data.data, data: userData.data });
      //   // setTimeout(() => {
      //   //   response?.data && GET_PROFILE_DATA();
      //   // }, 500);
      // }
    }
    GET_PROFILE_PHOTO();
  }, []);

  return (
    <div>
      <div>
        <h3 className='text-semibold font-semibold text-lg'>Collections</h3>
      </div>
      {savedPhoto.length < 1 && (
        <div className='mt-20'>
          <div className='flex flex-col justify-center items-center'>
            <div className='bg-gray-400/20 h-16 w-16 rounded-full flex items-center justify-center'>
              <BsBookmark size={25} fill='#000' />
            </div>
            <div className='text-center my-3'>
              <h4 className='text-semibold font-semibold'>Nothing saved yet</h4>
              <p>You'll see the collections you save here.</p>
            </div>
          </div>
        </div>
      )}

      {savedPhoto.length >= 1 && (
        <div className='mt-10 grid grid-cols-2 gap-4'>
          {savedPhoto.map((_data) => {
            return <Cardsm data={_data} key={uuid()} />;
          })}
        </div>
      )}
    </div>
  );
}
