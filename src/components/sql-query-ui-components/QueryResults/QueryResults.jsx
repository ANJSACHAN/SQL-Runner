import React from "react";
import { List, AutoSizer } from "react-virtualized";
import "./QueryResults.scss";

export function QueryResults({ queryResults, isDarkMode }) {
  const rowRenderer = ({ key, index, style }) => {
    const row = queryResults[index];
    return (
      <div key={key} style={style} className={`table-row ${index % 2 === 1 ? "striped" : ""}`}>
        {Object.values(row).map((value, colIndex) => (
          <div key={colIndex} className="table-cell">
            {value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`query-results ${isDarkMode ? "dark" : "light"}`}>
      <div className="header">
        <span>Query Results</span>
        <span className="row-count">
          {queryResults.length} row{queryResults.length !== 1 ? "s" : ""} returned
        </span>
      </div>

      <div className="content">
        {queryResults.length > 0 ? (
          <div className="table-container">
            <div className="table-header">
              {Object.keys(queryResults[0]).map((key, index) => (
                <div key={index} className="table-cell header-cell">
                  {key.replace(/_/g, " ")}
                </div>
              ))}
            </div>
            <div className="table-body">
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    width={width}
                    height={height}
                    rowCount={queryResults.length}
                    rowHeight={40} // Adjust row height as needed
                    rowRenderer={rowRenderer}
                  />
                )}
              </AutoSizer>
            </div>
          </div>
        ) : (
          <div className="no-results">No results to display. Execute a query to see results here.</div>
        )}
      </div>
    </div>
  );
}
