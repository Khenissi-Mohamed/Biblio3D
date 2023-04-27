import React, { useEffect } from 'react'
import NavBar from '../../NavBar'
import Limitedmodels from '../../LimitedModels'
import Footer from '../../Footer'
import Background from '../../Background'
import { useDispatch } from 'react-redux'
import { fetchCards } from '../../../api/cards'

function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCards());
    }, []);
    return (
        <>
            <NavBar />
            <Background />
            {/* <Limitedmodels /> */}
            <Footer />
        </>
    )
}

export default HomePage