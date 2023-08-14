import React from 'react';

function TableView({ crimeData }) {
  return (
    <div>
      <h2>Crime Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Location</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>
          {crimeData.map((crime) => (
            <tr key={crime.id}>
              <td>{crime.category}</td>
              <td>{crime.location.street.name}</td>
              <td>{crime.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MapView() {
  return <div>
            <h2>Map</h2>
            <p>Map View Placeholder</p>
          </div>;
}

export { TableView, MapView };