🧑‍💻 User Management System
A full-stack User Management System built with Node.js, Express.js, MySQL, and Vanilla JavaScript. Designed with simplicity, functionality, and real-world debugging lessons in mind.

✨ Features
🔐 Prevents duplicate user entries

➕ Add new users with instant feedback

🔍 Fuzzy search to find users even with typos (e.g., search aec → finds "Alice")

📋 Dynamic table display without full-page reloads

🗑️ Placeholder delete & edit buttons

💾 MySQL database integration

🌐 REST API with JSON parsing

🛠️ Technologies Used
Backend:

Node.js

Express.js

MySQL (via mysql2)

Dotenv

CORS

Frontend:

HTML, CSS, JavaScript (Vanilla)

Fetch API for asynchronous communication

📁 Project Structure
bash
Copy
Edit
├── app.js               # Express server setup
├── db.js                # MySQL connection and database services
├── public/
│   ├── index.html       # Frontend UI
│   ├── style.css        # Styling
│   └── script.js        # Client-side logic
├── .env                 # Environment variables
└── README.md            # Project documentation
🧠 Debug Story
Spent 3 hours debugging a tricky TypeError: object is not iterable — caused by missing await on a pool.query() call. A painful but valuable reminder: async/await is not optional with promises!

🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/alimasoud827/user-management-system.git
cd user-management-system
2. Install dependencies
bash
Copy
Edit
npm install
3. Setup .env
Create a .env file:

env
Copy
Edit
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=my_sqlproject_db
PORT=5000
4. Initialize database
Run the SQL script to set up your database and table (from /sql/init.sql if available):

sql
Copy
Edit
CREATE DATABASE IF NOT EXISTS my_sqlproject_db;
USE my_sqlproject_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NULL,
    date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
    edited BOOLEAN DEFAULT FALSE
);

-- Optional: Remove duplicates and enforce unique names
ALTER TABLE users ADD CONSTRAINT unique_name UNIQUE (name);
5. Run the app
bash
Copy
Edit
npm start
Visit: http://localhost:5000

📂 Source
Front-end code is located in /public and served statically. Backend handles API routes and database interaction.

🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change or improve.

📜 License
MIT