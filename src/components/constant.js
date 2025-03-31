export const tableQueries = {
    users: [
      {
        id: "users_1",
        name: "All Active Users",
        query: "SELECT * FROM users WHERE status = 'active';",
      },
      {
        id: "users_2", 
        name: "Recent Users",
        query: "SELECT * FROM users ORDER BY joined_date DESC LIMIT 2;",
      }
    ],
    orders: [
      {
        id: "orders_1",
        name: "Recent Orders",
        query: "SELECT * FROM orders ORDER BY order_date DESC LIMIT 2;",
      },
      {
        id: "orders_2",
        name: "High Value Orders",
        query: "SELECT * FROM orders WHERE amount > '$1000';",
      }
    ],
    products: [
      {
        id: "products_1",
        name: "Low Stock Products",
        query: "SELECT * FROM products WHERE stock_quantity < 10;",
      },
      {
        id: "products_2",
        name: "Electronics Products",
        query: "SELECT * FROM products WHERE category = 'Electronics';",
      }
    ],
    customers: [
      {
        id: "customers_1",
        name: "Gold Tier Customers",
        query: "SELECT * FROM customers WHERE loyalty_tier = 'Gold';",
      },
      {
        id: "customers_2",
        name: "High Spenders",
        query: "SELECT * FROM customers ORDER BY total_spent DESC LIMIT 2;",
      }
    ],
    employees: [
      {
        id: "employees_1",
        name: "Engineering Team",
        query: "SELECT * FROM employees WHERE department = 'Engineering';",
      },
      {
        id: "employees_2",
        name: "Recent Hires",
        query: "SELECT * FROM employees ORDER BY hire_date DESC LIMIT 2;",
      }
    ]
  };