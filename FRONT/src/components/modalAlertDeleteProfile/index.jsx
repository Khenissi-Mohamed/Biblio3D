import { Frown, X } from 'react-feather';
import './styles.scss';
import { setIsOpenModalAlertProfile } from '../../store/reducers/modals';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { deleteProfile } from '../../api/deleteProfil';
import { logout } from '../../store/reducers/auth';


function ModalAlertProfile() {

  const isOpenModalAlertProfile = useSelector((state) => state.modals.isOpenModalAlertProfile);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseUpLoad = () => {
    dispatch(setIsOpenModalAlertProfile(!isOpenModalAlertProfile))
  }

  //----------------- suppression du profile ------------------//
  const handleDeleteProfile = () => {
    dispatch(deleteProfile(navigate));
    dispatch(setIsOpenModalAlertProfile(!isOpenModalAlertProfile));
    dispatch(logout());
  }

  return (

    <dialog open={isOpenModalAlertProfile} className={isOpenModalAlertProfile ? 'dialog-active' : ''} >
      <div className="alert__container">
        <div className="alert__content">
          <div className="alert__header-wrapper">
            <h1 className="alert__header-title">Supprimer le compte</h1>

            <X className="alert-close"
              onClick={handleCloseUpLoad}
            />

          </div>
          <div className="edit-border"></div>


          <div className="alert__body">
            <p className="alert__body-text">Êtes-vous sûr de vouloir supprimer votre compte ?</p>
            <div className="icon__alert-content">
              <Frown className="alert__icon" />
            </div>
            <div className="alert__body-buttons-wrapper">
              <button className="alert__button-cancel" onClick={handleCloseUpLoad}>Annuler</button>
              <button className="alert__button-delete" onClick={handleDeleteProfile}>Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default ModalAlertProfile