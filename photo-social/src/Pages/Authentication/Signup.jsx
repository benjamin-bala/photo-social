import { useState, useContext, useEffect } from 'react';
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

  const { dispatch } = useContext(storeContext);

  async function createUser(e) {
    e.preventDefault();
    setResponse({ ...response, loading: true });
    let { data, loading, error } = await registerApi(
      email,
      password,
      fullname,
      username,
    );

    setTimeout(() => {
      setResponse({ ...response, loading, error, data });
    }, 1000);

    console.log('from register ', { data, loading, error });
  }

  useEffect(() => {
    response?.data?.token &&
      dispatch({ type: 'user', payload: response?.data });
  }, [response?.data, dispatch]);

  return (
    <div className='max-w-2xl mx-auto'>
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
          </div>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Username</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='text'
              placeholder='user1'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Password</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='password'
              placeholder='**********'
              onChange={(e) => setPassword(e.target.value)}
            />
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
              <p className='text-center text-sm'>
                Already have an account? Login
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
