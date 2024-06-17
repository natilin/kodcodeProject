const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdetails', {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Define User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    age: Number
});

const User = mongoose.model('User', userSchema, 'User'); // Specify the collection name 'User'

// Define Meeting schema and model
const meetingSchema = new mongoose.Schema({
    title: String,
    date: String,
    time: String,
    clientId: mongoose.Schema.Types.ObjectId,
    clientName: String,
    doctorId: mongoose.Schema.Types.ObjectId,
    doctorName: String
})

const Meeting = mongoose.model('Meeting', meetingSchema, 'Meetings'); // Specify the collection name 'Meetings'

// Define Doctor schema and model
const doctorSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    experience: Number
    // Add other fields as needed
});

const Doctor = mongoose.model('Doctor', doctorSchema, 'Doctors'); // Specify the collection name 'doctors'

// Export the models
module.exports = { User, Meeting, Doctor };
