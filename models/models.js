const mongoose = require("mongoose"),
    ClothesSchema = mongoose.Schema(
    {
      name: {
        // name 속성 요청
        type: String,
        required: true,
        trim: true,
      },
      email: {
        // email 속성 요청 lowercase 속성 추가
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      phoneNumber: {
        type: String,
       
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      
      profileImg: {
        type: String,
        
      },
      courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    },
    {
      timestamps: true,
    }
  );

module.clothes = mongoose.model("Clothes", ClothesSchema);