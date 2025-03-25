const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Creazione evento
router.post("/create", (req, res) => {
    const { title, description, date, location, available_tickets, organizer_id } = req.body;

    db.query(
        "INSERT INTO events (title, description, date, location, available_tickets, organizer_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, date, location, available_tickets, organizer_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Evento creato con successo" });
        }
    );
});

// Ottenere eventi
router.get("/", (req, res) => {
    db.query("SELECT * FROM events", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
