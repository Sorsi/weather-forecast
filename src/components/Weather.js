import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'

const API_KEY = process.env.REACT_APP_API_KEY;
const iconMapping = {
    'clear sky': 'wi-day-sunny',
    'few clouds': 'wi-day-cloudy',
    'scattered clouds': 'wi-cloud',
    'broken clouds': 'wi-cloudy',
    'shower rain': 'wi-showers',
    'rain': 'wi-rain',
    'thunderstorm': 'wi-thunderstorm',
    'snow': 'wi-snowflake-cold',
    'mist': 'wi-fog',
};

const Weather = () => {
    const cities = useSelector((state) => state.cities);
    const [weatherDetails, setWeather] = useState('');
    const city = useSelector((state) => state.selectedCity);

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [cities]);

    const { name, main, sys, weather } = weatherDetails;
    const [currentTime, setCurrentTime] = useState('');
    const timeZoneOffset = weatherDetails.timezone;

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTimestamp = Date.now() / 1000 + timeZoneOffset;
            setCurrentTime(new Date(currentTimestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }));
        }, 1000);
        return () => clearInterval(interval);
    }, [timeZoneOffset]);

    if (!weatherDetails) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div>
            <Link to='/' className='angle-icon'><FontAwesomeIcon icon={faAngleLeft} /></Link>
            <div className='weather-container'>
                <div className='time'>{currentTime}</div>
                <h2 className='city'>{name}</h2>
                <i className={`wi ${iconMapping[weather[0].description]} weather-icon`}></i>
                <p className='weather-description'>{weather[0].description}</p>
                <div className='temp-data-wrapper'>
                    <i className="wi wi-thermometer temp-icon"></i>
                    <span className='temp-data'>{main.temp}</span>
                    <span className='celsius-sign'>°C</span>
                </div>
                <div className='temp-data-wrapper'>
                    <i className="wi wi-sunrise temp-icon"></i>
                    <span className='temp-data'>{moment.utc(sys.sunrise, 'X').add(timeZoneOffset, 'seconds').format('HH:mm')}</span>
                </div>
                <div className='temp-data-wrapper'>
                    <i className="wi wi-sunset temp-icon"></i>
                    <span className='temp-data'>{moment.utc(sys.sunset, 'X').add(timeZoneOffset, 'seconds').format('HH:mm')}</span>
                </div>
            </div>
        </div>
    )
}

export default Weather;