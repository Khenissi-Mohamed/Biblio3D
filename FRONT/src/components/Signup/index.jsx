import { Eye, EyeOff, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenModalLogin, setIsOpenModalSignup } from '../../store/reducers/modals';
import { useEffect, useState } from 'react';
import './styles.scss';
import { changeCredentialsValue } from '../../store/reducers/auth';
import { signup } from '../../api/signup';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  // logique pour l icon password donc je ne le stocke pas dans mes reducers
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // ----------------------------------- // 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { password, email, pseudo, lastname, firstname } = useSelector((state) => state.auth.credentials);
  // mon state isOpenModal

  const isOpenModalSignup = useSelector((state) => state.modals.isOpenModalSignup);

  // --------------inputs values---------------- //
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    dispatch(changeCredentialsValue({ name, value }));
  };

  // --------------submit---------------- //
  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    console.log('submit');
    // signup est la fonction qui va faire la requête située dans api/auth.jsx
    dispatch(signup(navigate));
  };


  const handleClickLoginModal = () => {
    dispatch(setIsOpenModalLogin(!setIsOpenModalLogin));
    }

  const handleCloseSignUp = () => {
    console.log('close');
    dispatch(setIsOpenModalSignup(!isOpenModalSignup));
  }

  useEffect(() => {
    if (isOpenModalSignup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpenModalSignup]);

  return (
    <dialog open={isOpenModalSignup} className={isOpenModalSignup ? 'dialog-active' : ''}>
      <div className="signup">
{/* Header */}
        <div className="header-modal">
            <h1 className="header-model-title">Sign up</h1>
          <X onClick={handleCloseSignUp} />
        </div>

{/*Formulaire  */}
        <form className="form" onSubmit={handleSubmitSignUp}>
          
          
              <div className="signup__field">
                <label>
                  Choose a pseudo: 20 characters maximum
                </label>
                <input onChange={handleChangeValue}
                  value={pseudo}
                  type="text"
                  name="pseudo"
                  className="signup__input"
                  placeholder="myPseudo"
                  maxLength="20" />
                {/* <label className="input-hint">
                    This field is mandatory
                  </label> */}
              </div>
              <div className="signup__field">
                <label>
                  Firstname:
                </label>
                <input onChange={handleChangeValue}
                  value={firstname}
                  type="text"
                  name="firstname"
                  className="signup__input"
                  placeholder="myFirstname"
                />
                {/* <label className="input-hint">
                    This field is required
                  </label> */}
              </div>
              <div className="signup__field">
                <label>
                  Lastname:
                </label>
                <input onChange={handleChangeValue}
                  value={lastname}
                  type="text"
                  name="lastname"
                  className="signup__input"
                  placeholder="myLastname" />
            </div>
              <div className="signup__field">
                <label>
                  Email:
                </label>
                <input onChange={handleChangeValue}
                  value={email}
                  type="email"
                  name="email"
                  className="signup__input"
                  placeholder="myEmail@mail.com" />
                {/* <label className="input-hint">
                    Email adress must contain @
                  </label> */}
              </div>
              <div className="signup__field">
                <label>
                  Create password:
                </label>
                <div className="signup__input-password">
                  <input onChange={handleChangeValue}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    name="password"
                    className="signup__input"
                    placeholder="8 characters minimum"
                  />
                  <span onClick={handleClickShowPassword} className='signup-password-icon-wrapper'>
                    {showPassword ? <EyeOff className="signup__input-icon-off" /> : <Eye className="signup__input-icon-off" />}
                  </span>
                  <label className="input-hint" />
                </div>
 
 {/* Buttons */}
              <div className="btns-wrapper">
                <button className="signup-btn" type='submit' >
                  Create an account
                </button>
Already have an account ?
                <button className="signup-btn-log" onClick={handleClickLoginModal}>
                  Log in
                </button>

              </div>
            </div>
        </form>
      </div>
    </dialog>
  );
};
export default Signup;
