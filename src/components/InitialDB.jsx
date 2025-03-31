import alasql from "alasql";

export const initializeDatabase = () => {
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
