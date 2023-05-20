import React, { useState, useEffect } from "react";

const api = {
    key: '85b129862a77bc780dd511ad9631fc4c',
    base: 'https://api.openweathermap.org/data/2.5/'
};

const Search = () => {
    const [search, setSearch] = useState("");
    const [searchInputValue, setSearchInputValue] = useState("");
    const [weather, setWeather] = useState(null);
    const quickLinks = [
        { label: 'London', location: 'London' },
        { label: 'New York', location: 'New York' },
        { label: 'Tokyo', location: 'Tokyo' },
    ];

    const searchPressed = () => {
        if (search !== "") {
            fetch(`${api.base}weather?q=${search}&units=metric&&appid=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
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

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter city or town...'
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>

            <div>
                {quickLinks.map((link) => (
                    <button key={link.label} onClick={() => handleQuickLink(link.location)}>
                        {link.label}
                    </button>
                ))}
            </div>

            <div style={{ minHeight: '175px' }}>
                <p>{weather?.name}</p>
                {weather && weather.name ? (
                    <>
                        <p>{renderWeatherDetail(weather.main?.temp)}°C</p>
                        <p>{renderWeatherDetail(weather.weather?.[0]?.main)}</p>
                        <p>{renderWeatherDetail(weather.weather?.[0]?.description)}</p>
                    </>
                ) : (
                    <p>No weather information available</p>
                )}
            </div>
        </div>
    );
};

export default Search;
