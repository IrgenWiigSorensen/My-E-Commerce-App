import { Fragment, useContext } from 'react';
import { Outlet, Link } from "react-router-dom";

import {ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
   
    const signOutHandler = async () => {
      await signOutUser();
    }

    return (
      <Fragment>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrwnLogo className='Logo' />
          </Link>
          <div className='links-container'>
            <Link className='nav-link' to='/'>
              SHOP
            </Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutHandler}> SIGN OUT</span>)
                : (<Link className='nav-link' to='/auth'> SIGN IN</Link>)
            }
            
          </div>
        </div>
        <Outlet /> 
      </Fragment>
    );
  };

  export default Navigation; 