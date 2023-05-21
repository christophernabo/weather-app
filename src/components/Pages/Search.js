import React, { useState, useEffect } from "react";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const api = {
    key: '85b129862a77bc780dd511ad9631fc4c',
    base: 'https://api.openweathermap.org/data/2.5/'
};

const Search = () => {
    const [search, setSearch] = useState("");
    const [searchInputValue, setSearchInputValue] = useState("");
    const [weather, setWeather] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const sunriseTimestamp = weather?.sys?.sunrise;
    const sunsetTimestamp = weather?.sys?.sunset;
    const humidity = weather?.main.humidity;

    const quickLinks = [
        { label: 'Manila', location: 'Manila' },
        { label: 'Baguio City', location: 'Baguio City' },
        { label: 'Batangas', location: 'Batangas' },
        { label: 'Cebu City', location: 'Cebu City' },
        { label: 'Bacolod City', location: 'Bacolod City' },
        { label: 'Iloilo City', location: 'Iloilo City' },
        { label: 'Davao City', location: 'Davao City' },
        { label: 'Cagayan De Oro', location: 'Cagayan De Oro' },
        { label: 'Zamboanga City', location: 'Zamboanga City' },
    ];

    const searchPressed = () => {
        if (search !== "") {
            fetch(`${api.base}weather?q=${search}&units=metric&&appid=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setWeather(result);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(searchInputValue);
    };

    const handleQuickLink = (location) => {
        setSearch(location);
        setSearchInputValue(location);
    };

    useEffect(() => {
        if (search !== "") {
            searchPressed();
        }
    }, [search]);

    const renderWeatherDetail = (detail) => {
        return detail !== undefined ? detail : "N/A";
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const sunrise = sunriseTimestamp ? new Date(sunriseTimestamp * 1000) : null;
    const sunset = sunsetTimestamp ? new Date(sunsetTimestamp * 1000) : null;

    const options = { hour: 'numeric', minute: 'numeric' };
    const sunriseTime = sunrise ? sunrise.toLocaleTimeString('en-US', options) : 'N/A';
    const sunsetTime = sunset ? sunset.toLocaleTimeString('en-US', options) : 'N/A';

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                marginBottom: '20px', textAlign: 'center',
                borderRadius: '10px', padding: '10px', maxWidth: '80vw', alignItems: 'center'
            }}>
                <div style={{
                    border: '1px solid #000000',
                    borderRadius: '10px',
                    padding: '10px',
                    minWidth: "50vw",
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <form onSubmit={handleSubmit} style={{
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        <input
                            style={{
                                minWidth: '50px',
                                maxWidth: '250px'
                            }}
                            type='text'
                            placeholder='Enter city or town...'
                            value={searchInputValue}
                            onChange={(e) => setSearchInputValue(e.target.value)}
                        />
                        <button
                            style={{
                                minWidth: '50px'
                            }}
                            type='submit'>Search</button>
                    </form>
                    <div style={{ fontStyle: 'italic', fontSize: '12px', marginTop: '-15px', textAlign: 'center' }}>NOTE: Time and date are based on Philippine Date and Time (PHT). If a city does not appear, try adding "City" to its name. Municipality names are as is. If a city or municipality does not appear, its data is probably not available. </div>
                </div>




                <div style={{
                    minHeight: '350px', textAlign: 'center', padding: '20px', minWidth: '50vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #000000', borderRadius: '10px', padding: '10px', marginBottom: '0px'
                }}>
                    <p style={{ fontSize: '28px', marginBottom: '0' }}>{weather?.name}</p>
                    {weather && weather.name ? (
                        <>
                            <div>{currentDateTime.toLocaleTimeString()} • {currentDateTime.toLocaleString('en-US', { weekday: 'long' })}, {formatDate(currentDateTime)}</div>
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
                                {/* <ThermostatIcon style={{ marginRight: '5px', fontSize: '55px' }} /> */}
                                <span style={{ fontSize: '42px', fontWeight: 'bold', marginTop: '-5px' }}>{renderWeatherDetail(weather.main?.temp)}°C</span>
                            </div>
                            <div style={{ marginBottom: '50px' }}>With {weather.weather?.[0]?.description}</div>
                            <div style={{ display: 'flex', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                                    <WbSunnyIcon style={{ marginRight: '5px', fontSize: '27px' }} />
                                    {sunriseTime}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                                    <WbTwilightIcon style={{ marginRight: '5px', fontSize: '30px' }} />
                                    {sunsetTime}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <WaterDropIcon style={{ marginRight: '5px' }} />
                                    {humidity !== undefined ? `${humidity}%` : 'N/A'}
                                </div>
                            </div>

                        </>
                    ) : (
                        <p>No weather information available.</p>
                    )}
                </div>



            </div>

            <div style={{
                listStyleType: 'disc', paddingLeft: '20px', textAlign: 'center', marginBottom: '20px', width: '80vw', justifyContent: 'space-between'
            }}>
                {quickLinks.map((link) => (
                    <button
                        key={link.label}
                        onClick={() => handleQuickLink(link.location)}
                        style={{
                            border: 'none',
                            textDecoration: 'underline',
                            marginBottom: '10px',
                            background: 'none',
                            textAlign: 'left'
                        }}
                    >
                        {link.label}
                    </button>
                ))
                }
            </div >
        </div >

    );
};

export default Search;
