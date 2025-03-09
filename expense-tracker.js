const path = require("patch");
const fs = require("fs");

// crear dirección del archivo que almacenara las tareas.
const ARCHIVO_TARREAS = path.join(__dirname, "expenses.json");


// Función que manjea la entrada de la información del usuario desde la línea de comandos (principal)
function principal (){
    mostrarMenu();
    entradaUsuario.question("Ingrese una opción", (opcion) => {
        if (entradaUsuario === '1') {
            entradaUsuario.question("Descripción del gasto: ", (descripcion) => {
                entradaUsuario.question("Monto: ", (monto) => {
                    entradaUsuario.question("Fecha: (DD-MM-YY): ", (fecha) => {
                        agregarGasto(descripcion, monto, fecha);
                        principal();
                    })
                })
            })
        }
        else{
            
        }
    })
}