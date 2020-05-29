import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

//set "REACT_APP_API_KEY=84a195f2809217306a40a1485a9c4142" && npm start

// http://api.weatherstack.com/current?access_key=84a195f2809217306a40a1485a9c4142&query=New York



const Weather = ({ capital, weather }) => {
  console.log("sää:::", weather)
  return (
    (weather.location !== undefined)
      ? <div>
        <b>temperature:</b>
        <p>{weather.current.temperature} Celsius</p>
      </div>
      : <div>failed to fetch data</div>
  )
}


const Content = ({ setQuery, weather, newFilter, countries, handleShowClick }) => {
  console.log("countries:::", countries);
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  console.log("filter : ", newFilter);
  console.log("filtered : ", filteredCountries)

  return ((filteredCountries.length === 1)
    ? (filteredCountries.map(country =>
      <div key={country.name}>
        {setQuery(country.capital)}
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>Spoken languages</h3>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img height="100px" src={country.flag} alt="Flag" />
        <h2>Weather in {country.capital}</h2>
        <Weather capital={country.capital} weather={weather} />
      </div>))
    : (filteredCountries.length < 10)
      ? <div>
        {filteredCountries
          .map(country =>
            <div key={country.name}>
              {country.name}
              <button type="submit" onClick={() => handleShowClick(country.name)}>show</button>
            </div>)
        }
      </div>
      : <div>Too many matches, specify another filter</div>

  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState()
  const [newFilter, setNewFilter] = useState('')
  const [query, setQuery] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  console.log("key is:", api_key)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    // console.log("filter: ", newFilter);
  }

  const handleShowClick = (name) => {
    setNewFilter(name)
  }

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => { // pitäis tehä
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`)
      .then(response => {
        setWeather(response.data)
      })
      .catch((e) => {
        console.error(e);
      });
  }, [query, api_key])



  return (
    <div>find countries
      <input
        value={newFilter}
        onChange={handleFilterChange}
      />
      <Content
        setQuery={setQuery}
        weather={weather}
        newFilter={newFilter}
        countries={countries}
        handleShowClick={handleShowClick}
      />
    </div >
  )

}





ReactDOM.render(<App />, document.getElementById('root'))