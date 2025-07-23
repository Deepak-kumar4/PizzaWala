const mongoose =require("mongoose");

const pizzaSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,  
    },
    imageUrl:{
        type:String,
        required:true,
        default:"https://content.jdmagicbox.com/v2/comp/delhi/b4/011pxx11.xx11.230122061405.c9b4/catalogue/nomad-pizza-traveller-series-noida-sector-141-delhi-pizza-outlets-kcrq0ae75j.jpg"
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("Pizza",pizzaSchema);