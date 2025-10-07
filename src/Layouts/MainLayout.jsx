import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import Header from '../components/Header/Header';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;