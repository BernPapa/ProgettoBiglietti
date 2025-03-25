const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
    const { event_id, user_id } = req.body;
    const sql = 'INSERT INTO bookings (event_id, user_id) VALUES (?, ?)';

    db.query(sql, [event_id, user_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Biglietto prenotato' });
    });
});

module.exports = router;