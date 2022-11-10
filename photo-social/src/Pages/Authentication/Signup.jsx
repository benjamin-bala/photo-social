import { useState, useContext, useEffect } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { registerApi } from '../../Api';
import Roller from '../../Components/Loader/Roller';
import { storeContext } from '../../Context';

export default function Signup() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [response, setResponse] = useState({
    loading: false,
    error: {},
  });

  const [message, setMessage] = useState('');

  let navigate = useNavigate();

  const { dispatch } = useContext(storeContext);

  async function createUser(e) {
    e.preventDefault();
    setResponse({ ...response, loading: true });

    if ([fullname, email, password, username].includes('')) {
      setResponse({
        ...response,
        error: {
          state: true,
          message: 'all fields are required',
        },
      });
    } else if (password.length < 7) {
      setResponse({
        ...response,
        error: {
          state: true,
          message: 'password too short',
        },
      });
    } else {
      let { data, loading, error } = await registerApi(
        email,
        fullname,
        password,
        username.toLowerCase(),
      );
      setTimeout(() => {
        if (data?.token) {
          setMessage('Account created successfully');
          // dispatch({ type: 'user', payload: data });
          setResponse({ ...response, loading, error, data });
          setTimeout(() => {
            navigate('/auth/login', { replace: true });
          }, 2000);
        } else {
          console.log(error);
          setResponse({ ...response, loading, error });
        }
      }, 1000);
    }

    // console.log('from register ', { data, loading, error });
  }

  useEffect(() => {
    // response?.data?.token &&
    //   dispatch({ type: 'user', payload: response?.data });
  }, [response?.data, dispatch]);

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='w-full flex items-center justify-between p-5'>
        <div className=''>
          <p className='logo-text text-3xl'>YouTourism</p>
        </div>
        <Link to={'/'}>
          <div className='w-max bg-gray-900 px-8 py-3 rounded-xl'>
            <p className='text-white'>Home</p>
          </div>
        </Link>
      </div>
      {message !== '' ? (
        <div className='fixed t-0 bg-white py-2 border-l-4 border-green-400'>
          <p className='pl-4 text-bold text-gray-800'>
            Account created successfully
          </p>
        </div>
      ) : null}
      <form className='flex gap-6 flex-col justify-center items-center p-8'>
        <div className='my-6 text-center'>
          <h2 className='text-3xl'>Create Account</h2>
          <p className='my-3 text-gray-500'>
            Create an account and f.ind pretty places near you
          </p>
        </div>
        <div className='w-full md:w-[500px]'>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Fullname</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='text'
              placeholder='John doe'
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Email</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='email'
              placeholder='Someone@photo.com'
              onChange={(e) => setEmail(e.target.value)}
            />
            {response?.error?.message &&
            response?.error?.message.includes('email') ? (
              <ErrorMessage message={'Email already exist'} />
            ) : null}
          </div>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Username</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='text'
              placeholder='user1'
              onChange={(e) => setUsername(e.target.value)}
            />
            {response?.error?.message &&
            response?.error?.message.includes('username') ? (
              <ErrorMessage message={'Username is taken'} />
            ) : null}
          </div>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Password</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='password'
              placeholder='**********'
              onChange={(e) => setPassword(e.target.value)}
            />
            {response?.error?.message &&
            response?.error?.message.includes('password') ? (
              <ErrorMessage
                message={'password must be more than 7 characters'}
              />
            ) : null}
          </div>

          <div className='my-4'>
            {response?.error?.message &&
            response?.error?.message.includes('required') ? (
              <ErrorMessage message={'Please f.ill out all f.ields'} />
            ) : null}
          </div>

          <div className='my-8 gap-5 flex flex-col justify-center items-center'>
            <div>
              {response.loading && response.loading ? <Roller /> : null}
            </div>
            <div>
              <button
                type='button'
                className='btn bg-gray-400/50 hover:bg-gray-400/90 py-3 px-8 rounded-3xl w-[200px]'
                onClick={(e) => createUser(e)}
              >
                Signup
              </button>
            </div>

            <div className='w-full mt-8'>
              <Link to={'/auth/login'}>
                <p className='text-center text-sm'>
                  Already have an account? Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function ErrorMessage(props) {
  return (
    <div className='flex items-center gap-2 text-red-600'>
      <BsExclamationCircleFill />
      <p className='text-sm font-bold'>{props.message}</p>
    </div>
  );
}
