import User from "../users/user.model.js";

function eliminarAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function crearCorreo  (nombre, apellido)  {
    let correo = "";
    const nombreMinusculas = eliminarAcentos(nombre).replace(/\s+/g, '').toLowerCase();
    const apellidoMinusculas = eliminarAcentos(apellido).replace(/\s+/g, '').toLowerCase();
    
    correo = nombreMinusculas + "." + apellidoMinusculas + "@almtesoro.org.gt";
    
    return correo;
}

export default crearCorreo;

