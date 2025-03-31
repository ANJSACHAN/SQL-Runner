# SQL Query Web App

Deployment Link: https://sql-runner-lemon.vercel.app/

Video Link: https://drive.google.com/file/d/1hszKBpyvLJd5wmYgRJ7SruqMgl0LlIuw/view?usp=sharing

This is a web-based application that allows users to input SQL queries and view corresponding data results.

## Key Features

- **Query Input Area**: The core feature of the app is a text input area where users can insert, edit, and execute SQL queries.
- **Query Results Display**: Below the query input, the results are displayed in a dedicated results widget, showing the data corresponding to the executed SQL query.
- **Query Collection**: Users can create a collection of their most frequently used queries, making it easy to reuse them. Additionally, the app allows users to quickly access frequently searched tables.
- **Query History**: The app automatically records all executed queries, providing users with a history of their past queries. allowing them to view, revisit, and execute previously run queries with ease. Users can sort or filter their query history using multiple filtering criteria such as query name, execution date, or specific table used.
- **Minimal UI**: The app provides a sleek, minimalistic UI that maximizes screen real estate. It also includes a light/dark mode toggle for a better user experience in different environments.

## Technologies Used

- **JavaScript Framework**: [React](https://reactjs.org/) - Used for building the interactive user interface.
- **SQL Query Simulation**: [Alasql](https://github.com/agershun/alasql) - A JavaScript library that simulates SQL query execution directly in the browser, allowing the app to process and display results from SQL queries without a backend or database.
- **Styling**: [Sass](https://sass-lang.com/) - A CSS preprocessor for styling the application.
- **Build Tool**: [Vite](https://vitejs.dev/) - A fast and efficient build tool for modern web apps.
- **Linting**: [ESLint](https://eslint.org/) - Linting tool used for ensuring code quality.
- **Performance Optimization**: [React Virtualized](https://github.com/bvaughn/react-virtualized) - A React library used to virtualize large lists and tables, ensuring smooth rendering and memory efficiency by only rendering the visible rows.

## Page Load Time

The page load time for the application is under **0.5 seconds**, measured using the browser’s developer tools (Network tab), with a Lighthouse performance score above **90**. This allows the user to quickly interact with the app and start querying SQL without delays.

## Performance Optimizations

- **React Virtualized**: Implemented virtualization for the data tables using the **React Virtualized** library. This allows the app to efficiently render large sets of data by only displaying the visible rows in the table, reducing both memory usage and the time required to render data. This is especially helpful when dealing with hundreds or thousands of rows.

- **React Memoization**: To optimize component re-renders, React's `useMemo` hook was used to prevent unnecessary updates to the data table, ensuring smooth transitions between different queries.

- **Vite Optimizations**: The application leverages **Vite**’s fast bundling and code-splitting capabilities to ensure quick load times and optimal performance.
