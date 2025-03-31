import React, { useState, useEffect } from "react";
import alasql from "alasql";

// Initialize database and tables with sample data
const initializeDatabase = () => {
  // Create tables
  alasql(
    "CREATE TABLE IF NOT EXISTS users (id INT, name STRING, email STRING, status STRING, joined_date STRING, last_login STRING)"
  );
  alasql(
    "CREATE TABLE IF NOT EXISTS orders (order_id INT, customer_id INT, product STRING, quantity INT, amount STRING, order_date STRING, status STRING)"
  );
  alasql(
    "CREATE TABLE IF NOT EXISTS products (product_id INT, name STRING, category STRING, price STRING, stock_quantity INT, supplier STRING)"
  );
  alasql(
    "CREATE TABLE IF NOT EXISTS customers (id INT, name STRING, email STRING, country STRING, total_spent STRING, loyalty_tier STRING)"
  );
  alasql(
    "CREATE TABLE IF NOT EXISTS employees (id INT, name STRING, department STRING, position STRING, hire_date STRING, salary STRING)"
  );

  // Insert data
  alasql(
    "INSERT INTO users VALUES (1, 'Alice Smith', 'alice@example.com', 'active', '2023-05-12', '2025-03-28')"
  );
  alasql(
    "INSERT INTO users VALUES (2, 'Bob Johnson', 'bob@example.com', 'active', '2023-06-24', '2025-03-29')"
  );
  alasql(
    "INSERT INTO users VALUES (3, 'Carol Williams', 'carol@example.com', 'active', '2023-07-15', '2025-03-27')"
  );
  alasql(
    "INSERT INTO users VALUES (4, 'Dave Brown', 'dave@example.com', 'active', '2023-08-02', '2025-03-30')"
  );

  alasql(
    "INSERT INTO orders VALUES (101, 3, 'Laptop Pro X1', 1, '$1299.99', '2025-03-15', 'delivered')"
  );
  alasql(
    "INSERT INTO orders VALUES (102, 1, 'Smartphone S22', 1, '$899.99', '2025-03-10', 'shipped')"
  );
  alasql(
    "INSERT INTO orders VALUES (103, 4, 'Wireless Headphones', 2, '$299.98', '2025-02-28', 'delivered')"
  );
  alasql(
    "INSERT INTO orders VALUES (104, 2, '4K Monitor', 1, '$449.99', '2025-02-15', 'delivered')"
  );

  alasql(
    "INSERT INTO products VALUES (5001, 'Laptop Pro X1', 'Electronics', '$1299.99', 5, 'TechGiant Inc')"
  );
  alasql(
    "INSERT INTO products VALUES (5002, 'Smartphone S22', 'Electronics', '$899.99', 12, 'MobileWorld')"
  );
  alasql(
    "INSERT INTO products VALUES (5003, 'Wireless Headphones', 'Audio', '$149.99', 8, 'SoundMasters')"
  );
  alasql(
    "INSERT INTO products VALUES (5004, 'Ergonomic Keyboard', 'Accessories', '$89.99', 15, 'OfficeSupply Co')"
  );

  alasql(
    "INSERT INTO customers VALUES (1, 'Alice Smith', 'alice@example.com', 'USA', '$3450.87', 'Gold')"
  );
  alasql(
    "INSERT INTO customers VALUES (2, 'Bob Johnson', 'bob@example.com', 'Canada', '$1599.99', 'Silver')"
  );
  alasql(
    "INSERT INTO customers VALUES (3, 'Carol Williams', 'carol@example.com', 'UK', '$899.97', 'Bronze')"
  );
  alasql(
    "INSERT INTO customers VALUES (4, 'Dave Brown', 'dave@example.com', 'Australia', '$2899.45', 'Gold')"
  );

  alasql(
    "INSERT INTO employees VALUES (101, 'John Smith', 'Engineering', 'Senior Developer', '2022-01-15', '$110,000')"
  );
  alasql(
    "INSERT INTO employees VALUES (102, 'Emily Johnson', 'Marketing', 'Marketing Manager', '2022-03-10', '$98,000')"
  );
  alasql(
    "INSERT INTO employees VALUES (103, 'Michael Davis', 'Sales', 'Sales Representative', '2022-06-22', '$85,000')"
  );
  alasql(
    "INSERT INTO employees VALUES (104, 'Sarah Wilson', 'HR', 'HR Specialist', '2022-02-14', '$92,000')"
  );
};

