// db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});

// getting and sending data
export const databaseServices = async () => {
    const getAllData = async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            return rows;      
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;            
        }
    }
    const insertData = async ({ name, age }) => {
        try {
            if (!name ) {
                return {message: "Name is required"};
            }

            const [existingUser] = await pool.query("SELECT * FROM users WHERE name = ?", [name]);
            if (existingUser.length > 0) {
                return {message: "User already exists"};
            }
            const date_added = new Date();
            const [result] = await pool.query("INSERT INTO users (name, date_added) VALUES (?, ?)", [name, date_added]);

            return {
                id: result.insertId,
                message: "User added successfully",
                name,
                date_added,
            };
        } catch (error) {
            console.error('Error inserting data:', error);
            throw error;                        
        }
    }
    return {
        getAllData,
        insertData
    };
}
