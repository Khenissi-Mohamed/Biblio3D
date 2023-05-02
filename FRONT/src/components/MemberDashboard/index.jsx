import { Edit, Plus } from 'react-feather';
import './styles.scss';
import Card from '../LimitedModels/Card';
import { useNavigate } from 'react-router-dom';
// Imports
// Imports page components
import NavBar from '../NavBar';
import Footer from '../Footer';

//
import { useDispatch, useSelector } from 'react-redux';

// Open addmodelpage
import { setIsOpenModalUpLoad, setIsOpenModalEdit } from '../../store/reducers/modals';
import { useEffect, useState } from 'react';
import { fetchOne } from '../../api/profilUser';
import { fetchCardsByUser } from '../../api/getModelByUser';
import { setIdCard, setIsUploaded } from '../../store/reducers/cards';

const Memberdashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCloseLoginProfile = () => {
        navigate('/profile');
    }

    // modals
    const isOpenModalUpLoad = useSelector((state) => state.modals.isOpenModalUpLoad);
    const isOpenModalEdit = useSelector((state) => state.modals.isOpenModalEdit);
    const isLoading = useSelector((state) => state.category.isLoading);
    const isUploaded = useSelector((state) => state.cards.isUploaded);
    const isDeleted = useSelector((state) => state.cards.isDeleted);



    const handleCloseUpLoad = () => {
        console.log('close');
        dispatch(setIsOpenModalUpLoad(!isOpenModalUpLoad))
        window.scrollTo(0, 0);
    }
    //--------------------modif tibo--------------------//
    const pseudo = useSelector(state => state.auth.pseudo);
    const [result, setResult] = useState([]);
    const [image, setImage] = useState(null);

    const fetchData = async () => {
        const response = await dispatch(fetchOne(localStorage.getItem('userId')));
        await setImage(response.picture);
        const result = await dispatch(fetchCardsByUser());
        setResult(result);
    };

    useEffect(() => {
        fetchData();
    }, [isUploaded, isDeleted]);


    useEffect(() => {
        dispatch(setIsUploaded(false))
    }, [isUploaded]);


    const handleEdit = (id) => {
        dispatch(setIsOpenModalEdit(!isOpenModalEdit))
        window.scrollTo(0, 0);
        dispatch(setIdCard(id));


    }

    return (
        <>
            <NavBar />
            <div className="dashboard">
                <div className='dashboard__main'>
                    {/*--------------Header page---------------------*/}
                    <div className="dashboard-header">
                        {/* <div className="dashboard-header"> */}
                        <img className="dashboard-header__member-img" src={image} />
                        <div className="dashboard-header__memberdetail">
                            <h4>{pseudo}</h4>
                            {/* Link to profil edition page */}
                            <button className='btn-right' onClick={handleCloseLoginProfile}>
                                Edit profil
                            </button>
                        </div>
                        {/* </div> */}
                    </div>
                    {/*--------------Main page--------------------*/}
                    <div className="page-title">
                        <h1>My models</h1>
                    </div>
                    <div className="myModels">

                        {
                            isLoading ? <><div className="spinner"></div> <p>Chargement en cours...</p></> :

                                result &&
                                result.map((card) => (
                                    <div className="myModels__card">

                                        <Card key={card.id} {...card} />

                                        <Edit className="dashboard__logo-edit" onClick={() => handleEdit(card.id)} />

                                    </div>
                                ))
                        }

                        {/*--------------Add model--------------------*/}
                        <button onClick={handleCloseUpLoad} className="navbar__upload">
                            <Plus className="button-icon-addmodel__icon" />
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default Memberdashboard;
