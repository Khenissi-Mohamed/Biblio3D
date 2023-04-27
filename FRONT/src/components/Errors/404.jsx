
/* Styles */
import './styles.scss';
/* Imports */
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    /* ----Homepage---- */
    const handleBackToHomePageBtn = () => {
        navigate('/');
    }

    return (
        <div className="fullpage">
            {/* Div for a potential 404 veiwer 3D */}
            <div className="viewer404">
                <iframe
                    src="https://giphy.com/embed/XJcuXYYW2e0mY"
                    width="90%"
                    height="480"
                    className="giphy-embed"
                    allowFullScreen
                    title="Computer error inside"
                ></iframe>
            </div>
            <h4 className='title-error-page'>404</h4>
            <h3 className='error-message'>Page not found</h3>
            <p className='msg-error-page'>The page you're looking for might have been removed or temporary unvailable</p>
            <button className="home-btn" onClick={handleBackToHomePageBtn}>
                Go back to homepage
            </button>
        </div>
    )
}
export default Error;