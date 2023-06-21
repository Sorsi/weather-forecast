import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cities = () => {
    const cities = useSelector((state) => state.cities);
    const dispatch = useDispatch();
    const handleCityClick = (city) => {
        dispatch({
            type: 'SELECT_CITY',
            payload: city,
        });
    };

    return (
        <div className='cities-container'>
            <ul>
                {cities.map((city) => (
                    <li key={city} value={city} onClick={() => { handleCityClick(city) }}>
                        <Link to='/weather'>{city}</Link>
                    </li>
                ))}
            </ul>
            <Link className='plus-sign' to="/search">+</Link>
        </div>
    )
}

export default Cities;