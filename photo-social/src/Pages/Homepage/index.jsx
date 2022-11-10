import React from 'react';
import { BiHomeCircle, BiSearchAlt } from 'react-icons/bi';
import { FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Spot from '../../assets/images/capture3.PNG';
import Feed from '../../assets/images/capture1.PNG';
import Explore from '../../assets/images/capture2.PNG';

export default function Homepage() {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-6xl p-5'>
        <p className='logo-text text-3xl'>YouTourism</p>
      </div>

      <section className='flex flex-col justify-center mx-auto min-h-[500px] max-w-6xl p-5'>
        <div className=''>
          <div>
            <h2 className='text-4xl md:text-5xl'>Find pretty places</h2>
            <p className='text-2xl md:text-3xl mt-3 text-gray-500'>near you</p>
          </div>
          <div className='my-8 flex gap-5 items-center flex-wrap'>
            <Link to={'/auth/signup'}>
              <div className='w-max bg-gray-900 px-8 py-3 rounded-xl'>
                <p className='text-white'>Find Now</p>
              </div>
            </Link>
            <Link to={'/auth/login'}>
              <div className='w-max border-2 border-gray-900 px-8 py-3 rounded-xl'>
                <p className=''>Login</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className='mb-16 flex flex-col justify-center mx-auto max-w-6xl p-5'>
        <div className='flex justify-center items-center'>
          <div className='max-w-xl'>
            <p className='text-2xl text-center text-gray-800/80'>
              YouTourism is an app and social network that lets people f.ind and
              share beautiful spaces around the world.
            </p>
          </div>
        </div>
      </section>

      <section className='my-6 flex flex-col justify-center mx-auto max-w-6xl p-5'>
        <div className='md:grid flex flex-col gap-5 md:grid-cols-[1fr,2fr,1fr]'>
          <div>
            <div className='flex items-center justify-center rounded-2xl bg-gray-400/50 h-14 w-14'>
              <FaLocationArrow size={20} />
            </div>
            <h3 className='text-2xl font-bold my-2'>Spots near you</h3>
          </div>
          <div>
            <div className='bg-gray-400/80 rounded w-full h-full'>
              <img src={Spot} alt='' />
            </div>
          </div>
          <div className='md:flex md:flex-col md:justify-center '>
            <h4 className='font-bold text-xl'>Discover places near you</h4>
            <p className='text-lg'>- Where is the closest spot to me?</p>
            <p className='text-lg'>- Who is visiting?</p>
          </div>
        </div>
      </section>

      <section className='my-6 flex flex-col justify-center mx-auto max-w-6xl p-5'>
        <div className='md:grid flex flex-col-reverse gap-5 md:grid-cols-[1fr,2fr,1fr]'>
          <div className='md:flex md:flex-col md:justify-center '>
            <h4 className='font-bold text-xl'>Content created for you</h4>
            <p className='text-lg'>
              - Which spot did my favorite influencer add?
            </p>
            <p className='text-lg'>- What cool spots do my friends like?</p>
            <p className='text-lg'>
              - Can I follow people with similar tastes?
            </p>
          </div>

          <div>
            <div className='bg-gray-400/80 rounded w-full h-full'>
              <img src={Explore} alt='' />
            </div>
          </div>
          <div>
            <div className='flex items-center justify-center rounded-2xl bg-gray-400/50 h-14 w-14'>
              <BiHomeCircle size={30} />
            </div>
            <h3 className='text-2xl font-bold my-2'>Feed</h3>
          </div>
        </div>
      </section>

      <section className='my-6 flex flex-col justify-center mx-auto max-w-6xl p-5'>
        <div className='md:grid flex flex-col gap-5 md:grid-cols-[1fr,2fr,1fr]'>
          <div>
            <div className='flex items-center justify-center rounded-2xl bg-gray-400/50 h-14 w-14'>
              <BiSearchAlt size={30} />
            </div>
            <h3 className='text-2xl font-bold my-2'>Explore</h3>
          </div>
          <div>
            <div className='bg-gray-400/80 rounded w-full h-full'>
              <img src={Feed} alt='' />
            </div>
          </div>
          <div className='md:flex md:flex-col md:justify-center '>
            <h4 className='font-bold text-xl'>Search for spots easily</h4>
            <p className='text-lg'>- What pretty places are trending?</p>
            <p className='text-lg'>- Can i explore new cities from my bed?</p>
          </div>
        </div>
      </section>

      <section className='my-6 flex flex-col justify-center mx-auto max-w-6xl p-5 h-[500px] flex flex-col gap-4 items-center justify-items-center'>
        <h3 className='mb-5 text-center max-w-[500px] text-4xl font-bold'>
          Sign up to explore the beauty around you
        </h3>
        <Link to={'/auth/signup'}>
          <div className='w-max bg-gray-900 px-8 py-3 rounded-xl'>
            <p className='text-white'>Find Now</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
