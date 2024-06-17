const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method}, ---->'${req.url}'`);
    next(); // Pass the request to the next middleware/handler
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdetails', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
});



// Explicitly specify the collection name 'User'
const User = mongoose.model('User', userSchema, 'User');


// Meeting schema
const meetingSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    clientId: mongoose.Schema.Types.ObjectId,
    clientName: String,
    doctorId: mongoose.Schema.Types.ObjectId,
    doctorName: String
});

const Meeting = mongoose.model('Meeting', meetingSchema, 'Meetings');

const doctorSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    experience: Number
    
});

const Doctor = mongoose.model('Doctor', doctorSchema, 'Doctors');



// Function to handle logIn
async function handleLogIn(req, res) {
    const { name, password } = req.body;
    console.log(name, "name");
    console.log(password, "password");

    try {
        // Find user in the database
        const user = await User.findOne({ name, password });
        console.log(user, "user");

        if (user) {
            res.send({ exists: true, id: user._id }); // User exists
        } else {
            res.send({ exists: false }); // User does not exist
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Function to handle myMeeting
async function handleMyMeeting(req, res) {
    const { title, date, time } = req.body;
    console.log(title, "title");
    console.log(date, "date");
    console.log(time, "time");

    try {
        // Process the meeting details (this is just a placeholder logic)
        res.send({ success: true, message: 'Meeting scheduled successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function getMeetings(req, res){
    const userId = req.params.userId;
        try {
            const meetings = await Meeting.find({ clientId: userId });
            res.send(meetings);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
}

async function getAllDoctors(req, res) {
    try {
        const doctors = await Doctor.find();
        res.send(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// Routes
app.post('/api/logIn', handleLogIn);
app.post('/api/meetings/:userId', handleMyMeeting);
app.get('/api/meetings/:userId', getMeetings)
app.get('/api/doctors', getAllDoctors)

const PORT = 3000;


