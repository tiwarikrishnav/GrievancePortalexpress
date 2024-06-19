const AdminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const StudentModel = require("../models/student");


cloudinary.config({
  cloud_name: "dzmqs5sdv",
  api_key: "282587691228368",
  api_secret: "th_fTIbfb6f_QcZLnou3dj4rIh8",
});

class AdminController {
  static AdminDashboard = async (req, res) => {
    try {
      const{name,image,} = req.data
      res.render("admin/dashboard",{
        n:name,
        i:image
      });
    } catch (error) {
      console.log(error);
    }
  };
  static AdminDisplay = async (req, res) => {
    try {
      const{name,image,} = req.data
      const data = await StudentModel.find();
      res.render("admin/display", { d: data ,n:name,
        i:image});
    } catch (error) {
      console.log(error);
    }
  };
static AdminLogin = async(req,res)=>{
  try{
    // console.log(req.body)
    const {email,password} = req.body
    if ( email && password) {
      const admin = await AdminModel.findOne({email:email})
      if(admin != null) {
        const isMatched = await bcrypt.compare(password,admin.password)
        if(isMatched){
          const token = jwt.sign({ID:admin.id},"kuchbilikhsktehai")
          res.cookie("token",token)
          // console.log(token)
          res.redirect('/admin/dashboard')
        }
      }else{
       
        res.redirect('/')
      }
    }else{
    
      res.redirect('/')
    }

      res.redirect("/");
    } catch(error){
      console.log(error)
    }
};
static Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
static AdminRegister = async(req,res)=>{
  try{
    // console.log(req.files.image)
    const file = req.files.image;
    const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
     folder: "grievance",
    });
    // console.log(req.body)
    const{name,email,phone,password}= req.body;
    const hashpassword = await bcrypt.hash(password,10);
    const Admin = new AdminModel({
      name:name,
      email:email,
      phone:phone,
      password:hashpassword,
      image:{
        public_id:imageUpload.public_id,
        url:imageUpload.secure_url
      },
    });
    await Admin.save();
    res.redirect("/admin/dashboard")
  }catch(error){
    console.log(error)
  }
};
 
}

module.exports = AdminController;
