import React from 'react';
import './NewQueryModal.scss';

export function NewQueryModal({
  isNewQueryModalOpen,
  setIsNewQueryModalOpen,
  selectedTable,
  newQueryName,
  isDarkMode,
  setNewQueryName,
  handleCreateNewQuery,
}) {
  if (!isNewQueryModalOpen) return null;

  return (
    <div className={`modal-overlay ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Create new query tab for {selectedTable}</h2>
          <button onClick={() => setIsNewQueryModalOpen(false)} className="close-button">
            <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <label>Query Tab Name</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter query tab name"
            value={newQueryName}
            onChange={(e) => setNewQueryName(e.target.value)}
          />
        </div>
        
        <div className="modal-footer">
          <button onClick={() => setIsNewQueryModalOpen(false)} className="cancel-button">Cancel</button>
          <button onClick={handleCreateNewQuery} className="create-button">Create</button>
        </div>
      </div>
    </div>
  );
}
