//esto nos va a ser ver para verificar si existe un usuario y un token

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.veryToken = (req,res,next)=>{

    const { token } = req.cookies;
    //usarmos verify para ver si existe un token 
    jwt.verify(token, process.env.SECRET, (error,decoded)=>{
        //aqui va nuestro codigo
        if(error) return res.status(401).json( {error} );

        // decoded = {id} osea un objeto con la llave id (segun lo que ustedes guardaron)
        //esto va  a buscar con el objeto decoded en la llave id 
        User.findById(decoded.id).then((user)=>{

            // guardamos el usuario en el req.user para poder usarlo en cualquier lugar
           req.user = user;
           //con el next le decimos ya puedes seguir literal
           next()
        });
    });

};

//haremos un middelware para checar roles y un ultis para limpiar respuesta
// de datos basura
                    //["ADMIN","USER"]  USER
exports.checkRole = (roles) => {
    
    return (req, res, next) => {
        //{name:"Dylan",role:"USER"}
        const {role} = req.user;
        if(roles.includes(role)){
            return next()
        }else{
            return res.status(403).json({msg:"No tienes permiso para realizar esta acción"})
        }
    }
}

//Limpiar el objeto!!!!

exports.clearRes = (data) => {
    //destructuramos el objeto "data" y retornamos un nuevo objeto unicamente con
    // los datos requerido para nuestro "desarrollador = dev"
    const {password,__v,createdAt,updatedAt, ...cleanedData} = data;
    // {key:"value"}
    return cleanedData
}

