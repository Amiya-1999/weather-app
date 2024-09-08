import axios from 'axios';
import React, { useState } from 'react'

export default function Weather() {

    const [city, setCity] = useState();
    const [weather, setWeather] = useState();

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'e033c9f70f3ec20138cd6fac94f9cd1e'}`)
            setWeather(response.data);
        }
        catch (error) {
            console.log('Error fetching weather data', error)
        }
    }

    const handleClick = () => {
        fetchWeather();
        setCity('');
    }

    return (
        <div className='weather-container'>
            <input type="text" placeholder='Enter City Name' value={city} onChange={handleCityChange} />
            <button onClick={handleClick}>Get Weather</button>
            {weather && (<>
                <div>
                    <h3>{weather.name}</h3>
                    <p>Now - {Math.round(weather.main.temp - 273.15)}&deg;C</p>
                    <small>Feels like {Math.round(weather.main.feels_like - 273.15)}&deg;C</small><br /><br />
                    <small>Precip: {weather.clouds.all}%, </small>
                    <small>Humidity: {weather.main.humidity}%, </small>
                    <small>Wind: {Math.round(weather.wind.speed)} kph</small>
                    <p>{weather.weather[0].description}</p>
                    <div>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="No_Image" />
                    </div>
                </div>
            </>)}
        </div>
    )
}
