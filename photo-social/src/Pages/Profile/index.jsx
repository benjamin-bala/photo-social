import { useContext, useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { Route, Routes, NavLink, useParams, Link } from 'react-router-dom';
import { FOLLOW_USER, GET_PHOTOS, GET_USER } from '../../Api';
import Cardsm from '../../Components/Cardsm';
import Roller from '../../Components/Loader/Roller';
import { storeContext } from '../../Context';
import { uuid } from '../../utils/uuid';

export default function Profile() {
  const { state } = useContext(storeContext);

  const [response, setResponse] = useState({
    loading: false,
    error: {},
  });

  let params = useParams();

  let paramsResult = Object.keys(params).map((_data) => {
    return params[_data];
  });

  let hasParam = paramsResult[0] === '' ? false : paramsResult[0];

  const [followClick, setFollowClick] = useState(false);

  async function followAccount(follower_id, user_id, token) {
    const { loading, error, data } = await FOLLOW_USER({
      follower_id,
      user_id,
      token,
    });

    if (!error.state) {
      setFollowClick(!followClick);
    }

    // console.log({ loading, error, data });
  }

  useEffect(() => {
    async function GET_PROFILE_DATA() {
      let _data = {
        token: state.user.token,
        id: hasParam ? hasParam : state.user.user.id,
      };
      const { error, loading, data } = await GET_USER(_data);

      if (error.state) {
        // setResponse({ ...response, loading, error });
        return { loading, error };
      } else {
        return { data, loading, error };
        // setResponse({ ...response, loading, error, data });
      }
    }

    async function GET_PROFILE_PHOTO() {
      const userData = await GET_PROFILE_DATA();
      let _data = {
        token: state.user.token,
        id: hasParam ? hasParam : state.user.user.id,
      };
      const { error, loading, data } = await GET_PHOTOS(_data.token, _data.id);

      console.log({ userData });

      if (error.state || userData.error.state) {
        setResponse({ ...response, loading, error });
      } else {
        setResponse({ ...response, photo: data.data, data: userData.data });
        // setTimeout(() => {
        //   response?.data && GET_PROFILE_DATA();
        // }, 500);
      }
    }

    state.user && GET_PROFILE_PHOTO();
    // state.user && GET_PROFILE_DATA();
  }, [followClick]);

  // console.log({ response });

  if (response.error.state) {
    return (
      <div className='flex flex-col h-[300px] justify-center items-center'>
        <BsExclamationCircleFill fill='red' size={30} />
        <p>There was an error getting the user information</p>
      </div>
    );
  }

  if (!response.photo && !response.data) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Roller />
      </div>
    );
  }

  return (
    <div>
      <ProfileHeader
        response={response}
        hasParam={hasParam}
        followAccount={followAccount}
      />

      <Routes>
        <Route path='/' element={<Photos response={response} />} />
        <Route path='/:id' element={<Photos response={response} />} />
        <Route path='/likes' element={<Likes />} />
        <Route path='/followers' element={<Followers />} />
      </Routes>
    </div>
  );
}

function ProfileHeader({ response, hasParam, followAccount }) {
  console.log('some ', response.data[0]);
  const { state } = useContext(storeContext);
  const { id } = state.user.user;

  let userInfo = response.data[0];

  function hasFollowedUser() {
    let hasFollowed = false;

    let user = userInfo.followers.filter((_id) => {
      return _id === id;
    });
    if (user.length > 0) hasFollowed = true;
    return hasFollowed;
  }

  let checkFollowers = hasFollowedUser();

  return (
    <div>
      <div className='flex gap-5 flex-col'>
        <div className='flex flex-col'>
          <div className='bg-gray-400/30 w-24 h-24 rounded-full'>
            {response.data[0].profile_pic.length > 0 ? (
              <img
                src={response.data[0].profile_pic}
                alt=''
                className='w-full h-full rounded-full object-cover'
              />
            ) : (
              <div className='flex items-center justify-center w-full h-full rounded-full object-cover'>
                <FaUserAlt size={30} fill={'#666'} />
              </div>
            )}
          </div>
          <div>
            <p className='text-xl capitalize'>
              {response.data && response.data[0].fullname}
            </p>
            <p className='text-bold text-lg'>
              @{response.data && response.data[0].username}
            </p>
          </div>
        </div>
        <div>
          <div>
            <div className='flex gap-5 items-center text-center'>
              <NavLink to='' end>
                <div className='py-3'>
                  <h4>Photos</h4>
                  <p>{response.photo && response.photo.length}</p>
                </div>
              </NavLink>
              <NavLink
                to=''
                // className={({ isActive }) =>
                //   isActive ? 'text-bold border-b-2 border-gray-600' : null
                // }
              >
                <div className='py-3'>
                  <h4>Followers</h4>
                  <p>{response.data && response.data[0].followers.length}</p>
                </div>
              </NavLink>
              <NavLink
                to=''
                // className={({ isActive }) =>
                //   isActive ? 'text-bold border-b-2 border-gray-600' : null
                // }
              >
                <div className='py-3'>
                  <h4>Following</h4>
                  <p>{response.data && response.data[0].following.length}</p>
                </div>
              </NavLink>
            </div>
          </div>
          <div className='my-5 w-full'>
            {!hasParam || hasParam === id ? (
              <Link
                to={'/dash/edit-profile'}
                className='btn bg-gray-400/50 hover:bg-gray-400/90 py-3 px-8 rounded-3xl w-full md:w-[230px]'
              >
                Edit account
              </Link>
            ) : (
              <button
                onClick={() => followAccount(hasParam, id, state.user.token)}
                className='btn bg-gray-400/50 hover:bg-gray-400/90 py-3 px-8 rounded-3xl w-full md:w-[230px]'
              >
                {!checkFollowers ? 'Follow' : 'Unfollow'}
              </button>
            )}
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
      {/*<FollowersCard />
      <FollowersCard />
  <FollowersCard />*/}
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
    <div>
      {response.photo && response.photo.length <= 0 ? (
        <div className='mt-20'>
          <div className='flex flex-col justify-center items-center'>
            <div className='bg-gray-400/20 h-16 w-16 rounded-full flex items-center justify-center'>
              <AiFillCamera size={25} fill='#000' />
            </div>
            <div className='text-center my-3'>
              <h4 className='text-semibold font-semibold'>Nothing here yet</h4>
              <p>You'll see photos here when they are uploaded.</p>
            </div>
          </div>
        </div>
      ) : null}
      <div className='grid grid-cols-2 gap-5 py-5'>
        {response.photo &&
          response.photo.map((_data) => {
            return <Cardsm key={uuid()} data={_data} />;
          })}
      </div>
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
