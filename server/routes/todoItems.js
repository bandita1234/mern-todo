const express = require("express");
const router = express.Router();

const todoItemsModel = require("../models/todoItems");

//add items
router.post('/api/item', async (req, res)=>{
    try{
      const { title, description, date } = req.body;
      const newItem = new todoItemsModel({
        title,
        description,
        date
      })
      //save this item in database
      const saveItem = await newItem.save()
      res.status(200).json(saveItem);
    }catch(err){
      res.json(err);
    }
  })

//To get data from database
router.get('/api/getitems', async (req, res)=>{
    try{
      const allTodoItems = await todoItemsModel.find({});
      res.status(200).json(allTodoItems)
    }catch(err){
      res.json(err);
    }
  })

//update items
router.put('/api/item', async (req, res)=>{
    try{
      console.log(req.body);
      //find the item by its id and update it
      const {id, title, description, date,status } = req.body;
      const updateItem = await todoItemsModel.findByIdAndUpdate(id, { title, description, date,status } );
      res.status(200).json(updateItem);
    }catch(err){
      res.json(err);
    }
  })

//Delete items
router.delete('/api/item/:id', async (req, res)=>{
    try{
      //find the item to be deleted by its id and delete it
      const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Item Deleted');
    }catch(err){
      res.json(err);
    }
  })

  router.delete('/api/delete-completed' ,async (req, res)=>{
    try{
      const deleteCompleted = await todoItemsModel.deleteMany({status:"inactive"});
      res.status(200).json('Completed Item Deleted');
    }catch(err){
      res.json(err);
    }
  })
  module.exports = router;