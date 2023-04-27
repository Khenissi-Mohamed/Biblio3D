import './styles.scss';
import axios from 'axios';
import { Edit, ThumbsUp } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../api/axiosInstance';
import { deleteCard } from '../../api/deleteModel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setIsCliked } from '../../store/reducers/navbar';
import { setLiked } from '../../store/reducers/cards';
import { fetchLikes } from '../../api/isLiked';
import { useEffect, useState } from 'react';
// import { deleteCard } from '../../api/deleteModel';


export default function Card({ name, picture, pseudo, like, id }) {

  const isLiked = useSelector((state) => state.cards.isLiked);
  const likeData = useSelector((state) => state.cards.likeData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [updatedLikes, setUpdatedLikes] = useState(like)

  const [likes, setLikes] = useState([{ count: like }]);

  const handleCardClick = () => {
    navigate(`/modelDetail/${id}`);
    window.scrollTo(0, 0);
  }

  const handleLike = (e, index) => {
    e.stopPropagation();
    dispatch(fetchLikes(id));
    console.log('nouveau nombre de likes : ', likeData);
    const updatedLikes = likeData && likeData.count !== undefined ? likeData.count : likes[index].count; // On récupère le nombre de likes
    const newLikes = [...likes]; // On copie le tableau des likes
    newLikes[index] = { count: updatedLikes }; // On met à jour le nombre de likes
    setLikes(newLikes); // On met à jour le state
  };

  useEffect(() => {
    const newLikes = [...likes]; // On copie le tableau des likes
    newLikes[0] = { count: like }; // On met à jour le nombre de likes
    setLikes(newLikes); // On met à jour le state
  }, [like]); // On met à jour le state à chaque fois que le nombre de likes change


  const location = useLocation();
  // console.log('location du card', location);




  return (
    <div className="card">
      <div className="card__logo-delete">
        <h1 className="model-title"> {name}  </h1>
        {/* {location.pathname === '/dashboard' &&
          <Edit className="card__logo-edit" onClick={handleEdit} />
        } */}
      </div>
      <div className="card-img-wrapper"><img className="card__thumbnail" src={picture} alt="model 3D" onClick={handleCardClick} /></div>
      <div className="card__details">
        <div className='card__infos'>
          <p className='card__author-text'>{pseudo}</p>
          <div className="card__logo-wrapper">
            <div className="card__logo-icon">
              <p
                className="like"
                onClick={(e) => handleLike(e, 0)}>
                {likes[0].count}
              </p>
              <ThumbsUp
                className='card__logo-icon'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
