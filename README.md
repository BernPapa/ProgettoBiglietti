Relazione sul Progetto: Event Management System
1. Specifiche dell'Applicazione
L'applicazione sviluppata è un Event Management System, che permette agli utenti di:

Registrarsi e accedere con credenziali sicure.

Creare eventi con titolo, descrizione, data, luogo, posti disponibili e organizzatore.

Visualizzare gli eventi disponibili.

Prenotare biglietti per gli eventi.

L’applicazione è realizzata utilizzando Node.js e Express per il backend, MySQL per il database, e una semplice interfaccia HTML+CSS per il frontend.
Per la sicurezza, sono stati implementati JWT per l'autenticazione e Bcrypt.js per l'hashing delle password.

2. Struttura del Database
Il database utilizza MySQL e include le seguenti tabelle principali:

Tabella users (Gestisce gli utenti)
Campo	Tipo	Attributi
id	INT	PRIMARY KEY, AUTO_INCREMENT
name	VARCHAR(255)	NOT NULL
email	VARCHAR(255)	UNIQUE, NOT NULL
password	VARCHAR(255)	NOT NULL
role	ENUM('user', 'organizer')	DEFAULT 'user'
Tabella events (Gestisce gli eventi)
Campo	Tipo	Attributi
id	INT	PRIMARY KEY, AUTO_INCREMENT
title	VARCHAR(255)	NOT NULL
description	TEXT	NOT NULL
date	DATETIME	NOT NULL
location	VARCHAR(255)	NOT NULL
available_tickets	INT	NOT NULL
organizer_id	INT	FOREIGN KEY (users.id)
Tabella bookings (Gestisce le prenotazioni di eventi)
Campo	Tipo	Attributi
id	INT	PRIMARY KEY, AUTO_INCREMENT
event_id	INT	FOREIGN KEY (events.id)
user_id	INT	FOREIGN KEY (users.id)
3. API REST Implementate
L'applicazione offre diverse API REST per la gestione degli utenti, degli eventi e delle prenotazioni.

Auth API (Gestione autenticazione)
1. Registrazione
Endpoint: POST /api/auth/register

Body JSON:

json
Copia
Modifica
{
  "name": "Mario Rossi",
  "email": "mario@example.com",
  "password": "password123",
  "role": "user"
}
Risposta:

json
Copia
Modifica
{ "message": "Utente registrato con successo" }
2. Login
Endpoint: POST /api/auth/login

Body JSON:

json
Copia
Modifica
{
  "email": "mario@example.com",
  "password": "password123"
}
Risposta:

json
Copia
Modifica
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Mario Rossi",
    "role": "user"
  }
}
Event API (Gestione eventi)
3. Creare un evento
Endpoint: POST /api/events/create

Body JSON:

json
Copia
Modifica
{
  "title": "Concerto Jazz",
  "description": "Concerto di musica jazz dal vivo",
  "date": "2025-06-10T20:00:00",
  "location": "Teatro Verdi",
  "available_tickets": 100,
  "organizer_id": 1
}
Risposta:

json
Copia
Modifica
{ "message": "Evento creato con successo" }
4. Ottenere tutti gli eventi
Endpoint: GET /api/events

Risposta:

json
Copia
Modifica
[
  {
    "id": 1,
    "title": "Concerto Jazz",
    "description": "Concerto di musica jazz dal vivo",
    "date": "2025-06-10T20:00:00",
    "location": "Teatro Verdi",
    "available_tickets": 100,
    "organizer_id": 1
  }
]
Booking API (Gestione prenotazioni)
5. Prenotare un biglietto
Endpoint: POST /api/bookings

Body JSON:

json
Copia
Modifica
{
  "event_id": 1,
  "user_id": 2
}
Risposta:

json
Copia
Modifica
{ "message": "Biglietto prenotato" }
4. Istruzioni CURL per testare le API
Ecco alcuni comandi cURL per testare le API:

1. Registrazione di un utente
sh
Copia
Modifica
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{
  "name": "Mario Rossi",
  "email": "mario@example.com",
  "password": "password123",
  "role": "user"
}'
2. Login
sh
Copia
Modifica
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{
  "email": "mario@example.com",
  "password": "password123"
}'
3. Creazione evento
sh
Copia
Modifica
curl -X POST http://localhost:5000/api/events/create -H "Content-Type: application/json" -d '{
  "title": "Concerto Jazz",
  "description": "Concerto di musica jazz dal vivo",
  "date": "2025-06-10T20:00:00",
  "location": "Teatro Verdi",
  "available_tickets": 100,
  "organizer_id": 1
}'
4. Ottenere tutti gli eventi
sh
Copia
Modifica
curl -X GET http://localhost:5000/api/events
5. Prenotare un biglietto
sh
Copia
Modifica
curl -X POST http://localhost:5000/api/bookings -H "Content-Type: application/json" -d '{
  "event_id": 1,
  "user_id": 2
}'
5. Test Effettuati
Abbiamo testato l'applicazione nei seguenti scenari:

✅ Test funzionali
Registrazione utente → L'utente viene salvato nel database con password crittografata.

Login utente → Se le credenziali sono corrette, il sistema restituisce un token JWT.

Creazione evento → L’evento viene registrato nel database con i dettagli corretti.

Visualizzazione eventi → Il sistema restituisce l'elenco corretto degli eventi.

Prenotazione biglietti → Il sistema consente agli utenti di prenotare correttamente.

🔴 Test di errore
Login con email errata → Il sistema restituisce "Utente non trovato".

Login con password errata → Il sistema restituisce "Password errata".

Creazione evento con dati mancanti → Il sistema restituisce un errore di validazione.

Prenotazione senza event_id o user_id → Il sistema blocca la richiesta.

Conclusione
L’applicazione è ora funzionante e testata con successo.
Possibili miglioramenti futuri:

Implementazione di un sistema di gestione ruoli avanzato.

Aggiunta di un'interfaccia frontend più moderna con React o Vue.js.

Implementazione di pagamenti online per i biglietti.
