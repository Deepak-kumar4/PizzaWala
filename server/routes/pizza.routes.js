const express=require("express");
const Pizza = require("../models/pizza.model")
const router=express.Router();


// GET  /api/pizzas

router.get("/",async function(req,res){
    try{
        const pizzas= await Pizza.find();
        res.json(pizzas);

    }catch(err){
        res.status(500).json({msf:"Failed to load pizzas"})

    }
});

router.post("/", async function(req,res){
    try{
        const newPizza= new Pizza(req.body);
        await newPizza.save();
        res.status(201).json({msg:"Pizza Created",pizza:newPizza})


    }
    catch{
        res.status(400).json({msg:"Failed to create pizza"})

    }
})

module.exports = router;