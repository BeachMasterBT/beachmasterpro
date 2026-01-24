import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["admin", "atleta", "arbitro", "arena", "empresa"],
      default: "atleta"
    },

    phone: {
      type: String
    },

    document: {
      type: String
    },

    location: {
      city: String,
      state: String,
      country: String
    },

    // LGPD
    consentAccepted: {
      type: Boolean,
      default: false
    },

    consentAcceptedAt: {
      type: Date
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// ============================
// HASH DE SENHA AUTOMÁTICO
// ============================
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ============================
// COMPARAR SENHA
// ============================
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
