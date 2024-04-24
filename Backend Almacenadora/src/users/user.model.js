import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"]
    },
    apellido:{
        type: String,
        required: [true, "El apellido es requerido"]
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    role:{
        type: String,
        default: "EMPLEADO"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema);