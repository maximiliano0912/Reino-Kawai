/* =========================
   CARRUSEL PRINCIPAL
========================= */

const mangasHero = [
    {
        titulo: "CHAINSAW MAN",
        descripcion: "Blood, action and madness in every chapter.",
        categoria: "FEATURED MANGA",
        imagen: "img/Chainsawman.jpg"
    },

    {
        titulo: "JUJUTSU KAISEN",
        descripcion: "Curses, sorcery and intense battles await you.",
        categoria: "POPULAR MANGA",
        imagen: "img/jjk.jpg"
    },

    {
        titulo: "ONE PIECE",
        descripcion: "Set sail on an unforgettable pirate adventure.",
        categoria: "CLASSIC MANGA",
        imagen: "img/onepiece.jpeg"
    },

    {
        titulo: "ATTACK ON TITAN",
        descripcion: "Humanity fights for survival behind the walls.",
        categoria: "DARK FANTASY",
        imagen: "img/shingeki.jpg"
    },

    {
        titulo: "SPY X FAMILY",
        descripcion: "A fake family with secrets, missions and comedy.",
        categoria: "COMEDY MANGA",
        imagen: "img/spy.jpg"
    },

    {
        titulo: "DEMON SLAYER",
        descripcion: "A young demon slayer begins his dangerous journey.",
        categoria: "FANTASY MANGA",
        imagen: "img/demonslayer.jpeg"
    }
];


let indiceHero = 0;

const tituloManga = document.getElementById("tituloManga");
const descripcionManga = document.getElementById("descripcionManga");
const categoriaHero = document.getElementById("categoriaHero");
const imagenHero = document.getElementById("imagenHero");

const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

const indicadores = document.querySelectorAll(
    "#indicadores span"
);


/* CAMBIAR HERO */

function mostrarHero(indice) {

    if (indice < 0) {
        indiceHero = mangasHero.length - 1;
    } else if (indice >= mangasHero.length) {
        indiceHero = 0;
    } else {
        indiceHero = indice;
    }

    const manga = mangasHero[indiceHero];

    tituloManga.style.opacity = "0";
    descripcionManga.style.opacity = "0";
    imagenHero.style.opacity = "0";

    setTimeout(() => {

        tituloManga.textContent = manga.titulo;

        descripcionManga.textContent =
            manga.descripcion;

        categoriaHero.textContent =
            manga.categoria;

        imagenHero.src =
            manga.imagen;

        tituloManga.style.opacity = "1";
        descripcionManga.style.opacity = "1";
        imagenHero.style.opacity = "1";

    }, 200);


    indicadores.forEach((indicador, i) => {

        indicador.classList.toggle(
            "activo",
            i === indiceHero
        );

    });
}


/* BOTON ANTERIOR */

anterior.addEventListener("click", () => {

    mostrarHero(indiceHero - 1);

    reiniciarTemporizador();

});


/* BOTON SIGUIENTE */

siguiente.addEventListener("click", () => {

    mostrarHero(indiceHero + 1);

    reiniciarTemporizador();

});


/* INDICADORES */

indicadores.forEach((indicador, indice) => {

    indicador.addEventListener("click", () => {

        mostrarHero(indice);

        reiniciarTemporizador();

    });

});


/* CAMBIO AUTOMATICO */

let temporizadorHero = setInterval(() => {

    mostrarHero(indiceHero + 1);

}, 5000);


/* REINICIAR TEMPORIZADOR */

function reiniciarTemporizador() {

    clearInterval(temporizadorHero);

    temporizadorHero = setInterval(() => {

        mostrarHero(indiceHero + 1);

    }, 5000);

}


/* =========================
   CARRUSEL DE PRODUCTOS
========================= */

const listaProductos =
    document.getElementById("listaProductos");

const productosAnterior =
    document.getElementById("productosAnterior");

const productosSiguiente =
    document.getElementById("productosSiguiente");


productosAnterior.addEventListener("click", () => {

    listaProductos.scrollBy({
        left: -500,
        behavior: "smooth"
    });

});


productosSiguiente.addEventListener("click", () => {

    listaProductos.scrollBy({
        left: 500,
        behavior: "smooth"
    });

});


/* =========================
   CARRITO
========================= */

let carrito = [];


const abrirCarrito =
    document.getElementById("abrirCarrito");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");

const carritoElemento =
    document.getElementById("carrito");

const fondoCarrito =
    document.getElementById("fondoCarrito");

