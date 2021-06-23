var express = require('express');
var router = express.Router();
const sqlCon = require('../utils/conection');

/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO: este codigo no deberia nunca devolver la contraseña al front
  sqlCon.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      console.error(err);
      res.render('error');
    }
    console.log(result)
    res.render('index', { title: 'Express', persons: result });
  });
});

router.get('/new-user', (req, res) => {
  res.render('new-user');
});

router.post('/create-user', (req, res) => {
  const persona = req.body;
  if (!persona.nombre) {
    return res.render('error');
  }
  
  //TODO: este codigo es vulnerable a sql injections, googlear como hacer consultas seguras con mysql2
  sqlCon.query(`
    INSERT INTO \`usuarios\` (\`email\`, \`password\`, \`nombre\`) 
    VALUES ('${persona.email}', '${persona.password}', '${persona.nombre}');
    `,
    (err, result) => {
      if (err) {
        console.error(error);
        return res.render('error');
      }
      console.log(result);
      res.render('success', { nombre: persona.nombre, result });
    }
  );
});

router.get('/api', function(req, res) {
  res.json({ message: '' });
})

module.exports = router;
