import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableView, MapView } from './components/viewUIComp.jsx';

function App() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [searchInput, setSearchInput] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  
  const fetchCrimeData = async () => {
    try {
      if (latitude && longitude) {
        const response = await axios.get(
          `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`
        );
        console.log(`https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`)
        console.log('Fetched Crime Data:', response.data); 
        if (response.data && response.data.length > 0) {
          setData(response.data);
        } else {
          console.log('No crime data found in API response.');
        }
      }
    } catch (error) {
      console.error('Error fetching crime data:', error);
    }
  };
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://api.getthedata.com/postcode/${searchInput}`);
      const { status, data } = response.data;
      if (status === 'match' && data) {
        const { latitude, longitude } = data;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        setLatitude(latitude);
        setLongitude(longitude);
  
        fetchCrimeData();
      } else {
        console.log('No valid data found in API response.');
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

      <input
        className="SearchBar With100"
        type="text"
        placeholder="Search your postcode..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

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