const listaCarrito =
    document.getElementById("listaCarrito");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const cantidadCarrito =
    document.getElementById("cantidadCarrito");

const totalCarrito =
    document.getElementById("totalCarrito");


/* ABRIR */

abrirCarrito.addEventListener("click", () => {

    carritoElemento.classList.add("abierto");

    fondoCarrito.classList.add("activo");

});


/* CERRAR */

function cerrarCarritoFuncion() {

    carritoElemento.classList.remove("abierto");

    fondoCarrito.classList.remove("activo");

}


cerrarCarrito.addEventListener(
    "click",
    cerrarCarritoFuncion
);


fondoCarrito.addEventListener(
    "click",
    cerrarCarritoFuncion
);


/* =========================
   AGREGAR PRODUCTOS
========================= */

document.querySelectorAll(".btn-agregar").forEach(
    boton => {

        boton.addEventListener("click", () => {

            const id =
                boton.dataset.id;

            const nombre =
                boton.dataset.nombre;

            const precio =
                Number(boton.dataset.precio);

            const imagen =
                boton.dataset.imagen;


            const productoExistente =
                carrito.find(
                    producto => producto.id === id
                );


            if (productoExistente) {

                productoExistente.cantidad++;

            } else {

                carrito.push({
                    id: id,
                    nombre: nombre,
                    precio: precio,
                    imagen: imagen,
                    cantidad: 1
                });

            }


            actualizarCarrito();

            carritoElemento.classList.add(
                "abierto"
            );

            fondoCarrito.classList.add(
                "activo"
            );

        });

    }
);


/* =========================
   ACTUALIZAR CARRITO
========================= */

function actualizarCarrito() {

    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p class="carrito-vacio">
                Your cart is empty ♡
            </p>
        `;

    }


    carrito.forEach(producto => {

        const item =
            document.createElement("div");

        item.classList.add(
            "item-carrito"
        );


        item.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <div class="item-info">

                <h4>
                    ${producto.nombre}
                </h4>

                <p class="item-precio">
                    $${producto.precio.toLocaleString()}
                </p>

                <div class="cantidad">

                    <button
                        onclick="cambiarCantidad('${producto.id}', -1)">
                        -
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button
                        onclick="cambiarCantidad('${producto.id}', 1)">
                        +
                    </button>

                    <button
                        class="eliminar"
                        onclick="eliminarProducto('${producto.id}')">
                        ×
                    </button>

                </div>

            </div>
        `;


        listaCarrito.appendChild(item);

    });


    actualizarTotales();

}


/* =========================
   CAMBIAR CANTIDAD
========================= */

function cambiarCantidad(id, cambio) {

    const producto =
        carrito.find(
            producto => producto.id === id
        );


    if (!producto) {
        return;
    }


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(
                producto => producto.id !== id
            );

    }


    actualizarCarrito();

}


/* =========================
   ELIMINAR
========================= */

function eliminarProducto(id) {

    carrito =
        carrito.filter(
            producto => producto.id !== id
        );

    actualizarCarrito();

}


/* =========================
   TOTALES
========================= */

function actualizarTotales() {

    let cantidad = 0;

    let total = 0;


    carrito.forEach(producto => {

        cantidad += producto.cantidad;

        total +=
            producto.precio *
            producto.cantidad;

    });


    contadorCarrito.textContent =
        cantidad;

    cantidadCarrito.textContent =
        cantidad;

    totalCarrito.textContent =
        "$" + total.toLocaleString();

}


/* =========================
   BUSCADOR
========================= */

const buscador =
    document.getElementById("buscador");


buscador.addEventListener(
    "input",
    () => {

        const texto =
            buscador.value
            .toLowerCase()
            .trim();


        const productos =
            document.querySelectorAll(
                ".producto"
            );


        productos.forEach(producto => {

            const nombre =
                producto
                .querySelector("h3")
                .textContent
                .toLowerCase();


            if (
                nombre.includes(texto)
            ) {

                producto.style.display =
                    "";

            } else {

                producto.style.display =
                    "none";

            }

        });

    }
);


/* =========================
   BOTON CHECKOUT
========================= */

const botonPagar =
    document.querySelector(".btn-pagar");


botonPagar.addEventListener(
    "click",
    () => {

        if (carrito.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        alert(
            "Thank you for your purchase! Checkout will be available soon."
        );

    }
);


/* =========================
   INICIAR
========================= */

mostrarHero(0);

actualizarCarrito();