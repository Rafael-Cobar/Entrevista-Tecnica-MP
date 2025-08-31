// src/config/db.ts
import sql from "mssql";
import { envs } from "../../config/index.js";

export class Database {
	private static instance: Database;
	private pool: sql.ConnectionPool | null = null;
	private config: sql.config = {
		user: envs.DB_USER,
		password: envs.DB_PASS,
		server: envs.DB_SERVER,
		database: envs.DB_NAME,
		port: envs.DB_PORT,
		options: {
			encrypt: envs.DB_ENCRYPT,
			trustServerCertificate: envs.DB_TRUSTSERVERCERTIFICATE,
		},
	};

	private constructor() {}

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	public async connect(): Promise<sql.ConnectionPool> {
		try {
			if (!this.pool) {
				this.pool = await sql.connect(this.config);
				console.log("Connection to SQL Server established");
			}
			return this.pool;
		} catch (err) {
			console.error("Error connecting to SQL Server", err);
			throw err;
		}
	}

	public async close(): Promise<void> {
		try {
			if (this.pool) {
				await this.pool.close();
				this.pool = null;
				console.log("Connection to SQL Server closed");
			}
		} catch (err) {
			console.error("Error closing connection:", err);
		}
	}
}
