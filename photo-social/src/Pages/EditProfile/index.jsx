import { useContext, useEffect, useState } from 'react';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosArrowBack, IoMdExit } from 'react-icons/io';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { GET_PHOTOS, GET_USER } from '../../Api';
import { EDIT_USER } from '../../Api/userApi';
import Cardsm from '../../Components/Cardsm';
import Roller from '../../Components/Loader/Roller';
import { storeContext } from '../../Context';
import { GET_DATA, STORE_DATA } from '../../utils/localstorage';
import { uuid } from '../../utils/uuid';

export default function EditProfile() {
  const { state, dispatch } = useContext(storeContext);
  const user = state.user.user;
  const [file, setFile] = useState(null);
  let history = useNavigate();

  const [response, setResponse] = useState({
    loading: false,
    error: {},
  });

  function handleChange(event) {
    return setFile(event.target.files);
  }

  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    setResponse({ ...response, loading: true });

    event.preventDefault();
    const formData = new FormData(event.target);

    file && formData.set('image', formData.get('image'));
    formData.set('fullname', formData.get('fullname'));
    formData.set('user_id', state.user.user.id);

    // const {data, loading}

    const payload = { token: state.user.token, data: formData };

    let { data, loading, error } = await EDIT_USER(payload);

    // console.log(error);

    if (error.state) {
      setResponse({ ...response, loading, error });
    } else {
      setResponse({ error, loading });
      // dispatch({ type: 'photo', payload: data.data });
      setMessage('Profile updated!');

      // setTimeout(() => {
      //   navigate('/dash', { replace: true });
      // }, 2000);
    }
    let userFromStorage = GET_DATA('user');

    let newData = {
      user: {
        ...userFromStorage.user,
        ...data,
      },
      token: userFromStorage.token,
    };

    dispatch({ type: 'user', payload: newData });
  }

  console.log('user id ', state);

  return (
    <form method='post' onSubmit={(e) => handleSubmit(e)}>
      {message !== '' ? (
        <div className='fixed t-0 bg-white py-2 border-l-4 border-green-400'>
          <p className='pl-4 text-bold text-gray-800'>{message}</p>
        </div>
      ) : null}

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
        <div className='flex gap-5 flex-col'>
          <div className='flex flex-col justify-center items-center'>
            <div className='bg-gray-400/30 w-24 h-24 rounded-full'>
              <div className='flex items-center justify-center w-full h-full rounded-full object-cover'>
                {file &&
                  Object.keys(file).map((_url) => {
                    return (
                      <div key={uuid()}>
                        <img
                          src={URL.createObjectURL(file[_url])}
                          alt=''
                          className='w-24 h-24 rounded-full object-cover'
                        />
                        {/*<div className='absolute -top-1 -right-1 cursor-pointer bg-white rounded-full'>
                    <MdCancel className='hover:text-red-600' />
              </div>*/}
                      </div>
                    );
                  })}
                {!file && state.user.user.profile_pic.length > 0 ? (
                  <img
                    src={state.user.user.profile_pic}
                    alt=''
                    className='w-full h-full rounded-full object-cover'
                  />
                ) : (
                  !file && (
                    <div className='flex items-center justify-center w-full h-full rounded-full object-cover'>
                      <FaUserAlt size={30} fill={'#666'} />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className='my-6 flex justify-center items-center w-full'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-gray-300/60 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
              >
                <div className='flex flex-col justify-center items-center pt-5 pb-6'>
                  <FaUserAlt size={50} fill='#eaeaea' />
                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                    <span className='font-semibold'>
                      Click or drag and drop{' '}
                    </span>{' '}
                    to upload your prof.ile picture
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    PNG, JPG images only
                  </p>
                </div>
                <input
                  onChange={(event) => handleChange(event)}
                  type='file'
                  name='image'
                  className='hidden'
                  id='dropzone-file'
                />
              </label>
            </div>
          </div>
        </div>
        <div className='flex gap-10 items-center text-center border-b border-gray-100'></div>
      </div>
      <div>
        <div className=' w-full p-2'>
          <p className='mb-2 text-gray-500 text-sm'>Fullname</p>
          <input
            className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
            type='text'
            placeholder='Someonesaid'
            name='fullname'
            defaultValue={user.fullname}
          />
        </div>
        <div className=' w-full p-2'>
          <p className='mb-2 text-gray-500 text-sm'>Username</p>
          <input
            className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
            type='text'
            placeholder='Someonesaid'
            name='username'
            defaultValue={user.username}
            disabled={true}
          />
        </div>
        <div className=' w-full p-2'>
          <p className='mb-2 text-gray-500 text-sm'>Email</p>
          <input
            className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
            type='text'
            placeholder='Someonesaid'
            name='email'
            defaultValue={user.email}
            disabled={true}
          />
        </div>
      </div>
      <div className='my-5 flex items-center gap-4 flex-wrap'>
        <div>
          <button
            type='submit'
            className='flex items-center gap-3 btn bg-gray-400/50 hover:bg-gray-400/90 py-3 px-8 rounded-3xl w-full text-bold'
          >
            <BsFillBookmarkFill size={25} />
            Save
          </button>
        </div>
        <div className='my-5'>
          <button
            type='button'
            className='flex items-center gap-3 btn bg-red-800/80 hover:bg-red-600/90 py-3 px-8 rounded-3xl w-full text-bold text-white'
            onClick={() => {
              localStorage.removeItem('user');
              // dispatch({ type: 'user', payload: {} });
              history('/auth/login', { replace: true });
            }}
          >
            <IoMdExit size={25} />
            Signout
          </button>
        </div>
      </div>
    </form>
  );
}

function ProfileHeader({ user }) {
  let history = useNavigate();
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
      <div className='flex gap-5 flex-col'>
        <div className='flex flex-col justify-center items-center'>
          {/*<div className='bg-gray-400/30 w-24 h-24 rounded-full'>
            <img
              src='https://i.pinimg.com/236x/4e/9f/03/4e9f035d05faeb0561835197a51a51f5.jpg'
              alt=''
              className='w-full h-full rounded-full object-cover'
  />
<div className='flex items-center justify-center w-full h-full rounded-full object-cover'>
              <FaUserAlt size={30} fill={'#666'} />
            </div>

          </div>*/}
          <div className='my-6 flex justify-center items-center w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-gray-300/60 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            >
              <div className='flex flex-col justify-center items-center pt-5 pb-6'>
                <FaUserAlt size={50} fill='#eaeaea' />
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Click or drag and drop </span>{' '}
                  to upload your prof.ile picture
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  PNG, JPG images only
                </p>
              </div>
              <input
                // onChange={(event) => handleChange(event)}
                type='file'
                name='image'
                multiple
                className='hidden'
                id='dropzone-file'
              />
            </label>
          </div>
        </div>
      </div>
      <div className='flex gap-10 items-center text-center border-b border-gray-100'></div>
    </div>
  );
}

function Followers() {
  return (
    <div className='grid grid-cols-1 gap-5 py-5'>
      <FollowersCard />
      <FollowersCard />
      <FollowersCard />
    </div>
  );
}

function FollowersCard() {
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

function Photos({ response }) {
  return (
    <div className='grid grid-cols-2 gap-5 py-5'>
      {response.photo &&
        response.photo.map((_data) => {
          return <Cardsm key={uuid()} data={_data} />;
        })}
    </div>
  );
}

function Likes() {
  return (
    <div className='grid grid-cols-2 gap-5 py-5'>
      <Cardsm />
    </div>
  );
}
