import bycryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generarJwt } from '../helpers/generarJwt.js';

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: "Incorrect credentials, email does not exist in the database."
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "The user does not exist in the database",
            });
        }

        const validPassword = bycryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        const token = await generarJwt(usuario.id);

        res.status(200).json({
            msg: 'Welcome!!!',
            usuario,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact the owner",
        });
    }
}