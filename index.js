const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const UrlModel = require("./models/model.shorturl")
const connection = require("./db")
const cors = require("cors")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.get("/:id", async(req,res)=>{
    const id = req.params.id
    console.log(id);
    const links = await UrlModel.find({"short":id})
    console.log(links[0].full);
    res.redirect(links[0].full)
})
app.post("/shortUrl",async (req,res)=>{
    if(Object.keys(req.body).length<1){
        return res.send("invalid")
    }
    const urldata = await UrlModel(req.body)
    await urldata.save()
    const links = await UrlModel.find({"full":req.body.full})
    res.send(links)
})

app.listen(port,async()=>{
    try {
        await connection
    } catch (error) {
        console.log(error);
    }
    console.log(`running on 5000`);
})