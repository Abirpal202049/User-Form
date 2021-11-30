const express = require('express');
const student = require('../models/Student');
const router = express.Router();

router.use(showrouter) //* Midddleware - 1 called


//? Function to create User in database
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
    try{
        console.log("This Is The All Users List Route\n")
    
        const stud = await student.find() //? Finding all the students
        res.json(stud)
    }
    catch(err){
        console.log("Error : ", err.message);
        res.status(404).send("Error 404")
    }
})


//! Route 2 - '/v1/newuser'
router.route("/newuser")

    .get((req, res) => {
        try{
            console.log("This Is Creating New User Route\n")
            res.render('userforum' , {url : '/v1/newuser', message : 'Fill the fourm for new User'}) //! Rendering userforme
        }
        catch(err){
            console.log("Error : ", err.message);
            res.status(404).send("Error 404")
        }
    })

    .post(async (req, res) => {
        try {
            let Name = req.body.Name
            let College = req.body.College
            let Branch = req.body.Branch
    
            createStudent(Name, College, Branch) //? function for creating user is called 
    
    
            console.log("Forum submitted successfully...", "\n");
    
    
            const singlestudentname = await student.findOne({name : Name}) //? Finding data of the crated student
            console.log(singlestudentname._id);
    
            // Redirecting User
            // res.redirect(`/v1/user/${singlestudentname._id}`)
            res.redirect(`/alluser`)
        }
        catch (err) {
            console.log("Error : ", err.message);
            res.status(404).send("Error 404")
        }
    })

    

//! Route 3 - '/v1/user/:id'
router.route("/user/:id")

    .get(async (req, res) => {
        try{
            console.log("This Is For Specific User Route\n")
    
            const data = await student.findOne({_id : req.params.id}) //? Finding data of specificuser based on their 'ObjectId'
    
            // res.json(data) //* You can also parse the data into json
            res.render('specificuser', {id : data._id, name : data.name, coll : data.college, branch : data.branch}) //! Rendering specific user
        }
        catch(err){
            console.log("Error : ", err.message);
            res.status(404).send("Error 404")
        }
    })

    // Deleting Data
    .post(async (req, res) => {
        try{
            sure = 'yes'
            
            if(sure === 'yes'){
                console.log("Delete User Route and Data deleted successfully...");
        
                const delitem = await student.deleteOne({_id : req.params.id}) //? Deleting data of specificuser based on their 'ObjectId'
        
                // res.send("Item Deleted Successfully...")
                // res.render('deleemessage') //! Rendering Delete message page
                res.redirect('/alluser')
            }
            else{
                res.redirect('/')
            }


        }
        catch(err){
            console.log("Error : ", err.message);
            res.status(404).send("Error 404")
        }
    })


//! Route 4 - '/v1/user/update/:id'
router
    .route('/user/update/:id')

    .get(async (req, res) => {
        try{
            // res.send("Updating User ...")
            const data = await student.findOne({_id : req.params.id})
            res.render('userforum' , {n : data.name, c : data.college, b : data.branch, url : `/v1/user/update/${data._id}`, message :"Update Your Data"  }) //! Rendering userforme
        }
        catch(err) {
            console.log("Error : ", err.message);
            res.status(404).send("Error 404")
        }
    })

    // Update Data
    .post(async (req, res) => {
        try{
            console.log("Got the data...")
            let Name = req.body.Name
            let College = req.body.College
            let Branch = req.body.Branch
    
            const updatedata = await student.updateOne({_id : req.params.id}, {$set : {name : Name, college : College, branch : Branch}})
            // res.json(updatedata)
    
            // res.redirect(`/v1/user/${req.params.id}`)
            res.redirect('/alluser')

        }
        catch(err){
            console.log("Error : ", err.message);
            res.status(404).send("Error 404")
        }
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