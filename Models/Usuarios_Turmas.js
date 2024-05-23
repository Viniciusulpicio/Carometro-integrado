const Sequelize = require("sequelize");
const sequelize = require("../Config/sequelize");
const UsuariosTurmas = sequelize.define("usuarios_turmas",  {

    Turmas_idTurmas: {
      type: Sequelize.INTEGER,
      primaryKey: false,
    },
    Usuarios_idUsuarios: {
      type: Sequelize.INTEGER,
      primaryKey: false,
    },
  },

  {
    timestamps: false,
  });

UsuariosTurmas.removeAttribute("id");

module.exports = UsuariosTurmas;