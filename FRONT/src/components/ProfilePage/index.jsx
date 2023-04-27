import { useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOne } from '../../api/profilUser';
import { deleteProfile } from '../../api/deleteProfil';
import { useNavigate } from 'react-router-dom';
import { uptadeProfile } from '../../api/uptdateProfile';
import { changeCredentialsValue, changeUptadeProfile, logout } from '../../store/reducers/auth';
import { X } from 'react-feather';
import { setIsOpenModalAlert, setIsOpenModalAlertProfile } from '../../store/reducers/modals';
import ModalAlertProfile from '../modalAlertDeleteProfile';
import { sendNotification } from '../../store/reducers/notification';

export default function ProfilPage() {

  //-----------------------------------//
  const { email, password, changePassword, firstname, lastname, pseudo, picture } = useSelector((state) => state.auth.credentials);
  const { credentials } = useSelector(state => state.auth);
  const { isOpenModalAlertProfile } = useSelector(state => state.modals);

  console.log(email, password, changePassword, firstname, lastname, pseudo, picture);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log('mon user', user);
  const id = localStorage.getItem('userId');

  console.log('mon id profilpage', id);

  useEffect(() => {
    // call api pour avoir les infos de l'utilisateur
    dispatch(fetchOne(id));
  }, []);


  // ----------------- deconnection ------------------//
  const handleLogout = () => {
    dispatch(logout());
    dispatch(sendNotification('Vous êtes déconnecté !'))
    navigate('/');
  }

  // //----------------- suppression du profile ------------------//
  // const handleDeleteProfile = useCallback(() => { // useCallback pour éviter de créer une nouvelle fonction à chaque render
  //   dispatch(deleteProfile(navigate));
  //   dispatch(logout());
  // }, [dispatch, navigate]);

  const handleModalAlert = (e) => {
    e.preventDefault();
    dispatch(setIsOpenModalAlertProfile(!isOpenModalAlertProfile))
    window.scrollTo(0, 0);
  }


  // ----------------- modification du profile ------------------//
  const handleUptdateProfile = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(); // on crée un objet FormData pour envoyer les données au back

    for (let [key, value] of Object.entries(credentials)) { // on boucle sur les clés et valeurs de credentials
      if (value !== null && value !== '') { // si la valeur n'est pas null et n'est pas vide
        formData.append(key, value); // on ajoute la clé et la valeur dans formData
      }
    }

    await dispatch(uptadeProfile(id, formData)); // on dispatch uptadeProfile qui va faire la requête axios
    dispatch(fetchOne(id)); // on dispatch fetchOne pour mettre à jour les données de l'utilisateur
  }, [credentials, dispatch, id]); // on met les dépendances dans le tableau pour que la fonction soit appelée à chaque changement de dépendance


  // ----------------- modification du profile ------------------//
  const handleChangeInputValue = useCallback((e) => {
    const { name, value, type, files } = e.target; // on récupère les infos de l'input
    const payload = { name, value, type, files }; // on crée un objet payload qui contient les infos de l'input

    if (type === "file") { // si le type de l'input est file
      payload.files = e.target.files; // on ajoute les fichiers dans payload
    }

    dispatch(changeUptadeProfile(payload)); // on dispatch changeUptadeProfile qui va mettre à jour le state credentials
  }, [dispatch]);



  const memoizedUser = useMemo(() => user, [user]); // on utilise useMemo pour éviter de créer un nouvel objet à chaque render

  console.log('memoizedUser', memoizedUser);
  useEffect(() => {
    dispatch(fetchOne(id));
  }, [dispatch, id]);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  }

  return (
    <>
      <div className='profil' >
        <div className="profil-content">
          <div className="profil-log">
            <X className='profil__close' onClick={() => navigate('/')} />
            <div className='profil__header'>{memoizedUser.pseudo}  </div>
            <div className='profil__header__avatar'>

              <img className='profil-avatar' src={memoizedUser.picture} alt='avatar' />
            </div>
            <div className='profil_btns-wrapper'>
              <button className='profil__btn' onClick={handleLogout}>
                Logout
              </button>
              <button className='profil__btn' onClick={handleModalAlert}>
                Delete
              </button>
            </div>
          </div>
          {/* un formulaire de modification d'un user */}
          <div className='profil-form'>
            <form className='profil__form' onSubmit={handleUptdateProfile} >

              <div className="profil-input-wraper">
                <label htmlFor='firstname' className='profil__form-label' >Firstname</label>
                <input onChange={handleChangeInputValue} className='profil__form-input'
                  value={firstname}
                  type='text'
                  name='firstname'
                  id='firstname'
                  placeholder={memoizedUser.firstname}
                />
              </div>

              <div className="profil-input-wraper">
                <label htmlFor='lastname' className='profil__form-label'>Lastname</label>
                <input onChange={handleChangeInputValue} className='profil__form-input'
                  value={lastname}
                  type='text'
                  name='lastname'
                  id='lastname'
                  placeholder={memoizedUser.lastname}
                />
              </div>
              <div className="profil-input-wraper">
                <label htmlFor='email' className='profil__form-label'>Email</label>
                <input onChange={handleChangeInputValue} className='profil__form-input'
                  value={email}
                  type='email'
                  name='email'
                  id='email'
                  placeholder={memoizedUser.email}
                />
              </div>

              <div className="profil-input-wraper">
                <label htmlFor='pseudo' className='profil__form-label'>Pseudo</label>
                <input onChange={handleChangeInputValue} className='profil__form-input'
                  value={pseudo}
                  type='text'
                  name='pseudo'
                  id='pseudo'
                  placeholder={memoizedUser.pseudo}
                />
              </div>

              <div className="profil-input-wraper">
                <label htmlFor='password' className='profil__form-label'>Password</label>
                <input onChange={handleChangeInputValue} className='profil__form-input'
                  value={password}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='XXXXXXX'
                />
              </div>

              <div className="profil-input-wraper">
                <label htmlFor='passwordConfirm' className='profil__form-label'>Password Confirm</label>
                <input onChange={handleChangeInputValue} className='profil__form-input'
                  value={changePassword}
                  type='password'
                  name='passwordConfirm'
                  id='passwordConfirm'
                  placeholder='XXXXXXX'
                />
              </div>

              <div className="profil-input-wraper">
                <label htmlFor='picture' className='profil__form-label'>Picture</label>
                <input onChange={handleChangeInputValue}
                  type='file'
                  name='picture'
                  id='picture'
                />
              </div>
              {/* </div> */}
              <div className='profil__form__btns'>
                <button className='profil__form__btn' type='submit'>Save</button>
                <button onClick={handleCancel}
                  className='profil__form__btn'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalAlertProfile />
    </>
  )
}


