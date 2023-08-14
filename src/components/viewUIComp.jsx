import React from 'react';

function TableView({ crimeData }) {
  return (
    <div>
      <h2>Crime Table</h2>
      <table>
        <thead>
          <tr>
            <th>Post Code</th>
            <th>Category</th>
            <th>Date</th>
            <th>Street</th>
            <th>Outcome Status</th>
          </tr>
        </thead>
        <tbody>
          {crimeData.map((crime) => (
            <tr key={crime.id}>
              <td>{crime.location.street.postcode}</td>
              <td>{crime.category}</td>
              <td>{crime.month}</td>
              <td>{crime.location.street.name}</td>
              <td>{crime.outcome_status ? crime.outcome_status.category : 'On Going'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MapView() {
  return (
    <div>
      <h2>Crime Map</h2>
      <p>Map View Placeholder</p>
    </div>
  );
}

export { TableView, MapView };
