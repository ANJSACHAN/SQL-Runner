import React from 'react';
import './QueryEditor.scss';

export function QueryEditor({
  editableQuery,
  setEditableQuery,
  isEditing,
  setIsEditing,
  handleSaveQuery,
  handleRunQuery,
  selectedTable,
  isDarkMode,
  executionTime,
  errorMessage,
}) {
  return (
    <div className="query-editor">
      <div className="editor-header">
        <h3>SQL Query Editor</h3>
        <div className="button-group">
          {isEditing && selectedTable !== "" && (
            <button
              onClick={handleSaveQuery}
              className={`save-button ${isDarkMode ? 'dark' : 'light'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save
            </button>
          )}
          <button
            onClick={handleRunQuery}
            className="execute-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Execute
          </button>
        </div>
      </div>

      <div className="editor-container">
        <textarea
          className={isDarkMode ? 'dark' : 'light'}
          value={editableQuery}
          onChange={(e) => {
            setEditableQuery(e.target.value);
            if (!isEditing) setIsEditing(true);
          }}
          placeholder={selectedTable ? "Write your SQL query here..." : "Select a table to start querying"}
          spellCheck="false"
        />
      </div>

      {executionTime && !errorMessage && (
        <div className={`execution-time ${isDarkMode ? 'dark' : 'light'}`}>
          Query executed in {executionTime.toFixed(3)} seconds
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <p className="error-title">Error:</p>
          <p className="error-details">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}