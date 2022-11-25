var express = require('express');

var router = express.Router();

var database = require('../database');

router.get('/', function (req, res, next) {
  database.query('SELECT * FROM sala ORDER BY id desc', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('salas', { data: '' })
    } else {
      res.render('salas', { data: rows })
    }
  })
})

router.get("/add", function (request, response, next) {

  response.render("salas", { title: 'Insert Data into MySQL', action: 'add' });

});

router.post("/adicionar_sala", function (request, response, next) {

  var nome = request.body.nome;

  var query = `
	INSERT INTO sala 
	(nome) 
	VALUES ("${nome}")`;

  database.query(query, function (error, data) {

    if (error) {
      throw error;
    } else {
      // request.flash('success', 'Sala Adicionada');
      response.redirect("/salas");
    }

  });

});

router.get('/edit/:id', function (request, response, next) {

  var id = request.params.id;

  var query = `SELECT * FROM sala WHERE id = "${id}"`;

  database.query(query, function (error, data) {

    response.render('sala', { title: 'Edit MySQL Table Data', action: 'edit', sampleData: data[0] });

  });

});

router.post('/edit/:id', function (request, response, next) {

  var id = request.params.id;

  var nome = request.body.nome;

  var query = `
		UPDATE sala 
		SET nome = "${nome}", 
		WHERE id = "${id}"`;

  database.query(query, function (error, data) {

    if (error) {
      throw error;
    } else {
      // request.flash('success', 'Sala Atualizada');
      response.redirect('/alunos');
    }

  });

});

router.get('/delete/:id', function (request, response, next) {

  var id = request.params.id;

  var query = `DELETE FROM sala WHERE id = "${id}"`;

  database.query(query, function (error, data) {

    if (error) {
      throw error;
    } else {
      // request.flash('success', 'Sala Excluído');
      response.redirect("/salas");
    }

  });

});

module.exports = router;