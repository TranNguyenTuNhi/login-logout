//Build Server
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var port = 4000;
var mongoose = require('mongoose');

//create db
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/DatabaseUser");
};
app.use(bodyParser.urlencoded({ extended: true }));
main().then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.log(err);
})

//create schema type not validation 
const userSchema = mongoose.Schema({
    userName: { type: String },
    passWord: { type: String },
})


const Person = mongoose.model('Person', userSchema);

const item1 = new Person({
    userName: "Sang",
    passWord: "123456",
})

item1.save().then(() => {
    console.log("Insert success");
}).catch(err => {
    console.log(err);
})


//create collection


// app.set('view engine','ejs');
app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/home', (req, res) => {
    res.render('home/home.ejs')
})


app.post("/login", async function (req, res) {
    try {
        const { userName, passWord } = req.body;

        const user = await Person.findOne({ userName: userName });

        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        if (user.passWord === passWord) {
            console.log("Login success");
            // return res.redirect("/admin");
        } else {
            res.status(400).json({ error: "Password doesn't match" });
        }
    } catch (error) {
        res.status(400).json({ error });
        console.error("Login error:", error);
    }
});




app.get('/admin', (req, res) => {
    res.render('admin/admin.ejs')
})
app.get('/login', (req, res) => {
    res.render('signup/signup.ejs')
})

app.listen(port, () => {
    console.log(`Server start in ${port}`)
})

