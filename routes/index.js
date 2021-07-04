var express = require('express');
var router = express.Router();
const config =  require('../config');
const sqlCon = require('../utils/conection');
const upload = require('../utils/storage');

/* GET home page. */
router.get('/', function(req, res, next) {
  //TODO: este codigo no deberia nunca devolver la contraseña al front
  sqlCon.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      console.error(err);
      res.render('error');
    }
    res.render('index', { title: 'Express', persons: result });
  });
});

router.get('/new-user', (req, res) => {
  res.render('new-user');
});

router.post('/create-user', 
upload.single('imagen'), // (req, res) => { };
(req, res) => {
  const persona = req.body;
  if (!persona.nombre) {
    return res.render('error');
  }
  
  const fotoSubidaRuta = (req.file) ? `${config.uploadsAccess}${req.file.originalname}` : '';
  
  //TODO: este codigo es vulnerable a sql injections, googlear como hacer consultas seguras con mysql2
  sqlCon.query(`
    INSERT INTO \`usuarios\` (\`email\`, \`password\`, \`nombre\`, \`foto_perfil\`, \`foto_subida\`) 
    VALUES ('${persona.email}', '${persona.password}', '${persona.nombre}', '${persona.image_url}', '${fotoSubidaRuta}');
    `,
    (err, result) => {
      if (err) {
        console.error(err);
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
