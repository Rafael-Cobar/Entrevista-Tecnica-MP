IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'db_mp')
BEGIN
    CREATE DATABASE db_mp;
END