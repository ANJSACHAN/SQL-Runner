import React from 'react';
import './TableSelector.scss';

export function TableSelector({ 
  selectedTable, 
  tableSearchTerm, 
  setTableSearchTerm, 
  isTableDropdownOpen, 
  toggleTableDropdown,
  handleTableSelect,
  availableTables,
  tableDropdownRef,
  isDarkMode,
  setSelectedTable,
  setIsTableDropdownOpen,
  setErrorMessage
}) {
  const filteredTables = availableTables.filter(table => 
    table.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  return (
    <div className="table-selector">
      <label>Table:</label>
      <div className="dropdown-container" ref={tableDropdownRef}>
        <div
          onClick={toggleTableDropdown}
          className={`dropdown-trigger ${isDarkMode ? 'dark' : 'light'}`}
        >
          <span>{selectedTable || "Select a table"}</span>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isTableDropdownOpen && (
          <div className={`dropdown-menu ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="search-input">
              <input
                type="text"
                className={isDarkMode ? 'dark' : 'light'}
                placeholder="Search tables..."
                value={tableSearchTerm}
                onChange={(e) => setTableSearchTerm(e.target.value)}
              />
            </div>
            <ul className="table-list">
              {filteredTables.length > 0 ? (
                filteredTables.map((table) => (
                  <li
                    key={table}
                    className={isDarkMode ? 'dark' : 'light'}
                    onClick={() => handleTableSelect(table)}
                  >
                    {table}
                  </li>
                ))
              ) : (
                <li className="no-results">No tables found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {selectedTable && (
        <button
          onClick={() => {
            setSelectedTable("");
            setTableSearchTerm("");
            setIsTableDropdownOpen(false);
            setErrorMessage("");
          }}
          className={`custom-query-button ${isDarkMode ? 'dark' : 'light'}`}
        >
          Custom Query
        </button>
      )}
    </div>
  );
}