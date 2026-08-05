const mongoose = require("mongoose");

const clinicInfoSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    nameAr: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    logo: {
      type: String, 
      trim: true,
    },
    slogan: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    phone2: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    website: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },

    
    address: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: "مصر",
    },

    
    invoicePrefix: {
      type: String,
      trim: true,
      default: "INV",
      
    },
    invoiceNote: {
      type: String,
      trim: true,
      maxlength: 500,
      
    },
    thankYouMessage: {
      type: String,
      trim: true,
      maxlength: 300,
      
      default: "شكراً لثقتكم بنا، نتمنى لكم الشفاء العاجل",
    },

    
    taxRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      
    },
    taxNumber: {
      type: String,
      trim: true,
      
    },
    commercialRegister: {
      type: String,
      trim: true,
      
    },

    
    bankName: {
      type: String,
      trim: true,
    },
    bankAccount: {
      type: String,
      trim: true,
    },
    bankIban: {
      type: String,
      trim: true,
    },

    
    workingHours: {
      type: String,
      trim: true,
      maxlength: 300,
      
    },

    
    facebook: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },

    
    currency: {
      type: String,
      trim: true,
      default: "ج.م",
      maxlength: 10,
    },
  },
  { timestamps: true },
);


module.exports = mongoose.model("ClinicInfo", clinicInfoSchema);
