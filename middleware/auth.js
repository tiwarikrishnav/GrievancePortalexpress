const jwt= require("jsonwebtoken")
const StudentModel = require("../models/student")


const checkUseAuth = async(req,res,next) =>{
    //console.log("hello auth")
    const {token} = req.cookies
    console.log(token)

    if(!token){
        req.flash('error', 'Unauthorised user please login')
        res.redirect('/')
    }else{
        const verifyLogin = jwt.verify(token, "kuchbilikhsktehaistudent");
        // console.log(verifyLogin)
        const data1 = await StudentModel.findOne({_id:verifyLogin.ID})
        // console.log(data)

        req.data1 = data1
        next(); //next methord route pr paucha dega
    }
}
module.exports=checkUseAuth;