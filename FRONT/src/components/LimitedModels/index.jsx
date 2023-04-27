import './styles.scss';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { fetchCategories } from "../../api/getCategory.jsx";
import { fetchByCategory } from "../../api/getModelByCategory.jsx";
import { fetchCards } from "../../api/cards.jsx";
import { Navigate } from 'react-router-dom';
import { setIsOpenModalSignup } from '../../store/reducers/modals';


const Limitedmodels = () => {

  const dispatch = useDispatch();
  let cards = useSelector((state) => state.cards.cards);
  const isLoading = useSelector((state) => state.cards.isLoading);
  const logged = useSelector((state) => state.auth.logged);
  const categories = useSelector((state) => state.category.categories);
  const isOpenModalSignup = useSelector((state) => state.modals.isOpenModalSignup);



  if (logged === false) {
    cards = cards.slice(0, 10);
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);


  const handleInputChange = (event) => {
    const { value } = event.target;
    dispatch(fetchByCategory(value));
  }

  const handleButtonAll = () => {
    dispatch(fetchCards());
  }

  const handleClick = () => {
    dispatch(setIsOpenModalSignup(true));
    window.scrollTo(0, 0, 'smooth');
  }

  return (



    <div className='model-cards-container'>
      <div className="hero">
        <div className="wrapper-cat">
          {logged ? <div className={'category-container'}>
            <button className={'category-button'}
              value={"all"}
              onClick={handleButtonAll}>
              All
            </button>
            {categories.map((category) => (
              <button className={'category-button'} key={category.id} value={category.name} onClick={handleInputChange}>{category.name}</button>
            ))}
          </div>
            : null}
        </div>

        {!logged &&
          <>
            <h1 className="hero__title">Discover more models</h1>
            <div className="hero__subtitle">Learn from millions of community members.
              <button className='navbar__signup' onClick={handleClick}>JOIN US</button>
            </div>
          </>
        }
      </div>
      {
        isLoading && <div className="spinner"></div>
      }
      {
        cards.length === 0 ?
          <div className="no-model">No model found</div> :

          <div className="card-list">
            {cards.map((card) => (<Card key={card.id} {...card} />))}
          </div>
      }
    </div>


  );
}


export default Limitedmodels;
