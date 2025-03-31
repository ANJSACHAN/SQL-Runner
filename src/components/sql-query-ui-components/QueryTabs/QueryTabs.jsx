import React from 'react';
import './QueryTabs.scss';

export function QueryTabs({ queries, selectedQuery, setSelectedQuery, setEditableQuery, setIsEditing, isDarkMode }) {
  return (
    <div className="query-tabs">
      {queries.map((query) => (
        <button
          key={query.id}
          onClick={() => {
            setSelectedQuery(query);
            setEditableQuery(query.query);
            setIsEditing(false);
          }}
          className={`tab-button ${
            selectedQuery?.id === query.id ? 'active' : 'inactive'
          } ${isDarkMode ? 'dark' : 'light'}`}
        >
          {query.name}
        </button>
      ))}
    </div>
  );
}