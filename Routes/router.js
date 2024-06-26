// routes/router.js 
// nesse arquivo estarão todas as rotas 
// no caso de um proj com muitas rotas é possivel quebrar as rotas em mais arquivos 
const express = require('express');
const router = express.Router();
const usuarioController = require("../Controllers/usuario")
const turmaController = require("../Controllers/turmas")

//                                       R O T A S usuario
router.get('/usuario', usuarioController.getAll)
router.get('/usuario/:id', usuarioController.getById)
router.post('/usuario', usuarioController.createUsuario)
router.put('/usuario/:cpf', usuarioController.updateUsuario)
router.delete('/usuario/:id', usuarioController.deleteUsuario)


//                                       R O T A S turmas
router.get('/turma', turmaController.getAll)
router.get('/turma/:id', turmaController.getById) 

// cria um usuario passando informações no body 
router.post('/turma', turmaController.createTurma) 
router.put('/turma/:codigo', turmaController.updateTurma)

module.exports = router;