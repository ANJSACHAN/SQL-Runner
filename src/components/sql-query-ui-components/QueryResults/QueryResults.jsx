import React from 'react';
import './QueryResults.scss';

export function QueryResults({ queryResults, isDarkMode }) {
  return (
    <div className={`query-results ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <span>Query Results</span>
        <span className="row-count">
          {queryResults.length} row{queryResults.length !== 1 ? "s" : ""} returned
        </span>
      </div>
      <div className="content">
        {queryResults.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {Object.keys(queryResults[0]).map((key, index) => (
                    <th key={index}>{key.replace(/_/g, " ")}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResults.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 1 ? 'striped' : ''}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-results">No results to display. Execute a query to see results here.</div>
        )}
      </div>
    </div>
  );
}