// Predefined queries for initial state
const predefinedQueries = [
  {
    id: "1",
    name: "All Users",
    query: "SELECT * FROM users WHERE status = 'active';",
  },
  {
    id: "2",
    name: "Recent Orders",
    query:
      "SELECT * FROM orders WHERE order_date > '2025-01-01' ORDER BY order_date DESC;",
  },
  {
    id: "3",
    name: "Low Stock Products",
    query:
      "SELECT * FROM products WHERE stock_quantity < 20 ORDER BY stock_quantity ASC;",
  },
  {
    id: "4",
    name: "Customer Analysis",
    query: "SELECT * FROM customers ORDER BY total_spent DESC;",
  },
  {
    id: "5",
    name: "Employee Directory",
    query: "SELECT * FROM employees ORDER BY department, name;",
  },
  {
    id: "6",
    name: "Custom Query",
    query:
      "-- Write your custom SQL query here\nSELECT * FROM users JOIN orders ON users.id = orders.customer_id;",
  },
];

export default function SQLQueryApp() {
  const [queries, setQueries] = useState(predefinedQueries);
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [editableQuery, setEditableQuery] = useState(selectedQuery.query);
  const [isEditing, setIsEditing] = useState(false);
  const [queryHistory, setQueryHistory] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [queryResults, setQueryResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize alasql database
  useEffect(() => {
    initializeDatabase();

    // Execute initial query
    executeQuery(selectedQuery.query);
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setEditableQuery(selectedQuery.query);
    }
  }, [selectedQuery, isEditing]);

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

      // Add to history
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

      // Add to history as failed
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
    const updatedQueries = queries.map((q) =>
      q.id === selectedQuery.id ? { ...q, query: editableQuery } : q
    );
    setQueries(updatedQueries);
    setIsEditing(false);
  };

  const handleAddNewQuery = () => {
    const newId = (
      Math.max(...queries.map((q) => parseInt(q.id))) + 1
    ).toString();
    const newQuery = {
      id: newId,
      name: `New Query ${newId}`,
      query: "SELECT * FROM users;",
    };
    setQueries([...queries, newQuery]);
    setSelectedQuery(newQuery);
    setEditableQuery(newQuery.query);
    setIsEditing(true);

    // Clear results when creating a new query
    setQueryResults([]);
  };

  const handleDeleteQuery = (id) => {
    if (queries.length <= 1) return;
    const updatedQueries = queries.filter((q) => q.id !== id);
    setQueries(updatedQueries);
    if (selectedQuery.id === id) {
      setSelectedQuery(updatedQueries[0]);
      setEditableQuery(updatedQueries[0].query);
    }
  };

  const handleHistoryClick = (query) => {
    setEditableQuery(query);
    setIsEditing(true);
  };

  // Custom class based on dark/light mode
  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const textClass = isDarkMode ? "text-gray-200" : "text-gray-800";
  const cardBgClass = isDarkMode ? "bg-gray-800" : "bg-white";
  const cardBorderClass = isDarkMode ? "border-gray-700" : "border-gray-200";
  const headerBgClass = isDarkMode ? "bg-indigo-900" : "bg-indigo-600";
  const secondaryBgClass = isDarkMode ? "bg-gray-700" : "bg-gray-100";
  const inputBgClass = isDarkMode
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-300";
  const tableBorderClass = isDarkMode ? "border-gray-700" : "border-gray-200";
  const tableHeaderClass = isDarkMode ? "bg-gray-700" : "bg-gray-100";
  const tableStripedClass = isDarkMode ? "bg-gray-750" : "bg-gray-50";
  const accentColor = isDarkMode ? "indigo-500" : "indigo-600";
  const accentHoverColor = isDarkMode ? "indigo-400" : "indigo-700";

  return (
    <div
      className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-200 p-4 md:p-6`}
    >
      {/* App Header */}
      <div className={`${headerBgClass} rounded-t-lg shadow-lg text-white p-4 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="7" y1="8" x2="17" y2="8"></line>
            <line x1="7" y1="12" x2="17" y2="12"></line>
            <line x1="7" y1="16" x2="13" y2="16"></line>
          </svg>
          <h1 className="text-2xl font-bold">SQL Query Explorer</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-indigo-500 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          <button
            onClick={handleAddNewQuery}
            className={`px-3 py-1.5 bg-${accentColor} hover:bg-${accentHoverColor} rounded text-white transition-colors duration-200 flex items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
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
      </div>

      {/* Main content area - 2 column layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left side - Query editor and results */}
        <div className="md:w-8/12 pr-0 md:pr-4">
          {/* Query selector tabs in horizontal scrollable area */}
          <div className={`${secondaryBgClass} border-b ${cardBorderClass} overflow-x-auto whitespace-nowrap p-1 rounded-tr-none rounded-tl-none`}>
            <div className="flex space-x-1 p-1">
              {queries.map((query) => (
                <div
                  key={query.id}
                  className={`inline-flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                    selectedQuery.id === query.id
                      ? isDarkMode
                        ? "bg-indigo-900 text-indigo-200 border border-indigo-700"
                        : "bg-indigo-100 text-indigo-800 border border-indigo-300"
                      : isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedQuery(query);
                    setIsEditing(false);
                    executeQuery(query.query);
                  }}
                >
                  <span className="truncate max-w-xs">{query.name}</span>
                  {queries.length > 1 && (
                    <button
                      className={`ml-2 ${
                        isDarkMode
                          ? "text-gray-400 hover:text-red-300"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteQuery(query.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Query editor card */}
          <div className={`${cardBgClass} border ${cardBorderClass} shadow-md rounded-b-lg mb-4`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">SQL Query Editor</h3>
                <div className="flex space-x-2">
                  {isEditing && (
                    <button
                      onClick={handleSaveQuery}
                      className={`px-3 py-1.5 ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } rounded text-sm transition-colors duration-200 flex items-center`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
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
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors duration-200 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
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

              <div className="relative">
                <textarea
                  className={`w-full p-3 border rounded-md h-40 font-mono text-sm transition-colors duration-200 ${inputBgClass}`}
                  value={editableQuery}
                  onChange={(e) => {
                    setEditableQuery(e.target.value);
                    if (!isEditing) setIsEditing(true);
                  }}
                  spellCheck="false"
                />
              </div>

              {/* Query execution info */}
              {executionTime && !errorMessage && (
                <div className="mt-2 text-xs flex justify-end">
                  <span
                    className={isDarkMode ? "text-green-400" : "text-green-600"}
                  >
                    Query executed in {executionTime.toFixed(3)} seconds
                  </span>
                </div>
              )}

              {/* Error message */}
              {errorMessage && (
                <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-800 rounded">
                  <p className="text-sm font-semibold">Error executing query:</p>
                  <p className="text-xs font-mono">{errorMessage}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results section */}
          <div className={`${cardBgClass} border ${cardBorderClass} shadow-md rounded-lg`}>
            <div className={`${headerBgClass} text-white p-3 font-semibold rounded-t-lg flex justify-between items-center`}>
              <span>Query Results</span>
              <span className="text-sm">
                {queryResults.length} row{queryResults.length !== 1 ? "s" : ""} returned
              </span>
            </div>
            <div className="p-4">
              {queryResults.length > 0 ? (
                <div
                  className={`overflow-x-auto border ${tableBorderClass} rounded-md shadow transition-colors duration-200`}
                >
                  <table className="w-full border-collapse">
                    <thead>
                      <tr
                        className={`${tableHeaderClass} border-b ${tableBorderClass} transition-colors duration-200`}
                      >
                        {Object.keys(queryResults[0]).map((key, index) => (
                          <th
                            key={index}
                            className={`border-r last:border-r-0 p-2 text-left font-semibold ${tableBorderClass} transition-colors duration-200`}
                          >
                            {key.replace(/_/g, " ")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResults.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={`border-b last:border-b-0 ${tableBorderClass} ${
                            rowIndex % 2 === 1 ? tableStripedClass : ""
                          } transition-colors duration-200`}
                        >
                          {Object.values(row).map((value, colIndex) => (
                            <td
                              key={colIndex}
                              className={`border-r last:border-r-0 p-2 ${tableBorderClass} transition-colors duration-200`}
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div
                  className={`p-4 text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No results to display. Execute a query to see results here.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Query history and available tables */}
        <div className="md:w-4/12 mt-4 md:mt-0">
          {/* Query History Card */}
          <div className={`${cardBgClass} border ${cardBorderClass} shadow-md rounded-lg mb-4`}>
            <div className={`${headerBgClass} text-white p-3 font-semibold rounded-t-lg`}>
              Query History
            </div>
            <div className="p-4">
              {queryHistory.length > 0 ? (
                <div className="overflow-y-auto max-h-80 space-y-2">
                  {queryHistory.map((item, index) => (
                    <div
                      key={index}
                      className={`p-2 ${secondaryBgClass} border ${cardBorderClass} rounded-md text-sm cursor-pointer hover:${
                        isDarkMode ? "bg-gray-600" : "bg-gray-200"
                      } transition-colors duration-200`}
                      onClick={() => handleHistoryClick(item.query)}
                    >
                      <div
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        } flex justify-between`}
                      >
                        <span>{item.timestamp}</span>
                        {item.error ? (
                          <span className="text-red-500">Failed</span>
                        ) : (
                          <span className={isDarkMode ? "text-green-400" : "text-green-600"}>
                            {item.executionTime.toFixed(3)}s
                          </span>
                        )}
                      </div>
                      <div className="font-mono truncate mt-1">{item.query}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  No query history yet
                </p>
              )}
            </div>
          </div>

          {/* Available Tables Card */}
          <div className={`${cardBgClass} border ${cardBorderClass} shadow-md rounded-lg`}>
            <div className={`${headerBgClass} text-white p-3 font-semibold rounded-t-lg`}>
              Available Tables
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {["users", "orders", "products", "customers", "employees"].map(
                  (table) => (
                    <div
                      key={table}
                      className={`p-3 border ${cardBorderClass} rounded-md ${secondaryBgClass} hover:${
                        isDarkMode ? "bg-gray-600" : "bg-gray-200"
                      } transition-colors duration-200`}
                    >
                      <h4 className="font-semibold mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
                          <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M7 4v16M17 4v16" />
                        </svg>
                        <span className="capitalize">{table}</span>
                      </h4>
                      <div className="flex flex-wrap">
                        <button
                          className={`px-2 py-1 ${
                            isDarkMode
                              ? "bg-indigo-800 hover:bg-indigo-700 text-indigo-200"
                              : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                          } rounded text-xs mr-1 mb-1 transition-colors duration-200`}
                          onClick={() => {
                            const query = `SELECT * FROM ${table};`;
                            setEditableQuery(query);
                            setIsEditing(true);
                            executeQuery(query);
                          }}
                        >
                          SELECT *
                        </button>
                        <button
                          className={`px-2 py-1 ${
                            isDarkMode
                              ? "bg-green-800 hover:bg-green-700 text-green-200"
                              : "bg-green-100 hover:bg-green-200 text-green-800"
                          } rounded text-xs mr-1 mb-1 transition-colors duration-200`}
                          onClick={() => {
                            const query = `SELECT VALUE COUNT(*) FROM ${table}`;
                            setEditableQuery(query);
                            setIsEditing(true);
                            executeQuery(query);
                          }}
                        >
                          COUNT
                        </button>
                        <button
                          className={`px-2 py-1 ${
                            isDarkMode
                              ? "bg-blue-800 hover:bg-blue-700 text-blue-200"
                              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                          } rounded text-xs mr-1 mb-1 transition-colors duration-200`}
                          onClick={() => {
                            const query = `SELECT * FROM ${table} LIMIT 1;`;
                            setEditableQuery(query);
                            setIsEditing(true);
                            executeQuery(query);
                          }}
                        >
                          STRUCTURE
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>
          SQL Query Explorer v2.0 | Using AlaSQL for client-side SQL operations
        </p>
      </div>
    </div>
  );
}