const { where } = require('sequelize');
const Usuario = require ('../Models/usuarios');
const Turmas = require('../Models/Turmas');
const UsuariosTurmas = require('../Models/Usuarios_Turmas')

exports.getAll = async(req, res) => {
    const usuario = await Usuario.findAll();
    res.json(usuario)
};

exports.getById = async (req, res) => {
    // no router id é o que vem depois do usuario
    const idDoParam = req.params.id;
    const usuarioEncontrado = await Usuario.findOne({idUsuarios:idDoParam});
    res.json(usuarioEncontrado)
};

exports.createUsuario = async (req,res) => {
    const usuarioCadastrado = await Usuario.findOne({ where: {cpf: req.body.cpf}});
    // Verificação duplicidade do usuario cadastrado
    if (usuarioCadastrado) {
        return res.send("Já existe um usuario cadastrado com esse CPF.")
    }
    const usuarioCriado = await Usuario.create(req.body)

    if (usuarioCriado.idUsuarios && req.body.Turmas_idTurmas){
        await UsuariosTurmas.create({
            Turmas_idTurmas: req.body.Turmas_idTurmas,
            Usuarios_idUsuarios: usuarioCriado.idUsuarios,
        })
    }
    console.log("usuarioCriado", usuarioCriado)
    return res.send("Usuario cadastrado (deu certo viadin)")
    // res.json(usuario)
};

exports.updateUsuario = async (req, res) => {  // Cria uma função chamada updateTurma
    const Cpf = req.params.cpf; // Cria uma varíavel onde se adquire informações do banco de dados

    try { // "Tente"
        const usuarioCadastrado = await Usuario.findOne({ where:{ cpf: Cpf }}); // 

        if (usuarioCadastrado) {

            delete req.body.cpf // Delete como medida de segurança, pois nem toda a informação pode ser atualizada ao mesmo tempo

            const [numRowsUpdated] = await Usuario.update(req.body, { // Array que faz uma contagem de nº de linha de atualização
                where: { cpf: Cpf }
            });

            if (numRowsUpdated > 0) { // Verifica a array
                const usuarioAtualizado = await Usuario.findOne({ where: { cpf: Cpf }});
                return res.send({ message: 'Usuario Atualizado com sucesso', usuariocomdadosnovos: usuarioAtualizado});
            }
            else {
                return res.send('Usuario encontrada, porém sem novos dados para atualizar')
            }
        }
        else {
            return res.status(404).send('Não existe um usuario cadastrado com este código.');
        }
    } catch (error) {
        console.error("Erro ao atualizar usuario", error);
        return res.status(500).send ('Ocorreu um erro ao atualizar o usuario.')
    }
};

exports.deleteUsuario = async (req, res) => {
    try{
        const {id} = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }

        const desvincular = await UsuariosTurmas.findOne({ where: {
        Usuarios_idUsuarios : usuario.idUsuarios }}) ;
        if (desvincular) {
            await desvincular.destroy();
        }
        await usuario.destroy();

        return res.send('Usuário deletado com sucesso');
    } catch (error) {
        console.error('Erro ao deletar usuario:', error);
        return res.status(500).send('Erro ao deletar usuário');
    }
}