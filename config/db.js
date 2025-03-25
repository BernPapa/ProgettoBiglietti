const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "proxy.marconicloud.it",  // Usa "127.0.0.1" invece di "localhost"
    user: "a_utente13",       // Sostituisci con il tuo username MySQL
    password: "a_utente13",       // Sostituisci con la tua password (se presente)
    database: "a_utente13", // Nome del tuo database
    port: 3307          // Porta di MySQL (di default è 3306)
});

db.connect((err) => {
    if (err) {
        console.error("Errore di connessione al database:", err);
        return;
    }
    console.log("Connesso al database MySQL!");
});

module.exports = db;