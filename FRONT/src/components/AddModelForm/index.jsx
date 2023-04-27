import { X } from 'react-feather';
import { useEffect, useState } from 'react';
import './styles.scss';

import React from 'react'
import thumbnail from '../../assets/thumbnail.jpeg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenModalUpLoad } from '../../store/reducers/modals';
import createModel from '../../api/createModel';
import { fetchCategories } from '../../api/getCategory';


function AddModelForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOpenModalUpLoad = useSelector((state) => state.modals.isOpenModalUpLoad);
  const categories = useSelector((state) => state.category.categories);

  const handleCloseUpLoad = () => {
    console.log('close');
    dispatch(setIsOpenModalUpLoad(!isOpenModalUpLoad));
    // navigate('/');
  }

  useEffect(() => {
    if (isOpenModalUpLoad) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpenModalUpLoad]);


  useEffect(() => {
    dispatch(fetchCategories());
  }, []);


  const [checked, setChecked] = useState(false);
  const [_, setFile] = useState(null);
  const [form, setForm] = useState({});


  const handleCreateModel = (event) => {
    event.preventDefault();
    dispatch(createModel(form));
    navigate('/dashboard');
    dispatch(setIsOpenModalUpLoad(!isOpenModalUpLoad));
  }
  const handleChecked = (event) => {
    setChecked(!checked);
    const { name, value } = event.target;
    setForm({ ...form, [name]: value })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const handleGlbChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setForm({ ...form, data: file });
  }

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setForm({ ...form, picture: file });
  }



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);


  //   dispatch(createModel(formData));

  // }


  return (

    <dialog open={isOpenModalUpLoad} className={isOpenModalUpLoad ? 'dialog-active' : ''} >
      <div className="add-model-container">
        <div className="add-model-content">
          <div className="add-model__header">
            <h1 className="add-model__header-title">Ajoutez un Model</h1>
            <X className="add-model__header-icon" onClick={handleCloseUpLoad} />
          </div>
          <div className="edit-border"></div>
          <form className="add-model__form" onSubmit={handleCreateModel}>
            <div className="add-form-group">
              <label className='add-label-form' htmlFor="category">Category :</label>
              <select id="category" name="category" value={form.category} onChange={handleInputChange}  >
                <option value="">-- Choix de Categories --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="add-form-group">
              <label className='add-label-form' htmlFor="name">Nom du model...</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleInputChange} />
            </div>

            <div className="add-form-group">
              <label className='add-label-form' htmlFor="file">Fichier :</label>
              <input className='add-file' type="file" id="file" name="file" accept=".obj,.stl,.glb,.gltf,.3mf,.dae,.dxf,.fbx" onChange={handleGlbChange} />
            </div>
            <div className="add-form-group">
              <label className='add-label-form' htmlFor="image">Image :</label>
              <input className='add-file' type="file" id="file" name="file" accept=".png, .jpeg, .gif" onChange={handlePictureChange} />
            </div>
            <div className="add-form-group">
              <label className='add-label-form' htmlFor='downloadable'> Téléchargeable </label>
              <input type="checkbox" id="checkbox" name="download" value={checked} onClick={handleChecked} />
            </div>

            <div className="add-form-group">
              <label className='add-label-form' htmlFor="description">Description :</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows="1" cols="50">

              </textarea>
            </div>

            <div className="add-form-group">
              <label className='add-label-form' htmlFor="tags">Tags :</label>
              <input type="text" id="tags" name="tags" value={form.tags} placeholder='My tag1, tag2...' onChange={handleInputChange} />
            </div>
            <div className="btn-wrapper">
              {/* <button className='btn-left' type='submit'>UPLOAD</button> */}
              <button className='btn-right' type='submit' onClick={handleCreateModel}  >UPLOAD</button>
            </div>

          </form>
        </div>
      </div>
    </dialog>
  )
}

export default AddModelForm