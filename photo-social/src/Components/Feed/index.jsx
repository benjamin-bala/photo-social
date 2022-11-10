import React, { useContext, useState, useEffect } from 'react';
import { dateChecker } from '../../utils/dateChecker';
import { uuid } from '../../utils/uuid';
import Slider from 'react-slick';
import Carousel from 'nuka-carousel';
import { AiFillHeart } from 'react-icons/ai';
import { storeContext } from '../../Context';
import { LIKE_PHOTO, SAVE_PHOTO } from '../../Api';
import { Link } from 'react-router-dom';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';

export default function Feed({ data }) {
  const [likedPhoto, setLikePhoto] = useState(false);
  const { state, dispatch } = useContext(storeContext);

  const { id, saved_backdrops } = state.user.user;

  let userLink = data.posted_by !== id ? `/${data.posted_by}` : '/';

  //Quick fix (remove in a later update)
  const [likeData, setLikeData] = useState(null);

  async function likePhoto() {
    const payload = {
      token: state.user.token,
      data: {
        user_id: id,
        photo_id: data._id,
      },
    };
    const res = await LIKE_PHOTO(payload);

    if (res.data.message.toLowerCase() === 'success') {
      setLikePhoto(!likedPhoto);
      setLikeData(res.data.data);
    }
  }

  async function handleSavePhoto() {
    const payload = {
      token: state.user.token,
      data: {
        user_id: id,
        photo_id: data._id,
      },
    };
    const res = await SAVE_PHOTO(payload);

    console.log({ data: res, state: state.user });

    if (res.data.message.toLowerCase() === 'success') {
      let userData = {
        token: state.user.token,
        user: { ...res.data.data, id },
      };
      dispatch({ type: 'user', payload: userData });
      console.log(userData, ' userdata');
    }
  }

  const checkSavedPhoto = saved_backdrops.filter((_id) => {
    return _id === data._id;
  });

  useEffect(() => {
    data.likes.filter((likeId) => (id === likeId ? setLikePhoto(true) : null));
  }, [data.likes, id]);

  // console.log(state.user);

  console.log({ checkSavedPhoto });

  return (
    <div className='my-5'>
      <div>
        <div className='flex gap-4 items-center'>
          {/*
          Profile photo can add
          <div className='bg-gray-400/30 w-12 h-12 rounded-full'>
            <img
              src='https://i.pinimg.com/236x/4e/9f/03/4e9f035d05faeb0561835197a51a51f5.jpg'
              alt=''
              className='w-full h-full rounded-full object-cover'
            />
          </div>*/}
          <div>
            <Link to={`/dash/profile${userLink}`}>
              <p className='text-semibold mb-1 text-sm'>
                @{data && data.username}
              </p>
            </Link>
            <p className='text-sm text-gray-500'>
              Published a new spot{' '}
              <span className='text-black ml-4 text-semibold font-bold'>
                &#8226; {dateChecker(data.createdAt)}
              </span>
            </p>
          </div>
        </div>
        <div className='my-4'>
          <div className='h-[350px] md:h-[500px] w-full bg-gray-400/30 rounded-lg'>
            {data && data.photo[0] && (
              <img
                key={uuid()}
                src={data.photo[0]}
                alt=''
                className='w-full h-full rounded-lg object-cover'
              />
            )}

            {/*
            <Carousel wrapAround={true} slidesToShow={1}>
              {data && data.photo[1] && (
                <img
                  key={uuid()}
                  className='w-full h-[350px] md:h-[500px] object-cover'
                  src={data.photo[1]}
                  alt=''
                />
              )}
              {data && data.photo[2] && (
                <img
                  key={uuid()}
                  className='w-full h-[350px] md:h-[500px] object-cover'
                  src={data.photo[2]}
                  alt=''
                />
              )}
            </Carousel>
            
            <img
              key={uuid()}
              src={_data}
              alt=''
              className='w-full h-full rounded-lg object-cover'
        />*/}
          </div>
        </div>
        <div className='my-6'>
          <div className='flex items-center gap-4'>
            <div
              title='Like'
              className='my-1 cursor-pointer'
              onClick={() => likePhoto()}
            >
              <AiFillHeart
                size={25}
                stroke={likedPhoto ? 'red' : '#000'}
                strokeWidth={100}
                fill={likedPhoto ? 'red' : 'none'}
              />
            </div>
            <div
              onClick={() => handleSavePhoto()}
              title='Save photo'
              className='my-1 cursor-pointer'
            >
              {checkSavedPhoto && checkSavedPhoto.length > 0 ? (
                <BsFillBookmarkFill size={25} />
              ) : (
                <BsBookmark size={25} stroke={200} />
              )}
            </div>
          </div>
          <h3 className='text-semibold font-bold my-1'>{data && data.title}</h3>
          <p className='text-gray-700 text-sm'>{data && data.caption}</p>
          <p className='text-sm text-semibold mt-3'>Address 🌍</p>
          <p className='text-gray-700 text-sm'>{data && data.address}</p>
          <Link
            to={`/dash/comment/${data && data._id}`}
            state={data && { comments: data.comments, photo_id: data._id }}
            className='text-sm my-2 underline'
          >
            View Comments
          </Link>
          {/*<p className='text-sm text-semibold mt-3'>Tags 🔖</p>
          <div className='flex items-center gap-3 my-2'>
            {data &&
              data.tags.map((_data) => {
                return (
                  <p
                    key={uuid()}
                    className='bg-gray-300/50 px-2 py-1 rounded-lg'
                  >
                    #{_data}
                  </p>
                );
              })}
            </div>*/}
        </div>
      </div>
    </div>
  );
}
