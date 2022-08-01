import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from "../components/Spinner";

export default function PrivateRoute ({Component}) {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    async function getToken() {
        try {
            const token = localStorage.getItem("tokenPortfolioMS");
            const validateToken = await axios.get('/messages', { headers: { Authorization: token } });
            if (validateToken.status === 200) {
                setAuth(true);
                setLoading(false);
            };
        } catch (e) {
            console.log(e);
            setAuth(false);
            setLoading(false);
        };
    };
    useEffect(() => {
        getToken()
    }, []);
    return loading ?
        <div className="fixed top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
        </div> :
        auth === true ? <Component /> : <Navigate to="/login" />
}