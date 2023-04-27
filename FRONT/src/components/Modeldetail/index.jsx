
import { useDispatch, useSelector } from 'react-redux';
import Card from '../LimitedModels/Card';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Footer from '../Footer';
import { fetchModeldetail } from '../../api/modelDetail';
import { Canvas } from 'react-three-fiber';
import Viewer from '../Viewer/Viewer';
import { downloadModel } from "../../api/downloadModel.jsx";
import NavBar from '../NavBar';

const Modeldetail = ({ mountRef }) => {
  const myRef = useRef(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();



  const cards = useSelector((state) => state.cards.cards);
  const { comments, description, format, likes, name, pseudo, size, download, tag } = useSelector((state) => state.modelDetail);

  useEffect(() => {

    dispatch(fetchModeldetail(id))

  }, [])




  const currentDate = new Date();

  const handleBackToHomePageBtn = () => {
    navigate('/');
  }

  const handleDownload = async () => {


    try {
      const url = await downloadModel(id);
      const link = document.createElement('a');
      link.href = url;
      link.type = 'model/gltf-binary'; // Définir le type de fichier
      link.download = `${name}.glb`;

      // Ajouter l'élément <a> à la page
      document.body.appendChild(link);

      // Déclencher le téléchargement
      link.click();

    } catch (error) {
      console.error(error);
    }
  };

  function bitsToMegabits(bits) {
    const result = bits / 1000000;
    return result.toFixed(1);
  }

  return (
    <>
      <NavBar />
      <div className="modelDetail-wrapper">

        <div className="left">
          {/* <div className="back-button">
            <span className="back-btn" onClick={handleBackToHomePageBtn} >
              <ArrowLeft /><p className="back-btn-text"> back</p>
            </span>
          </div> */}
          <h1 className="model__title"> {name} </h1>
          <div className="model3d" id="canvasContainer">
            <div className='loaderDiv' id='loader'></div>
            <Viewer mountRef={myRef} />
          </div>
          <div className="model-details">
            <div className="model-details-content">
              <h2 className="model-details-content-title">Description:</h2>
              <p className="model-details__description">{description}</p>
            </div>
            <div className="model-details-content">
              <h2 className="model-details-content-title">Tags:</h2>
              <p className="model-details__description"> {tag} </p>
            </div>
            <div className="model-details-content">
              <h2 className="model-details-content-title">Size:</h2>
              <p className="model-details__description"> {`${bitsToMegabits(size)} Mb`} </p>
            </div>
          </div>
          {download && <button className={"downloadBtn"} onClick={handleDownload}>Download</button>}
        </div>
      </div>
      <Footer />
    </>
  );
}


export default Modeldetail;


