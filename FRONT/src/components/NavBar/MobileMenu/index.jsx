import { Link, useNavigate, useParams } from 'react-router-dom';
import { setIsOpenModalLogin, setIsOpenModalSignup } from '../../../store/reducers/modals';
import { setIsCliked } from '../../../store/reducers/navbar';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/reducers/auth';
import { useEffect } from 'react';
import { sendNotification } from '../../../store/reducers/notification';



function MobileMenu() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isCliked = useSelector((state) => state.navbar.isCliked);
  const isOpenModalLogin = useSelector((state) => state.modals.isOpenModalLogin);
  const isOpenModalSignup = useSelector((state) => state.modals.isOpenModalSignup);

  const logged = useSelector((state) => state.auth.logged);


  // toggle menu when click on the button
  const handleToggleMenu = () => {
    dispatch(setIsCliked(!isCliked));
  };

  const handleCloseLogin = () => {
    // console.log('close');
    dispatch(setIsOpenModalLogin(!isOpenModalLogin))
    handleToggleMenu();
    window.scrollTo(0, 0);
  }
  const handleCloseSignUp = () => {
    console.log('close');
    dispatch(setIsOpenModalSignup(!isOpenModalSignup))
    handleToggleMenu();
    window.scrollTo(0, 0);
  }

  const handlecloseMenu = () => {
    dispatch(setIsCliked(!isCliked));
    window.scrollTo(0, 0);

  }

  const handleGoProfile = () => {
    navigate('/profile');
    handlecloseMenu();
  }
  const handleSignOut = () => {
    localStorage.clear();
    dispatch(logout())
    dispatch(sendNotification('Vous êtes déconnecté !'))
    // window.location.reload();
    navigate('/');
    handlecloseMenu();
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    if (scrolled) {
      dispatch(setIsCliked(false));
    };
  };

  const handleCloseMenu = () => {
    handlecloseMenu();
  }

  const handleProfil = () => {
    handlecloseMenu();
  }
  const handleContact = () => {
    handlecloseMenu();
  }



  return (
    <div
      className={`menu ${isCliked ? 'menu active' : ''}`}
    >
      {!logged ? (
        <>
          <div className="menu__btn-container">
            <button onClick={handleCloseLogin} className="menu__btn1">LOGIN</button>
            <button onClick={handleCloseSignUp} className="menu__btn2">SIGNUP</button>
          </div>
          <div className="menu__links-container">
            <Link to='/contact' className="menu__link" onClick={handleContact}>Contact</Link>
          </div>
        </>
      ) : (
        <div className="menu__btn-container">
          <button onClick={handleGoProfile} className="menu__btn1">PROFIL</button>
          <button onClick={handleSignOut} className="menu__btn2">SIGNOUT</button>
        </div>
      )}
      <div className="menu__links-container">
        <Link to="/" className="menu__link" onClick={handlecloseMenu}>Home</Link>
        {logged && <Link to="/dashboard" className="menu__link" onClick={handlecloseMenu}>Dashboard</Link>}
        {logged && <Link to='/profile' className="menu__link" onClick={handleProfil}>Profil</Link>}
        {logged && <Link to='/contact' className="menu__link" onClick={handleContact}>Contact</Link>}
      </div>
    </div>
  )
}


export default MobileMenu