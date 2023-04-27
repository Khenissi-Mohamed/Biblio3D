import { X } from 'react-feather';
import './styles.scss';


import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenModalAlert, setIsOpenModalEdit } from '../../store/reducers/modals';
import { changeInputsValues } from '../../store/reducers/editCard';
import ModalAlert from '../modalAlertDelete';
import { updateModel } from '../../api/updateModel';


function EditModel() {

  const dispatch = useDispatch();


  const isOpenModalEdit = useSelector((state) => state.modals.isOpenModalEdit);
  const { name, description, tag } = useSelector((state) => state.editCard.inputsValues);
  const isOpenModalAlert = useSelector((state) => state.modals.isOpenModalAlert);
  const cardId = useSelector((state) => state.cards.idCard);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    dispatch(changeInputsValues({ name, value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get('name');
    const description = formData.get('description');
    const tag = formData.get('tag');

    const data = {name : name, description : description, tag : tag}

    // Dispatch an action to update the model using the retrieved data
    dispatch(updateModel(data, cardId));

  };



  const handleCloseUpLoad = () => {
    console.log('close');
    dispatch(setIsOpenModalEdit(!isOpenModalEdit))
    window.scrollTo(0, 0);
  }

  const handleModalAlert = (e) => {
    e.preventDefault();
    dispatch(setIsOpenModalAlert(!isOpenModalAlert))
    window.scrollTo(0, 0);
  }

  return (
    <>
      <dialog open={isOpenModalEdit} className={isOpenModalEdit ? 'dialog-active' : ''} >
        <div className="edit__container">
          <div className="edit__content">
            <div className="edit__header-wrapper">
              <h1 className="edit__header-title">Modifier le modèle</h1>

              <X className="edit-close"
                onClick={handleCloseUpLoad}
              />

            </div>
            <div className="edit-border"></div>
            <div className="edit__body">
              <form className="edit__form" onSubmit={handleSubmit}>
                <div className="edit__form-group">
                  <label className='label-edit' htmlFor="name">Model title</label>
                  <input onChange={handleChangeValue}
                    className='input-edit'
                    value={name}
                    type="text"
                    name="name"
                    placeholder='name'
                    id="name" />
                </div>
                <div className="edit__form-group">
                  <label className='label-edit' htmlFor="description">Description</label>
                  <textarea onChange={handleChangeValue}
                    value={description}
                    name="description"
                    id="description"
                    placeholder='description'
                    cols="30" rows="3"
                    style={{ backgroundColor: '#f2f2f2', borderRadius: '5px', padding: '10px', color: '#000' }}
                  >
                  </textarea>
                </div>
                <div className="edit__form-group">
                  <label className='label-edit' htmlFor="tag">Tag</label>
                  <input onChange={handleChangeValue}
                    className='input-edit'
                    value={tag}
                    type="text"
                    name="tag"
                    id="tag"
                    placeholder='tag'
                  />
                </div>
                <div className="edit__btns-wrapper">
                  <button onClick={handleModalAlert}
                    className="edit__form-button__delete"
                  >
                    Delete
                  </button>
                  <button type="submit"
                    className="edit__form-button">
                    Edit
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      <ModalAlert />
    </>
  )
}

export default EditModel
