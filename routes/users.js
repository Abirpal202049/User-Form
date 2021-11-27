const express = require('express');
const student = require('../models/Student');
const router = express.Router();

router.use(showrouter) //* Midddleware - 1 called


//? Function to create User
async function createStudent(n , c , b){
    try{
        const stud = await student.create({
            name : n, 
            college : c, 
            branch : b
        })
        console.log("Student Data : ", stud);
    } catch(err){
        console.log("Error : ", err.message);
    }
}



//! Route 1 - '/v1/userslist'
router.get('/userslist', checkAdmin, async function (req, res) {
    console.log("This Is The All Users List Route\n")
    const stud = await student.find()
    res.json(stud)
})


//! Route 2 - '/v1/newuser'
router.route("/newuser")
    .get((req, res) => {
        console.log("This Is Creating New User Route\n")
        res.render('userforum')
    })
    .post(async (req, res) => {
        let Name = req.body.Name
        let College = req.body.College
        let Branch = req.body.Branch

        createStudent(Name, College, Branch)


        console.log("Forum submitted successfully...", "\n");

        // Redirecting User
        // res.redirect(`/v1/user/${users.length - 1}`)
        const singlestudentname = await student.findOne({name : Name}) 
        console.log(singlestudentname._id);
        res.redirect(`/v1/user/${singlestudentname._id}`)
    })

    

//! Route 3 - '/v1/user/:id'
router.route("/user/:id")
    .get(async (req, res) => {
        console.log("This Is For Specific User Route\n")

        const data = await student.findOne({_id : req.params.id})

        // res.json(data) //* You can also parse the data into json
        res.render('specificuser', {id : data._id, name : data.name, coll : data.college, branch : data.branch})
    })


//* Middleware - 1
function showrouter(req, res, next) {
    console.log("Path :-", req.originalUrl);
    next()
}


//* Middleware - 2
function checkAdmin(req, res, next) {
    const isAdmin = true
    console.log("Do you have the permission To access this Route");
    if(isAdmin) {
        console.log("Access Guranteed!\n");
        next()
    }else{
        console.log("Access Denied!\n");
        res.redirect('/')
    }
}

module.exports = router