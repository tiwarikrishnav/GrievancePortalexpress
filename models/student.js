const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    rollnumber: {
      type: String,
      require: true,
    },
    fathername: {
        type: String,
        require: true,
      },
    email: {
      type: String,
      require: true,
    },
    course: {
      type: String,
      require: true,
    },
    dob: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    mobileno: {
        type: String,
        require: true,
      },
    password: {
        type: String,
        require: true,
      },
      role:{
        type:String,
        default:"user"
    },

    image: {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
    token: {
      type: String,
    },
    is_verified: {
      type: Number,
      default: 0,
    },
    
  },
  { timstamps: true }
);

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = StudentModel;
