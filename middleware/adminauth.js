const jwt= require("jsonwebtoken")
const AdminModel = require("../models/admin")


const checkAdminAuth = async(req,res,next) =>{
    //console.log("hello auth")
    const {token} = req.cookies
    // console.log(token)

    if(!token){
        req.flash('error', 'Unauthorised user please login')
        res.redirect('/')
    }else{
        const verifyLogin = jwt.verify(token, "kuchbilikhsktehai");
        //console.log(verifyLogin)
        const data = await AdminModel.findOne({_id:verifyLogin.ID})
        //console.log(data)

        req.data = data
        next(); //next methord route pr paucha dega
    }
}
module.exports=checkAdminAuth;