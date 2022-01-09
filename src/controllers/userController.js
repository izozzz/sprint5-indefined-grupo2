// ESTO SERIA EL GESTOR DEL MODELO
const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para USERS, que lo pasa como parámetro
const usersModel = jsonDB('users');

const userController = {
    
    login : (req, res)=>{
        res.render('user/login');
    },
    register : (req, res)=>{
        res.render('user/register');
    },
    store : (req, res)=>{
        // se obtiene valores del form para crear un nuevo user
            var row={
			name:req.body.name,
			email:req.body.email,
			date:req.body.date,
			pass:req.body.pass
        
        }
        
        //se llama al metodo que crea un nuevo producto
		usersModel.create(row);
		res.redirect('/');
    },

}
module.exports = userController;