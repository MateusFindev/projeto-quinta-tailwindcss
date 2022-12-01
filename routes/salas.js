var express = require('express');

var router = express.Router();

var database = require('../database');

router.get('/', function (req, res, next) {
  const info = []
  database.query('SELECT * FROM sala ORDER BY id DESC', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('salas', { data: '' })
    } else {
      database.query('SELECT * FROM professor_sala ORDER BY id DESC', function (err2, rows2) {
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

module.exports = router;