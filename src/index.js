app = require("express")()
mongoose = require("mongoose")
path = require("path")

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/resume/index.html'));
})

app.listen(4100, ()=> {
    console.log("App is running on port 4100")
})
console.log("My name is Tito Ebeniro")