const StudentModel = require("../models/student");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ComplaintModel = require("../models/complaint");

cloudinary.config({
  cloud_name: "dzmqs5sdv",
  api_key: "282587691228368",
  api_secret: "th_fTIbfb6f_QcZLnou3dj4rIh8",
});

class StudentController {
  static dashboard = async (req, res) => {
    try {
      const { name, email, image, rollnumber, mobileno, role } = req.data1;
      res.render("admin/student/dashboard", {
        n: name,
        e: email,
        i: image,
        r: rollnumber,
        m: mobileno,  
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  static Studentdetailinsert = async (req, res) => {
    try {
      //console.log(req.body)
      //console.log(req.files.image)
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "grievanceimage",
      });
      //console.log(imageUpload);

      //console.log(req.body);
      const { n, r, f, dob, e, c, a, m, p, cp } = req.body;
      const hashpassword = await bcrypt.hash(p, 10);
      const result = new StudentModel({
        name: n,
        rollnumber: r,
        fathername: f,
        dob: dob,
        email: e,
        course: c,
        address: a,
        mobileno: m,
        password: hashpassword,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      await result.save();
      res.redirect("/admin/display");
    } catch (error) {
      console.log(error);
    }
  };
  static StudentView = async (req, res) => {
    try {
      // console.log(req.params.id)
      // const { id } = req.data;
      const { name, email, image } = req.body;
      const data = await StudentModel.findById(req.params.id);
      // console.log(data)

      res.render("admin/student/view", {
        n: name,
        i: image,
        e: email,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static StudentEdit = async (req, res) => {
    try {
      // const { id } = req.data;
      const { name, email, image } = req.body;
      const data = await StudentModel.findById(req.params.id);
      // console.log(data)

      res.render("admin/student/edit", {
        name: name,
        image: image,
        email: email,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static StudentDelete = async (req, res) => {
    try {
      await StudentModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/display");
    } catch (error) {
      console.log(error);
    }
  };

  static StudentLogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const student = await StudentModel.findOne({ email: email });
        if (student != null) {
          const isMatched = await bcrypt.compare(password, student.password);
          if (isMatched) {
            const token = jwt.sign({ ID: student.id }, "kuchbilikhsktehaistudent");
            res.cookie("token", token);
            // console.log(token);
            res.redirect("/student/dashboard");
          }
        } else {
          res.redirect("/");
        }
      } else {
        res.redirect("/");
      }

      res.redirect("/");
    } catch (error) {
      console.log(error);
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
  static StudentComplaint = async (req, res) => {
    try {
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "grievanceimage",
      });
      //console.log(req.body)
      const{ctype,cdetail,rollno,course}=req.body
      const result = new ComplaintModel({
        complaintType:ctype,
        complaintDetail:cdetail,
        rollno:rollno,
        course:course,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
       
      });
      await result.save();
      res.redirect("/student/dashboard");
      req.flash("Your complaint is registered")
    } catch (error) {
      console.log(error);
    }
  };


  //static display= async (req,res)=>{
  //   try{
  //     const data = await StudentModel.find()
  //     // console.log(data)
  //     res.render("admin/student/display",{d:data})
  //   }catch(error){
  //     console.log(error)
  //   }
  // };
}

module.exports = StudentController;
