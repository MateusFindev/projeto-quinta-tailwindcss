var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function (request, response, next) {

	var query = "SELECT * FROM bksmlosyfgid6iwcckvm.sala";
	
	database.query(query, function (error, data) {
		
		if (error) {
			throw error;
		} else {
			var id = request.params.id;
			let nome_atividade = `SELECT nome FROM sala WHERE id = "${id}"`;
			database.query(nome_atividade, function(error, data) {
				if (error) {
					throw error;
				} else {
					response.render('salas', { title: ('Sala / ' + nome_atividade), action: 'list', sala: data, message: 'success' });
				}
			})
		}

	});

});

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
			response.redirect("/salas");
		}

	});

});

module.exports = router;