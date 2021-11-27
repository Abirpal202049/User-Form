const mongoose = require('mongoose');
 
const studentSchema = new mongoose.Schema({
    name: {
        type : String,
        uppercase : true,
    },
    college : {
        type : String,
    },
    branch : {
        type : String,
        minlength : 2,
        maxlength : 5,
        uppercase : true,
    },
})

module.exports = mongoose.model("Studentdata", studentSchema)