const express = require('express');
const router = express.Router();
//importo cosas importantes!!!!
const Property = require("../models/Property");
const { veryToken } = require("../utils/auth")
/*  GET property page.
    C.R.U.D.
    C = CREATE /
    R = READ /
    U = UPDATE (EDIT) /
    D = DELETE /
    obtener todas las propiedas
    crear la propiedad
    eliminar || ||
*/
//app.user("/api/property")
//localhost:3000/api/property

//Ruta para crear!!!!!!!
// /create  /
router.post("/", veryToken, (req, res,next)=>{
    //voy a sacar el de la persona loggeada 
    //para crear una propiedad (CASA)
    const { _id: _owner } = req.user
                    //({ title, address, descreption ...})
    Property.create({...req.body, _owner}).then((property)=>{
        res.status(201).json({result:property});
    }).catch((error)=>{
        res.status(400).json({msg:"Algo salio mal", error });
    });
});

//Rutas para leer!!!
//filtro dinamico
router.get('/', veryToken, (req, res, next) => {
            //req.query = {key:"value"}
  Property.find(req.query)
    .populate("_owner","email name profile_picture") //<----- Populate
    .then((properties)=>{
        res.status(200).json({result:properties})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salio mal", error  })
    })
});

// traer uno solo!!!!!
//por id
router.get('/:id', veryToken, (req, res, next) => {
    //:id = "7ew987sa7d98sa9ud9d9a8"
    // req.params = {id:"87e9qw87e98wq7e89qw7e89"}
    const {id} = req.params;

    Property.findById(id)
        .populate("_owner","email name profile_picture") //<----- Populate
        .then((property)=>{
            res.status(200).json({result:property})
        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error  })
        })
});

// Editar (Update)
//post quiere todas las llaves
// patch solo quiere una para poder trabajar

router.patch("/:id", veryToken, (req, res,next)=>{
    const { id } = req.params;
    // req.body = {title:"perro", age:"2", ...}
    Property.findByIdAndUpdate(id,req.body, { new:true })
    .populate("_owner","email name profile_picture") //<----- Populate
    .then((property)=>{
        res.status(200).json({result:property})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salio mal", error})
    })
});

//Eliminar 

router.delete("/:id", veryToken, (req, res,next)=>{
    const { id } = req.params;
    // req.body = {title:"perro", age:"2", ...}
    Property.findByIdAndRemove(id)
    .then((property)=>{
        res.status(200).json({msg:"Se borro la propiedad"})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salio mal", error})
    })
});




module.exports = router;