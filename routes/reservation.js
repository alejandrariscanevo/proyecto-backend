const express = require('express');
const router = express.Router();
//importo cosas importantes!!!!
const Reservation = require("../models/Reservation");
const { veryToken } = require("../utils/auth");



//Rutas para leer!!!
//Todas las reservaciones por usuario
router.get('/', veryToken, (req, res, next) => {
    const { _id } = req.user

    Reservation.find({ _guest: _id })
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"property",
            populate:{
                path:"_owner",
                select: "name",
            },
        }) //<----- Populate

        .then((reservations)=>{
            res.status(200).json({result:reservations})
        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error  })
        })
});

//Trae todas las reservaciones por propiedad

router.get('/property/:property_id', veryToken, (req, res, next) => {
    const { property_id } = req.params;

    Reservation.find({ _property : property_id })
        .populate("_guest","name") //<----- Populate
        .then((reservations)=>{
            res.status(200).json({result:reservations})
        })
        .catch((error)=>{
            res.status(400).json({msg:"Algo salio mal", error  })
        })
});

//Crear reservacion

router.post("/",veryToken,(req,res,next)=>{

    const {_id : _guest} = req.user
    const  reservation = {...req.body, _guest} ;

    Reservation.create(reservation)
    .then((reservation)=>{
        res.status(200).json({result:reservation});
    }).catch((error)=>{
        res.status(400).json({ msg:"Algo salio mal", error })
    })
});


//Editar!!!!

router.patch("/:id", veryToken, (req, res,next)=>{
    const { id } = req.params;
    // req.body = {title:"perro", age:"2", ...}
    Reservation.findByIdAndUpdate(id,req.body, { new:true })
    .then((reservation)=>{
        res.status(200).json({result:reservation})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salio mal", error})
    })
});


///Eliminar

router.delete("/:id", veryToken, (req, res,next)=>{
    const { id } = req.params;
    // req.body = {title:"perro", age:"2", ...}
    Reservation.findByIdAndDelete(id)
    .then((reservation)=>{
        res.status(200).json({msg:"Se borro la reservación"})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salio mal", error})
    })
});




module.exports = router;