import React, { useState } from 'react';
import './App.css';
import { TableView, MapView } from './components/viewUIComp.jsx'; 

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 25, location: 'City A' },
    { id: 2, name: 'Jane Smith', age: 30, location: 'City B' },
    { id: 3, name: 'Alice Johnson', age: 28, location: 'City C' },
    // Add more data as needed
  ]);

  const [viewMode, setViewMode] = useState('table'); 

  return (
    <>
      <div>
        <h1>Locate Crime</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada nibh tristique,
          varius justo vitae, efficitur turpis. Mauris quis nisl vel risus interdum consectetur.
        </p>
      </div>

      <input className="SearchBar With100" type="text" placeholder="Search your postcode..." />

      <div>
        <button onClick={() => setViewMode('table')}>Table View</button>
        <button onClick={() => setViewMode('map')}>Map View</button>
      </div>

      {viewMode === 'table' && <TableView data={data} />}
      {viewMode === 'map' && <MapView />}
    </>
  );
}

export default App;