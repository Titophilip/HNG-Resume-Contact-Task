const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Contact = require("./model/contact.js");
PORT = process.env.PORT || 4100;

require("dotenv").config();

const { MONGO_URI } = process.env

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

app.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname+'/resume/index.html'));
    } catch (error) {
        return res.status(404).json({ message: "Page not Found" });
    }
})

app.post("/", async (req, res) => {
    const {name, email, subject, message} = req.body;
    try {
        if (!name || !email || !subject || !message) {
            return res.status(500).json({ message: "Incomplete data." })
        }
        const contact = req.body;
        await Contact.create(contact)

        return res.status(200).json({ message: "Email sent successfully." })
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Email not sent." });
    }
})

app.listen(4100, ()=> {
    console.log(`App is running on port ${PORT}.`)
})