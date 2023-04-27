import { ChevronDown } from 'react-feather';
import ThreeScene from '../THREEJS-Header';
import './styles.scss';
import { useRef } from 'react';
import Limitedmodels from '../LimitedModels';
import { useSelector } from 'react-redux';


function Background() {
  const limitedModelsRef = useRef(null);

  const scrollToNextSection = () => {
    limitedModelsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const logged = useSelector((state) => state.auth.logged);
  const pseudo = useSelector((state) => state.auth.pseudo);


  return (
    <div className="background">
      <div className="background__image">
      </div>
      <ThreeScene />
      <div className="background-content">
        {!logged &&
          <>
            <h1 className="background-content__title">Explore the World of 3D</h1>
            <p className="background-content__text">Revamp Your World in 3D: Join the Fun Now!</p>
          </>
        }
        {logged &&
          <>
            <h1 className="background-content__title">Welcome to 3D World <span className='background-content__pseudo'> {pseudo} </span> </h1>
          </>

        }
        <div className="background-content__btn-container">
          <ChevronDown className="background-content__btn-down" onClick={scrollToNextSection} />
        </div>
      </div>
      <div ref={limitedModelsRef}>
        <Limitedmodels />
      </div>
    </div>
  )
}

export default Background;


