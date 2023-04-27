import { Routes, Route, useLocation } from 'react-router-dom';
import Signup from '../Signup';
import AddModel from '../AddModelForm';
import HomePage from '../Pages/Homepage';
import Login from '../Login';
import Modeldetail from '../Modeldetail';
import ProfilPage from '../ProfilePage';
import './styles.scss';
import Memberdashboard from '../MemberDashboard';
/* Imports error */
import Error from '../Errors/404';
import EditModel from '../EditModel';
import ModalAlert from "../modalAlertDelete/index.jsx";
import Notification from '../Notification';
import Contact from '../Contact';



const App = () => {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modelDetail/:id" element={<Modeldetail />} />
        <Route path="/modelEdit" element={<EditModel />} />
        <Route path="/profile" element={<ProfilPage />} />
        <Route path='/dashboard' element={<Memberdashboard />} />
        <Route path='/contact' element={<Contact />} />
        {/*-- 404 --*/}
        <Route path='*' element={<Error />} />
      </Routes>
      {/* modals */}

      <Login />
      <Signup />
      <AddModel />
      <EditModel />
      <ModalAlert />
      <Notification />
    </div>
  )
};
export default App;
