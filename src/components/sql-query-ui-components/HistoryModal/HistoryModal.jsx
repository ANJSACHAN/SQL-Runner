import React, { useState, useEffect, useRef } from "react";
import "./HistoryModal.scss";

export function HistoryModal({
  isOpen,
  onClose,
  queryHistory,
  onExecuteQuery,
  isDarkMode,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [timeFilter, setTimeFilter] = useState("all");
  const modalRef = useRef(null);

  const filteredHistory = queryHistory?.filter((item) => {
    const matchesSearch =
      item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.timestamp.toLowerCase().includes(searchTerm.toLowerCase());

    if (timeFilter === "all") return matchesSearch;
    const queryTime = new Date(`1970-01-01T${item.timestamp}`);
    const now = new Date();
    now.setHours(
      queryTime.getHours(),
      queryTime.getMinutes(),
      queryTime.getSeconds()
    );

    if (timeFilter === "last1hr") {
      return (
        matchesSearch &&
        now >= new Date(new Date().setHours(new Date().getHours() - 1))
      );
    }
    if (timeFilter === "last24hr") {
      return (
        matchesSearch &&
        now >= new Date(new Date().setDate(new Date().getDate() - 1))
      );
    }
    return matchesSearch;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div ref={modalRef} className="modal-container">
        <div className="modal-header">
          <h3>Query History</h3>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>

        <div className="modal-controls">
          <input
            type="text"
            placeholder="Search by query..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="last1hr">Last 1 Hour</option>
            <option value="last24hr">Last 24 Hours</option>
          </select>
        </div>

        <div className="modal-content">
          {filteredHistory && filteredHistory.length > 0 ? (
            <div className="query-list">
              {filteredHistory.map((item, index) => (
                <div
                  key={index}
                  className={`query-item ${selectedQuery === item ? "selected" : ""}`}
                  onClick={() => setSelectedQuery(item)}
                >
                  <div className="query-meta">
                    <span className="timestamp">{item.timestamp}</span>
                    <span className={`execution-time ${item.error ? "error" : "success"}`}>
                      {item.executionTime !== undefined && !isNaN(item.executionTime)
                        ? item.executionTime.toFixed(3) + "s"
                        : "Failed"}
                    </span>
                  </div>
                  <div className="query-text">{item.query}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-queries">No matching queries found</div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button
            onClick={() => {
              if (selectedQuery) {
                onExecuteQuery(selectedQuery.query);
                onClose();
              }
            }}
            disabled={!selectedQuery}
            className={`execute-button ${selectedQuery ? "active" : "disabled"}`}
          >
            Execute Query
          </button>
        </div>
      </div>
    </div>
  );
}


