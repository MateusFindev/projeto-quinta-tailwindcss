var express = require('express');

var router = express.Router();

var database = require('../database');

router.get('/', function (req, res, next) {
  const info = []
  database.query('SELECT * FROM sala ORDER BY id ASC', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('salas', { data: '' })
    } else {
      database.query('SELECT * FROM professor_sala ORDER BY id ASC', function (err2, rows2) {
        if (err) {
          req.flash('error', err2)
          res.render('salas', { data: '' })
        } else {
          let professor = "";
          let sala = "";
          let professores = [];

          for (let i = 0; i < rows2.length; i++) {
            sala = rows2[i].ID_sala;
            database.query(`SELECT * FROM professor WHERE id=${rows2[i].ID_professor}`, function (err3, rows3) {
              professores.push(rows3)
              
              if (i == rows2.length - 1) {
                info.push(rows)
                info.push(rows2)
                info.push(professores)
                res.render('salas', { data: info });
              }
            })
          }
        }
      })
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