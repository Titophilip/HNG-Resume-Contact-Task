const app = require("express")()
const mongoose = require("mongoose")
const path = require("path")
const Contact = require("/model/contact.js")

const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(
	process.env.MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	() => console.log("MongoDB connected")
);

app.use(express.json());

app.get("/tito-ebeniro", (req, res) => {
    res.sendFile(path.join(__dirname+'/resume/index.html'));
})

app.post("/tito-ebeniro", async (req, res) => {
    let contact = req.body;
    try {
        const result = Contact.save(contact)
        return res.status(200).json({ message: "Message sucessfully sent.", contact});
    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

app.listen(4100, ()=> {
    console.log("App is running on port 4100")
})
console.log("My name is Tito Ebeniro")