/* =================================
   CONFIGURACIÓN
================================= */

const CLAVE_USUARIOS = "usuariosZonaKawaii";
const CLAVE_USUARIO_ACTIVO = "usuarioActivoZonaKawaii";


/* =================================
   OBTENER USUARIOS
================================= */

function obtenerUsuarios() {

    const usuariosGuardados =
        localStorage.getItem(CLAVE_USUARIOS);

    if (!usuariosGuardados) {
        return [];
    }

    return JSON.parse(usuariosGuardados);
}


/* =================================
   GUARDAR USUARIOS
================================= */

function guardarUsuarios(usuarios) {

    localStorage.setItem(
        CLAVE_USUARIOS,
        JSON.stringify(usuarios)
    );
}


/* =================================
   MOSTRAR MENSAJE
================================= */

function mostrarMensaje(elemento, texto, tipo) {

    elemento.textContent = texto;

    elemento.classList.remove(
        "mensaje-exito",
        "mensaje-error"
    );

    elemento.classList.add(tipo);
}


/* =================================
   REGISTRO
================================= */

const formularioRegistro =
    document.getElementById("formRegistro");


if (formularioRegistro) {

    formularioRegistro.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const nombre =
                document.getElementById(
                    "nombreRegistro"
                ).value.trim();

            const email =
                document.getElementById(
                    "emailRegistro"
                ).value.trim().toLowerCase();

            const password =
                document.getElementById(
                    "passwordRegistro"
                ).value;

            const confirmarPassword =
                document.getElementById(
                    "confirmarPassword"
                ).value;

            const mensaje =
                document.getElementById(
                    "mensajeRegistro"
                );


            /* Validar contraseña */

            if (password.length < 6) {

                mostrarMensaje(
                    mensaje,
                    "Password must contain at least 6 characters.",
                    "mensaje-error"
                );

                return;
            }


            /* Confirmar contraseña */

            if (password !== confirmarPassword) {

                mostrarMensaje(
                    mensaje,
                    "Passwords do not match.",
                    "mensaje-error"
                );

                return;
            }


            /* Obtener usuarios */

            const usuarios = obtenerUsuarios();


            /* Verificar email */

            const usuarioExistente =
                usuarios.find(
                    usuario => usuario.email === email
                );


            if (usuarioExistente) {

                mostrarMensaje(
                    mensaje,
                    "An account with this email already exists.",
                    "mensaje-error"
                );

                return;
            }


            /* Crear usuario */

            const nuevoUsuario = {

                nombre: nombre,
                email: email,
                password: password

            };


            usuarios.push(nuevoUsuario);


            /* Guardar */

            guardarUsuarios(usuarios);


            mostrarMensaje(
                mensaje,
                "Account created successfully! Redirecting to login...",
                "mensaje-exito"
            );


            /* Ir al login */

            setTimeout(function() {

                window.location.href =
                    "iniciosesion.html?registro=ok";

            }, 1500);

        }
    );
}


/* =================================
   LOGIN
================================= */

const formularioLogin =
    document.getElementById("formLogin");


if (formularioLogin) {

    formularioLogin.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const email =
                document.getElementById(
                    "emailLogin"
                ).value.trim().toLowerCase();

            const password =
                document.getElementById(
                    "passwordLogin"
                ).value;


            const mensaje =
                document.getElementById(
                    "mensajeLogin"
                );


            /* Obtener usuarios */

            const usuarios = obtenerUsuarios();


            /* Buscar usuario */

            const usuario =
                usuarios.find(
                    usuario =>
                        usuario.email === email &&
                        usuario.password === password
                );


            /* Usuario incorrecto */

            if (!usuario) {

                mostrarMensaje(
                    mensaje,
                    "Incorrect email or password.",
                    "mensaje-error"
                );

                return;
            }


            /* Guardar sesión */

            const usuarioActivo = {

                nombre: usuario.nombre,
                email: usuario.email

            };


            localStorage.setItem(
                CLAVE_USUARIO_ACTIVO,
                JSON.stringify(usuarioActivo)
            );


            mostrarMensaje(
                mensaje,
                "Login successful! Welcome back.",
                "mensaje-exito"
            );


            /* Volver a la tienda */

            setTimeout(function() {

                window.location.href =
                    "index.html";

            }, 1000);

        }
    );
}


/* =================================
   MENSAJE DESPUÉS DEL REGISTRO
================================= */

const parametros =
    new URLSearchParams(window.location.search);


if (parametros.get("registro") === "ok") {

    const mensaje =
        document.getElementById(
            "mensajeLogin"
        );

    if (mensaje) {

        mostrarMensaje(
            mensaje,
            "Account created successfully. You can now log in.",
            "mensaje-exito"
        );
    }
}