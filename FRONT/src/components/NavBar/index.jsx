import './styles.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'react-feather';
import { setIsScrolling, setIsCliked } from '../../store/reducers/navbar';
import reactLogo from '../../assets/react.svg';
import MobileMenu from './MobileMenu';
import { Link, useNavigate } from 'react-router-dom';
import { setIsOpenModalLogin, setIsOpenModalSignup, setIsOpenModalUpLoad } from '../../store/reducers/modals';
import { logout } from '../../store/reducers/auth';
import { sendNotification } from '../../store/reducers/notification';

const NavBar = () => {
  const dispatch = useDispatch();

  const isScrolling = useSelector((state) => state.navbar.isScrolling);
  const isCliked = useSelector((state) => state.navbar.isCliked);
  // modals
  const isOpenModalLogin = useSelector((state) => state.modals.isOpenModalLogin);
  const isOpenModalSignup = useSelector((state) => state.modals.isOpenModalSignup);
  const isOpenModalUpLoad = useSelector((state) => state.modals.isOpenModalUpLoad);

  const logged = useSelector((state) => state.auth.logged);


  const handleCloseLoginProfile = () => {
    navigate('/profile');
  }
  // Route member dashboard
  const handleDashboard = () => {
    navigate('/dashboard');
  }


  const handleSignOut = () => {
    dispatch(logout())
    localStorage.clear();
    dispatch(sendNotification('Vous êtes déconnecté !'))
    navigate('/');
    // window.location.reload();
  }

  // close modal
  const handleCloseLogin = () => {
    // console.log('close');
    dispatch(setIsOpenModalLogin(!isOpenModalLogin))
    window.scrollTo(0, 0);
  }
  const handleCloseSignUp = () => {
    console.log('close');
    dispatch(setIsOpenModalSignup(!isOpenModalSignup))
    window.scrollTo(0, 0);

  }
  const handleCloseUpLoad = () => {
    console.log('close');
    navigate('/dashboard')
    dispatch(setIsOpenModalUpLoad(!isOpenModalUpLoad))
    window.scrollTo(0, 0);
  }



  // change background color of navbar when scroll down an up
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      dispatch(setIsScrolling(true));
    } else {
      dispatch(setIsScrolling(false));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  // toggle menu when click on the button
  const handleToggleMenu = () => {
    dispatch(setIsCliked(!isCliked));
  };
  // onclick on the logo, redirect to the homepage
  const navigate = useNavigate();
  const homePageRedirect = () => {
    navigate('/');
  };



  return (
    <div className={`navbar ${isScrolling ? 'navbar active' : ''}`}>
      <div className="navbar__logo-container">
        <Link onClick={homePageRedirect} to="/"><img src={reactLogo} className='nav-logo' alt="react" /></Link>
        <h1 className={`navbar__title-logo ${isScrolling ? 'navbar__title-logo active' : ''}`}>Biblio 3d</h1>
      </div>
      <form className="navbar__search-bar">
        <Search className="navbar__search-icon" />
        <input type="search" className="navbar__search" placeholder="Search 3D models" />
      </form>

      {!logged ? ( // if not logged
        <div className="navbar__btn-container">
          <button onClick={handleCloseLogin}
            className={`navbar__login ${isScrolling ? "navbar__login active" : ""}`}>
            LOGIN
          </button>
          <button onClick={handleCloseSignUp}
            className="navbar__signup">
            SIGN UP
          </button>
        </div>

      ) : ( // if logged

        <div className="navbar__btn-container">

          {/* // Dashboard menu */}
          <button onClick={handleDashboard}
            className={`navbar__profile ${isScrolling ? "navbar__profile active" : ""}`}>
            Dashboard
          </button>

          <button onClick={handleCloseLoginProfile}
            className={`navbar__profile ${isScrolling ? "navbar__profile active" : ""}`}>
            PROFIL
          </button>

          <button onClick={handleSignOut}
            className="navbar__signup">
            SIGNOUT
          </button>
          <button onClick={handleCloseUpLoad}
            className="navbar__upload">
            UPLOAD
          </button>
        </div>

      )}
      <button className="navbar__device" onClick={handleToggleMenu} >
        <span className={`navbar__span-top ${isCliked ? 'navbar__span-top active' : ''}`} />
        <span className={`navbar__span-middle ${isCliked ? 'navbar__span-middle active' : ''}`} />
        <span className={`navbar__span-bottom ${isCliked ? 'navbar__span-bottom active' : ''}`} />
      </button>
      <MobileMenu />
    </div>
  );
};

export default NavBar;
