const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const router = express.Router();

// Registrazione utente
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Utente registrato con successo" });
        }
    );
});

// Login utente
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
        if (err) return res.status(500).json({ error: err.message });
        if (users.length === 0) return res.status(400).json({ error: "Utente non trovato" });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Password errata" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    });
});

module.exports = router;