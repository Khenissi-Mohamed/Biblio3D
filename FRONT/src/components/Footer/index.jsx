import { Link } from 'react-router-dom';
import './styles.scss';

const Footer = () => (

  <div className="footer">

    <div className="footer__links">
      <a className="footer__link" href="#">Terms&Conditions</a>
      <Link className="footer__link" to="/contact">Contact</Link>
      <a className="footer__link" href="#">SItemap</a>
    </div>
    <div className="footer__copyright">
      <span>© 2023, Biblio3D, Inc. All rights reserved.</span>
    </div>
  </div>

);
export default Footer;
