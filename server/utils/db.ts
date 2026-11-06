import mysql from 'mysql2/promise'

let pool: mysql.Pool | undefined

export function useDb() {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 4000),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'mydb',
            ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
            waitForConnections: true,
            connectionLimit: 3,
            queueLimit: 0
        })
    }
    return pool
}
