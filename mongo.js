const { request } = require("express");

const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://user:${password}@cluster0.6chbx.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const noteSchema = new mongoose.Schema({
    connect: String,
    date: Date,
    important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true
});

// note.save()
//     .then(result => {
//         console.log('note saved!');
//         mongoose.connection.close();
// });

Note.find({})
    .then(result => {
        result.forEach(note => {
            // note.then(result => console.log(result.content));
            console.log(note);
        })
        mongoose.connection.close();
    });