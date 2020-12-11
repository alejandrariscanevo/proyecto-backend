//opcion 1
const mongoose = require("mongoose")
//Schema = Schema
const {Schema} = mongoose;

//opcion 2
// const {Schema, model} = require("mongoose");

const propertySchema = new Schema(
    {
        // title address descripction price images owner capacidat (numerRooms, ...opcionales)
        _owner:{
            //esto es para decirle que insertara un id de un elemento de la base de datos
            type:Schema.Types.ObjectId,
            ref:"User",
            required:[true,"La propiedad debe tener un dueño"],
        },
        //sigues los atributos normales
        title:{
            type:String,
            required:[true,"Debes agregar un titulo a tu propiedad"],
        },
        address:{
            type:String,
            required:[true,"Debes agregar una dirección para la propiedad"],
        },
        description:{
            type:String,
             minlength:[50,"La descripción es muy pequeña"], //esta es diferente ya que es con un minimo
        },
        images:{
            type:[String],// ["http://miImagen.com/oiidasjd.png","http://miImagen.com/oiidasjd.png",...]
            minlength:[1,"debes agregar por lo menos una imagen"],
        },
        price:{
            type : Number,
            min:[1,"El precio de propiedad por noche es muy bajo"],
            required:[true,"Debes agregar el precio por noche de tu propiedad"],
        },
        capacity:{
            type:Number,
            required:[true,"Debes agrager la capacidad de tu propiedad"],
        }
    },
    {timestamps:true}
);

//esto es muy muy importante
//export usando opcion 1 ver linea 2 de este archivo
module.exports = mongoose.model("Property",propertySchema);

//export usando opcion 2 ver opcion 2 en la linea 3
//module.exports = model("Property",propertySchema)