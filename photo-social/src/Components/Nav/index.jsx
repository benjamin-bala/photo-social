import React from 'react';
import { BiHomeCircle, BiSearch } from 'react-icons/bi';
import { BsFillPlusCircleFill, BsFillBookmarkFill } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { uuid } from '../../utils/uuid';

export default function Nav() {
  const [active] = React.useState('home');
  let { pathname } = useLocation();

  let navLinks = [
    {
      name: 'Home',
      link: '/dash',
      icon: BiHomeCircle,
    },
    {
      name: 'Search',
      link: '/dash/search',
      icon: BiSearch,
    },
    {
      name: 'Add',
      link: '/dash/add',
      icon: BsFillPlusCircleFill,
    },
    {
      name: 'Save',
      link: '/dash/collection',
      icon: BsFillBookmarkFill,
    },
    {
      name: 'Profile',
      link: '/dash/profile',
      icon: FaRegUser,
    },
  ];

  return (
    <div className='border-t-2 border-gray-100 bg-white shadow'>
      <div className='max-w-xl mx-auto py-5 px-8'>
        <div className='flex items-center justify-evenly'>
          {navLinks.map((link, index) => {
            return (
              <div
                key={uuid()}
                className='md:flex-1 md:mx-0 mx-4 cursor-pointer'
              >
                <Link to={link.link}>
                  <link.icon
                    size={link.name === 'Add' ? 45 : 22}
                    fill={link.link === pathname ? '#000' : 'gray'}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
