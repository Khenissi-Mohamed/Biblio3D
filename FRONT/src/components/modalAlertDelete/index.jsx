import { Frown, X } from 'react-feather';
import './styles.scss';
import { setIsOpenModalAlert } from '../../store/reducers/modals';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard } from '../../api/deleteModel';


function ModalAlert() {

  const isOpenModalAlert = useSelector((state) => state.modals.isOpenModalAlert);
  const cardId = useSelector((state) => state.cards.idCard);

  const dispatch = useDispatch();

  const handleCloseUpLoad = () => {
    dispatch(setIsOpenModalAlert(!isOpenModalAlert))
  }

  const handleModalAlert = () => {
    dispatch(deleteCard(cardId));
    dispatch(setIsOpenModalAlert(!isOpenModalAlert))

  }

  return (

    <dialog open={isOpenModalAlert} className={isOpenModalAlert ? 'dialog-active' : ''} >
      <div className="alert__container">
        <div className="alert__content">
          <div className="alert__header-wrapper">
            <h1 className="alert__header-title">Supprimer le modèle</h1>

            <X className="alert-close"
              onClick={handleCloseUpLoad}
            />

          </div>
          <div className="edit-border"></div>


          <div className="alert__body">
            <p className="alert__body-text">Êtes-vous sûr de vouloir supprimer ce modèle ?</p>
            <div className="icon__alert-content">
              <Frown className="alert__icon" />
            </div>
            <div className="alert__body-buttons-wrapper">
              <button className="alert__button-cancel" onClick={handleCloseUpLoad}>Annuler</button>
              <button className="alert__button-delete" onClick={handleModalAlert}>Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default ModalAlert