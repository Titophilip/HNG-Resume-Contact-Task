const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const Contact = require("./model/contact.js")

require("dotenv").config();

const { MONGO_URI } = process.env
console.log(MONGO_URI)
mongoose.connect(
	MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	() => console.log("MongoDB connected")
);

app.use(express.json());

app.get("/tito-ebeniro", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname+'/resume/index.html'));
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
})

app.post("/tito-ebeniro", async (req, res) => {
    const {name, email, subject, message} = req.body;
    try {
        if (!name || !email || !subject || !message) {
            return res.status(500).json({ message: "Incomplete data." })
        }
        const contact = req.body;
        await Contact.create(contact)
        console.log(contact)

        return res.status(200).json({ message: "Email sent successfully." })
        // res.sendFile(path.join(__dirname+'/resume/index.html'));
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Email not sent." });
    }
})

app.listen(4100, ()=> {
    console.log("App is running on port 4100")
})
console.log("My name is Tito Ebeniro")