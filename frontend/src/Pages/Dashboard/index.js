import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import api from '../../Services/Api';

import './styles.css';

export default ({ history }) => {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio(`${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}`, {
        query: { user_id }
    }), [user_id]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map((request, index) => (
                    <li key={index}>
                        <p>
                            <strong>
                                {request.user.email} está solicitando uma reserva
                                em <strong>{request.spot.company}</strong> para a data: 
                                <strong>{request.date}</strong>
                            </strong>
                        </p>
                        <button
                            className="accept"
                            onClick={() => handleAccept(request._id)}
                        >
                            ACEITAR
                        </button>
                        <button
                            className="reject"
                            onClick={() => handleReject(request._id)}
                        >
                            REJEITAR
                        </button>
                    </li>
                ))}
            </ul>
            {spots.length > 0 ? (
                <ul className="spot-list">
                    {spots.map((spot, idx) => (
                        <li key={idx}>
                            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                            <strong>{spot.company}</strong>
                            <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}</span>
                        </li>
                    ))}
                </ul>
            ) : <p>Não há spots cadastrados</p>}

            <Link to="/new">
                <button className="btn">
                    Cadastrar novo spot
                </button>
            </Link>
            <button
                onClick={logout}
                className="btn"
                style={{ 
                    backgroundColor: '#cccc',
                    marginTop: 10
                }}
            >
                    Sair
            </button>
        </>
    );
};