import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { capitals } from '../capitals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const dispatch = useDispatch();
    const cities = useSelector((state) => state.cities);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const listedCapitals = capitals.filter((capital) => !cities.includes(capital)).filter((capital) => capital.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 8);
    const isBtnVisible = selectedCity !== '';

    const getHighlightedText = (text) => {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    };

    const saveCity = () => {
        if (searchTerm && !cities.includes(searchTerm)) {
            dispatch({
                type: 'ADD_CITY',
                payload: searchTerm,
            });
        }
    };

    const handleCityClick = (capital) => {
        setSearchTerm(capital);
        setSelectedCity(capital);
    };

    return (
        <div>
            <Link to="/" className='angle-icon'><FontAwesomeIcon icon={faAngleLeft} /></Link>
            <div className='search-container'>
                <input
                    className='input-field'
                    type='text'
                    onChange={e => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    placeholder='Start to type a capital city...' />
                <ul className='capitals-list'>
                    {listedCapitals.map((listedCapital, i) => (
                        <li key={i} onClick={() => handleCityClick(listedCapital)}>
                            <span dangerouslySetInnerHTML={{ __html: getHighlightedText(listedCapital) }} />
                        </li>
                    ))}
                </ul>
                {isBtnVisible && (
                    <button disabled={!searchTerm} className='save-btn' onClick={saveCity}>Save</button>
                )}
            </div>
        </div>
    )
}

export default Search;