var express = require('express');
var http = require('http');
var path = require("path");
var parser = require('body-parser');
var app = express();
var server = http.createServer(app);

// Middleware per analizzare il corpo delle richieste
app.use(parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './')));

// Gestione della richiesta GET per la pagina principale
app.get('/', function(req, res) {
    console.log("Ricevuta richiesta HTTP GET");
    res.sendFile(path.join(__dirname, './form.html'));
});

// Gestione della richiesta POST per aggiungere l'età
app.post('/aggiungi', function(req, res) {
    console.log("Ricevuta richiesta HTTP POST");
    console.log("Visualizzo l'oggetto HTTP body");
    console.log(req.body);
    
    // Validazione dell'età
    const eta = parseInt(req.body.eta, 10); // Converti in numero
    if (eta >= 19 && eta <= 31) {
        console.log(`OK: età ${eta} valida`);
        res.send(`<h1>OK: età [${eta}] è valida e accettata.</h1>`);
    } else {
        console.log(`ERROR: età ${eta} non valida`);
        res.send(`<script>setTimeout(function(){ window.location.href = "/"; }, 3000);</script>
                  <h1>ERROR: non posso accettare l'età [${eta}]. Deve essere compresa tra 19 e 31 anni.</h1>`);
    }
});

// Avvio del server sulla porta 8080
server.listen(8080, function() { 
    console.log("Server Web in ascolto sulla porta: 8080");
});