// import { useEffect, useState } from 'react';
// import './styles.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOne } from '../../api/profilUser';
// import { deleteProfile } from '../../api/deleteProfil';
// import { useNavigation } from 'react-router-dom';

// export default function ProfilPage() {
//   // const navigate = useNavigation();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);
//   console.log('mon user', user);

//   useEffect(() => {
//     // call api pour avoir les infos de l'utilisateur
//     dispatch(fetchOne());
//   }, []);

//   //------------------->>>>>>>>
//   // convertit le tableau de buffer en blob le buffer est un tableau de 8 bits
//   // le blob est un objet qui contient des données binaires
//   // le blob en url permet de l'afficher dans une balise img
//   const pics = new Uint8Array(user.picture.data);
//   const blob = new Blob([pics], { type: 'image/png' })
//   const url = URL.createObjectURL(blob);


//   const handleDeleteProfile = () => {
//     dispatch(deleteProfile());
//   }



//   return (
//     <div className='profil'>
//       {user && <h1>Profil de {user.pseudo} {user.lastname} {user.pseudo} </h1>}
//       {/* <div className='profil__header'>{user.firstname}  </div>
//       <div className='profil__header__avatar'></div> */}
//       {user && url && <img src={url} alt='avatar' />}

//       <div className='profil_btns-wrapper'>
//         <button className='profil__btn'>Edit</button>
//         <button className='profil__btn' onClick={handleDeleteProfile}>
//           Delete
//         </button>
//         <button className='profil__btn'>Save</button>
//       </div>
//     </div>
//   )
// }
