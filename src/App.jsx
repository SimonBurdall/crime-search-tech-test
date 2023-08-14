import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableView, MapView } from './components/viewUIComp.jsx';

function App() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [searchInput, setSearchInput] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  

  const fetchCrimeData = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching crime data:', error);
      return [];
    }
  };


  const handleSearch = async () => {
    const postcodes = searchInput.split(',').map(postcode => postcode.trim());
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