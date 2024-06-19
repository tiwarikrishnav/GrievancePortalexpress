const express = require('express')
const FrontController= require('../Controllers/FrontController');
const AdminController = require('../Controllers/AdminController');
const StudentController = require('../Controllers/StudentController');
const checkUseAuth = require('../middleware/auth');
const checkAdminAuth = require('../middleware/adminauth');
const route = express.Router()

// FrontController
route.get("/",FrontController.home)

// AdminController
route.post("/verifyadminlogin",AdminController.AdminLogin);
route.post("/registeradmin",AdminController.AdminRegister);
route.get("/admin/dashboard",checkAdminAuth, AdminController.AdminDashboard);
route.get("/admin/display",checkAdminAuth, AdminController.AdminDisplay);

route.get("/logout",AdminController.Logout)



// StudentController
route.post("/Studentdetailinsert", StudentController.Studentdetailinsert);
route.get("/student/edit/:id", StudentController.StudentEdit);
route.get("/student/view/:id",StudentController.StudentView);
route.get("/student/delete/:id",StudentController.StudentDelete)
route.get("/student/dashboard",checkUseAuth, StudentController.dashboard);
route.post("/verifylogin",StudentController.StudentLogin)
route.get("/logout",StudentController.Logout)
route.post("/StudentComplaint",StudentController.StudentComplaint)
// route.get("/student/display",StudentController.display);



module.exports=route;