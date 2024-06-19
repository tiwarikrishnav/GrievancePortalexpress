const mongoose = require("mongoose");
const ComplaintSchema = new mongoose.Schema(
  {
    complaintType: {
      type: String,
      require: true,
    },
    complaintDetail: {
      type: String,
      require: true,
    },
    rollno: {
      type: String,
      require:true,
    },
    course: {
      type: String,
      require: true,
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
  },
  { timstamps: true }
);

const ComplaintModel = mongoose.model("Complaint", ComplaintSchema);

module.exports = ComplaintModel;
