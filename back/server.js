// back/server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || "db",       // nom du service Docker de la DB
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "royal_user",
  password: process.env.DB_PASSWORD || "royalpass",
  database: process.env.DB_NAME || "royal_db",
};

app.get("/api/health", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.ping();
    await conn.end();
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

// exemple route qui lit une table "users"
app.get("/api/users", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query("SELECT id, firstname, lastname FROM users");
    await conn.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
