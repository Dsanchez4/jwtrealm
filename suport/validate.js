'use strict';

function regUser(user){
    if(!(user.usuario && user.pwd  && 
        user.nombre && user.distrito &&
            user.numero && user.correo)){
                return false;
            } 
    return true;
}

function regIncidence(incidence){
    if(!(incidence.id_usuario && incidence.titulo &&
            incidence.tipo && incidence.distrito &&
                incidence.descripcion && incidence.pos.lat &&
                    incidence.pos.lon)){
        return false;
    }
    return true;
}

module.exports = {
    regUser,
    regIncidence
}