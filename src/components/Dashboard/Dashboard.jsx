import React, { useState, useEffect, useRef } from 'react';
import alasql from 'alasql';
import { initializeDatabase } from '../InitialDB';
import { tableQueries } from '../constant';
import {HistoryModal} from '../sql-query-ui-components/HistoryModal/HistoryModal';
import { Header } from '../sql-query-ui-components/Header/Header';
import { TableSelector } from '../sql-query-ui-components/TableSelector/TableSelector';
import { QueryTabs } from '../sql-query-ui-components/QueryTabs/QueryTabs';
import { QueryEditor } from '../sql-query-ui-components/QueryEditor/QueryEditor';
import { QueryResults } from '../sql-query-ui-components/QueryResults/QueryResults';
import { NewQueryModal } from '../sql-query-ui-components/NewQueryModal/NewQueryModal';
import "./Dashboard.scss"

function Dashboard() {
    const [selectedTable, setSelectedTable] = useState("");
    const [availableTables, setAvailableTables] = useState([]);
    const [tableSearchTerm, setTableSearchTerm] = useState("");
    const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [editableQuery, setEditableQuery] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [queryHistory, setQueryHistory] = useState([]);
    const [executionTime, setExecutionTime] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [queryResults, setQueryResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isNewQueryModalOpen, setIsNewQueryModalOpen] = useState(false);
    const [newQueryName, setNewQueryName] = useState("");
    
    const tableDropdownRef = useRef(null);
  
    useEffect(() => {
      initializeDatabase();
      try {
        const tables = alasql("SHOW TABLES");
        const tableNames = tables.map(table => Object.values(table)[0]);
        setAvailableTables(tableNames);
      } catch (error) {
        console.error("Error fetching tables:", error);
        setErrorMessage("Failed to initialize database");
      }
    }, []);
  
    useEffect(() => {
      if (selectedTable && tableQueries[selectedTable]) {
        setQueries(tableQueries[selectedTable]);
        setSelectedQuery(tableQueries[selectedTable][0]);
        setEditableQuery(tableQueries[selectedTable][0].query);
      } else {
        setQueries([]);
        setSelectedQuery(null);
        setEditableQuery("");
      }
    }, [selectedTable]);
  
    const executeQuery = (query) => {
      setErrorMessage("");
      const startTime = new Date();
  
      try {
        const result = alasql(query);
        const endTime = new Date();
        const timeDiff = endTime - startTime;
        setExecutionTime(timeDiff / 1000);
  
        if (Array.isArray(result) && result.length > 0) {
          setQueryResults(result);
        } else if (Array.isArray(result) && result.length === 0) {
          setQueryResults([
            { message: "Query executed successfully. No results returned." },
          ]);
        } else {
          setQueryResults([
            { message: `Query executed successfully. ${result} rows affected.` },
          ]);
        }
  
        setQueryHistory([
          {
            timestamp: startTime.toLocaleTimeString(),
            query: query,
            executionTime: timeDiff / 1000,
          },
          ...queryHistory.slice(0, 9),
        ]);
      } catch (error) {
        setErrorMessage(error.toString());
        setQueryResults([]);
        setQueryHistory([
          {
            timestamp: startTime.toLocaleTimeString(),
            query: query,
            error: error.toString(),
          },
          ...queryHistory.slice(0, 9),
        ]);
      }
    };
  
    const handleRunQuery = () => {
      executeQuery(editableQuery);
    };
  
    const handleSaveQuery = () => {
      if (!selectedTable || !selectedQuery) return;
  
      const updatedQueries = queries.map((q) =>
        q.id === selectedQuery.id ? { ...q, query: editableQuery } : q
      );
      setQueries(updatedQueries);
      tableQueries[selectedTable] = updatedQueries;
      setIsEditing(false);
    };
  
    const handleTableSelect = (table) => {
      setSelectedTable(table);
      setTableSearchTerm("");
      setIsTableDropdownOpen(false);
    };
  
    const toggleTableDropdown = () => {
      setIsTableDropdownOpen(!isTableDropdownOpen);
    };
  
    const handleNewQueryClick = () => {
      if (!selectedTable) {
        setErrorMessage("Please select a table first to create a new query.");
        return;
      }
      setIsNewQueryModalOpen(true);
      setNewQueryName("");
    };
  
    const handleCreateNewQuery = () => {
      if (!newQueryName.trim() || !selectedTable) return;
  
      const newQuery = {
        id: `${selectedTable}_${queries.length + 1}`,
        name: newQueryName,
        query: `SELECT * FROM ${selectedTable};`
      };
  
      const updatedQueries = [...queries, newQuery];
      setQueries(updatedQueries);
      tableQueries[selectedTable] = updatedQueries;
      setSelectedQuery(newQuery);
      setEditableQuery(newQuery.query);
      setIsEditing(false);
      setIsNewQueryModalOpen(false);
    };
  
    return (
      <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Header 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setIsHistoryModalOpen={setIsHistoryModalOpen}
        />
  
        <div className="card">
          <div className="card-header">
            <TableSelector
              selectedTable={selectedTable}
              tableSearchTerm={tableSearchTerm}
              setTableSearchTerm={setTableSearchTerm}
              isTableDropdownOpen={isTableDropdownOpen}
              toggleTableDropdown={toggleTableDropdown}
              handleTableSelect={handleTableSelect}
              availableTables={availableTables}
              tableDropdownRef={tableDropdownRef}
              isDarkMode={isDarkMode}
              setSelectedTable={setSelectedTable}
              setIsTableDropdownOpen={setIsTableDropdownOpen}
              setErrorMessage={setErrorMessage}
            />
            
            <button
              onClick={handleNewQueryClick}
              className={`new-query-btn ${!selectedTable ? 'disabled' : ''}`}
              disabled={!selectedTable}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Query
            </button>
          </div>
          
          {selectedTable && (
            <QueryTabs
              queries={queries}
              selectedQuery={selectedQuery}
              setSelectedQuery={setSelectedQuery}
              setEditableQuery={setEditableQuery}
              setIsEditing={setIsEditing}
              isDarkMode={isDarkMode}
            />
          )}
          
          <QueryEditor
            editableQuery={editableQuery}
            setEditableQuery={setEditableQuery}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSaveQuery={handleSaveQuery}
            handleRunQuery={handleRunQuery}
            selectedTable={selectedTable}
            isDarkMode={isDarkMode}
            executionTime={executionTime}
            errorMessage={errorMessage}
          />
        </div>
  
        <QueryResults queryResults={queryResults} isDarkMode={isDarkMode} />
  
        {isHistoryModalOpen && (
          <HistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            queryHistory={queryHistory}
            onExecuteQuery={(query) => {
              setEditableQuery(query);
              setIsEditing(true);
              executeQuery(query);
            }}
            isDarkMode={isDarkMode}
          />
        )}
  
        <NewQueryModal
          isNewQueryModalOpen={isNewQueryModalOpen}
          setIsNewQueryModalOpen={setIsNewQueryModalOpen}
          selectedTable={selectedTable}
          newQueryName={newQueryName}
          isDarkMode={isDarkMode}
          setNewQueryName={setNewQueryName}
          handleCreateNewQuery={handleCreateNewQuery}
        />
  
        <div className="footer">
          <p>SQL Query Runner | Using AlaSQL for client-side SQL operations</p>
        </div>
      </div>
    );
  }

export default Dashboard;