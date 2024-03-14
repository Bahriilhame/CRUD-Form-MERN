const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT=8080 

mongoose.connect("mongodb://127.0.0.1:27017/cloud_stg")
.then(()=>{
    console.log("Server is running on port :",PORT);
    app.listen(PORT)
})
.catch((err)=>console.log(err))

const schemaData  = mongoose.Schema({
    nom : String,
    prenom : String,
    age : Number,
    adresse:String,
    genre:String,
    niveau:String,
    groupe:String,
    anneeScolaire:String
},{
    timestamps : true
})

const stagiaireCollection  = mongoose.model("stagiaire",schemaData)

app.get("/",async(req,res)=>{
    const AllStg = await stagiaireCollection.find({})
    res.json(AllStg)
})

app.post("/create",async(req,res)=>{
    const newStg = await stagiaireCollection.create(req.body);
    await newStg.save()
    res.send(newStg)
})

app.put("/update",async(req,res)=>{
    const { _id,...infos} = req.body 
    const UpdatedStg = await stagiaireCollection.updateOne({ _id : _id},infos)
    res.send(UpdatedStg)
})

app.delete("/delete/:id",async(req,res)=>{
    const deletedStg = await stagiaireCollection.deleteOne({_id : req.params.id})
    res.send(deletedStg)
})