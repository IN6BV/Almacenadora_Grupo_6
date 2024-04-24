import User from './user.model.js';
import crearCorreo from '../functions/generarCorreo.js';
import generarContrasena from '../functions/generarContra.js';
import bycryptjs from 'bcryptjs';

export const userPost = async (req = request, res = response) => {
    const {nombre, apellido} = req.body;

    const email = crearCorreo(nombre, apellido);
    const password = generarContrasena();

    const user = new User({nombre, apellido, email, password});
    
    const salt = bycryptjs.genSaltSync();
    user.password = bycryptjs.hashSync(password, salt);

    await user.save();

    return res.status(200).json({
        msg: "No compartas tus credenciales de acceso con nadie. Tus credenciales son:",
        email,
        password
    });
}