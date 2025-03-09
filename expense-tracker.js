const readline = require("readline");
const path = require("path");
const fs = require("fs");

// crear dirección del archivo que almacenara las tareas.
const ARCHIVO_TARREAS = path.join(__dirname, "expenses.json");


// Configuración de la interfaz de entrada desde la terminal.
const entradaUsuario = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ménu principal.
function mostrarMenu(){
    console.log("BIENVENIDO AL CONTROLADOR DE GASTOS!!!")
    console.log("\nSeleccione una opción: ");
    console.log("1. Agregar gasto.");
    console.log("2. Ver gastos.");
    console.log("3. Eliminar gasto.");
    console.log("4. Actualizar gasto.");
    console.log("5. Ver resumen gastos.");
    console.log("6. Ver resumen gastos por mes.");
    console.log("7. Salir.")
}

// Función que maneja la entrada de la información del usuario desde la línea de comandos (principal)
function principal (){
    mostrarMenu();
    entradaUsuario.question("Ingrese una opción: ", (opcion) => {
        if (entradaUsuario === '1') {
            entradaUsuario.question("Descripción del gasto: ", (descripcion) => {
                entradaUsuario.question("Monto: ", (monto) => {
                    entradaUsuario.question("Fecha: (DD-MM-YY): ", (fecha) => {
                        agregarGasto(descripcion, monto, fecha);
                        principal();
                    });
                });
            });
        }
        else if(opcion === '2'){
            verGastos();
            principal();
        }
        else if(opcion === '3'){
            verGastos();
            entradaUsuario.question("Ingresa el gasto que deseas eliminar: ", (posicion) => {
                eliminarGasto(posicion);
                principal();
            });
        }
        else if(opcion === '4'){
            verGastos();
            entradaUsuario.question("Ingrese el número de gasto que desea actualizar: ", (posicion) => {
                entradaUsuario.question("Nueva Descripción del gasto: ", (nuevaDescripcion) => {
                    entradaUsuario.question("Nuevo Monto: ", (nuevoMonto) => {
                        entradaUsuario.question("Nueva Fecha: ", (nuevaFecha) => {
                            actualizarGasto(nuevaDescripcion, nuevaMonto, nuevaFecha);
                            principal();
                        });
                    });
                });
            });
        }
        else if(opcion === '5'){
            verResumenGastos();
            principal();
        }
        else if(opcion === '6'){
            entradaUsuario.question("Ingrese el mes que desea consultar (YYYY-MM): ", (mes) => {
                verResumenGastosPorMes();
                principal();
            });
        }
        else if(opcion === '7'){
            console.log("Saliendo!!");
            entradaUsuario.close();
        }else{
            console.log("Opcion no válida.");
            principal();
        }
    });
}

// Iniciar el programa. Invocando la función "principal"
principal();