import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import errorImg from '../../../public/assets/error-404.png'

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img src={errorImg} alt="" />
            <h1 className="text-5xl font-bold mb-4">Oops, page not found!</h1>
            <p className="text-xl mb-2">The page you are looking for is not available.</p>
            <Link to="/" className="btn btn-primary">Go Back Home</Link>
        </div>
    );
};

export default ErrorPage;
