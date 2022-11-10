import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Cardsm from '../../Components/Cardsm';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import Feed from '../../Components/Feed';
import { BsFillChatSquareTextFill } from 'react-icons/bs';
import { RiSendPlaneFill } from 'react-icons/ri';
import { COMMENT_PHOTO } from '../../Api/photoApi';
import { storeContext } from '../../Context';

export default function Comments() {
  let history = useNavigate();
  let { state } = useLocation();
  let userstate = useContext(storeContext);

  let [inputMessage, setInputMessage] = useState('');
  const inputRef = useRef();

  const [response, setResponse] = useState({
    loading: false,
    error: {},
  });

  const [comments, setComment] = useState(state.comments);

  async function handleSubmit(event) {
    setResponse({ ...response, loading: true });
    const formData = {
      photo_id: state.photo_id,
      user_id: userstate.state.user.user.id,
      comment: inputMessage,
      username: userstate.state.user.user.username,
    };

    // const {data, loading}

    const payload = { token: userstate.state.user.token, data: formData };

    let { data, loading, error } = await COMMENT_PHOTO(payload);

    if (error.state) {
      setResponse({ ...response, loading, error });
    } else {
      setInputMessage('');
      setResponse({ error, loading });
      // dispatch({ type: 'photo', payload: data.data });
      //  setMessage('Profile updated!');
      setComment(data.data.comments);
      // setTimeout(() => {
      //   navigate('/dash', { replace: true });
      // }, 2000);
    }
  }

  return (
    <div className='flex flex-col justify-between min-h-[75vh] mb-8'>
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
          {comments && comments.length < 1 && (
            <div className='flex flex-col items-center justify-center h-full overflow-y-scroll'>
              <BsFillChatSquareTextFill size={30} />{' '}
              <h2 className='text-lg'>No comments</h2>
            </div>
          )}

          {comments &&
            comments.length > 0 &&
            comments.map((_data) => {
              return (
                <div className='my-2' key={uuid()}>
                  <Link
                    to={`/dash/profile/${_data.user_id}`}
                    className='text-sm mb-1'
                  >
                    @{_data.username}
                  </Link>
                  <p className='text-black'>{_data.comment}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className='my-4 flex items-center border border-gray-400 px-2 rounded-lg'>
        <input
          className='form-input w-full outline-none py-3 px-1'
          placeholder='comment...'
          onChange={(e) => setInputMessage(e.target.value)}
          ref={inputRef}
          value={inputMessage}
        />
        <span onClick={() => handleSubmit()} className='mr-3 cursor-pointer'>
          <RiSendPlaneFill size={30} />
        </span>
      </div>
    </div>
  );
}
