import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableView, MapView } from './components/viewUIComp.jsx';

function App() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [searchInput, setSearchInput] = useState('');
  const [setLatitude, setLongitude] = useState(null);
  const [searchedPostcodes, setSearchedPostcodes] = useState([]);

  const fetchCrimeData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`
      );
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        console.log('No crime data found in API response.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching crime data:', error);
      return [];
    }
  };
  
  const handleSearch = async () => {
    const postcodes = searchInput.split(',').map(postcode => postcode.trim().toUpperCase());
    const validPostcodes = postcodes.filter(postcode => postcode.length > 0);
  
    if (validPostcodes.length > 0) {
      const fetchedData = [];
      for (const postcode of validPostcodes) {
        try {
          const response = await axios.get(`http://api.getthedata.com/postcode/${postcode}`);
          const { status, data } = response.data;
          if (status === 'match' && data) {
            const { latitude, longitude } = data;
            const crimeData = await fetchCrimeData(latitude, longitude);
            fetchedData.push(...crimeData);
          } else {
            console.log(`No valid data found in API response for postcode: ${postcode}`);
          }
        } catch (error) {
          console.error('Error fetching lat/lng:', error);
        }
      }
      setData(fetchedData);
      setSearchedPostcodes(prevPostcodes => [...prevPostcodes, ...validPostcodes]);
    }
  };
  
  const handlePostcodeClick = async (clickedPostcode) => {
    try {
      const response = await axios.get(`http://api.getthedata.com/postcode/${clickedPostcode}`);
      const { status, data } = response.data;
      if (status === 'match' && data) {
        const { latitude, longitude } = data;
  
        const crimeData = await fetchCrimeData(latitude, longitude);
        setData(crimeData);
      } else {
        console.log(`No valid data found in API response for postcode: ${clickedPostcode}`);
      }
    } catch (error) {
      console.error('Error fetching lat/lng:', error);
    }
  };
  
  return (
    <>
      <div>
        <h1>Crime Data</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada nibh tristique,
          varius justo vitae, efficitur turpis. Mauris quis nisl vel risus interdum consectetur.
        </p>
      </div>

      <div id="searchForm">
        <input
          className="SearchBar With100"
          type="text"
          placeholder="Search your postcode..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Searched Postcodes</h2>
        <ul>
          {searchedPostcodes.map((postcode, index) => (
            <button key={index} onClick={() => handlePostcodeClick(postcode)}>
              {postcode}
            </button>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={() => setViewMode('table')}>Table View</button>
        <button onClick={() => setViewMode('map')}>Map View</button>
      </div>

      {viewMode === 'table' && <TableView crimeData={data} />}
      {viewMode === 'map' && <MapView />}
    </>
  );
}

export default App;