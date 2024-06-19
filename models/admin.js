const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone:{
      type:String,
      require:true
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "admin",
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
    // is_verified: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timstamps: true }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
