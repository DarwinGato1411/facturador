export class MUsuario {

    idUsuario: number;
    usuNombre: String;
    usuLogin: String;
    usuPassword: String;
    usuCorreo: String;
    usuWhatsapp: String;
    usuPagina: String;
    usuFacebook: String;
    usuFotografia: String;
    usuActividad: String;
    usuServlet: String;
    usuNivel: number;
    usuDescripcionNegocio: String;
    serveletImagen: String;
    usuTipoUsuario: String;
    usuLongNegocio: String;
    usuPesonaEmpresa: String;
    usuLatNegocio: String;
    idParroquia: {
        idParroquia: number;
        parrNumero: number;
        parrNombre: String;
        idCanton: {
            idCanton: number;
            cantNumero: number;
            cantNombre: String;
        }
    }
    idActividad: {
        idTipoActividad: number;
        taNombre: String;
        taDescripcion: String;
    }
}

