const { Router } = require('express');
const ContactController = require('./app/controllers/ContatoController');
const CategoriaController = require('./app/controllers/CategoriaController');
//ou const express = require('express');

const router = Router();
//ou const router = express.Router();

router.get('/contatos', ContactController.index);
router.get('/contatos/:id', ContactController.show);
router.delete('/contatos/:id', ContactController.delete);
router.post('/contatos', ContactController.store);
router.put('/contatos/:id', ContactController.update);


router.get('/categorias', CategoriaController.index);
router.post('/categorias', CategoriaController.store);



module.exports = router;
