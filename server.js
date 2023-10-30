const express = require('express');
const mysql = require('mysql');                 //importando módulos
const bodyParser = require('body-parser');

const app = express();    //inicializar

app.use(bodyParser.json());  //"tradutor"


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',                   //conxão com o banco de dados
    password: '',
    database: 'agricula'
});

db.connect(function(err) {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;                                                 //tenta conectar: se nn deu :(  se deu :)
    }
    console.log('Conectado ao banco de dados com o ID ' + db.threadId);
});

app.post('/cultura', function(req, res) {
    var postData = req.body;
    db.query('INSERT INTO cultura SET ?', postData, function(error, results, fields) {  // Rota para adicionar na cultura
        if (error) throw error;
        res.send(results);
    });
});

app.get('/cultura', function(req, res) {
    db.query('SELECT * FROM cultura', function(error, results, fields) {        //busca e retorna colunas
        if (error) throw error;
        res.send(results);
    });
});


app.put('/cultura/:id', function(req, res) {
    var data = req.body;
    var id = req.params.id;
    db.query('UPDATE cultura SET ? WHERE codigo_cultura = ?', [data, id], function(error, results, fields) {   //atualiza cultura
        if (error) throw error;
        res.send(results);
    });
});

app.delete('/cultura/:id', function(req, res) {
    var id = req.params.id;
    db.query('DELETE FROM cultura WHERE codigo_cultura = ?', [id], function(error, results, fields) {    //exclui cultura
        if (error) throw error;
        res.send(results);
    });
});

app.get('/cultura/:id', function(req, res) {
    var id = req.params.id;
    db.query('SELECT * FROM cultura WHERE codigo_cultura = ?', [id], function(error, results, fields) {   
        if (error) throw error;         //rota busca e retorna uma cultura específica do banco de dados com base no id fornecido na URL.
        res.send(results[0]);
    });
});


app.listen(3000, function() {
    console.log('Aplicativo rodando na porta 3000!');   // Iniciando o servidor na porta 3000
});
