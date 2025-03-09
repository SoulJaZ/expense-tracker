const readline = require("readline");
const path = require("path");
const fs = require("fs");

// crear dirección del archivo que almacenará los gastos.
const ARCHIVO_GASTOS = path.join(__dirname, "expenses.json");

// Configuración de la interfaz de entrada desde la terminal.
const entradaUsuario = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Función para cargar la información del archivo que almacena los gastos.
function cargarGastos() {
  try {
    const informacion = fs.readFileSync(ARCHIVO_GASTOS, "utf-8");
    return JSON.parse(informacion);
  } catch (error) {
    return [];
  }
}

// Función para guardar la información en el archivo que almacena las tareas.
function guardarGastos(gastos) {
  fs.writeFileSync(ARCHIVO_GASTOS, JSON.stringify(gastos, null, 2));
}

// Función para agregar nuevo gasto
function agregarGasto(descripcion, monto, fecha) {
  let gastos = cargarGastos();

  try {
    gastos.push({ descripcion, monto: parseFloat(monto), fecha });
    guardarGastos(gastos);
    console.log("Gasto agregado exitosamente!.");
  } catch (error) {
    console.log("Error", message.error);
  }
}

// Función para mostrar los gastos
function verGastos() {
  let gastos = cargarGastos();
  console.log("\nLista de gastos: ");
  gastos.forEach((gasto, posicion) => {
    console.log(
      `${posicion + 1}. ${gasto.descripcion} - ${gasto.monto.toFixed(2)} - ${gasto.fecha}`
    );
  });
}

// Función para eliminar un gasto.
function eliminarGasto(posicion) {
  let gastos = cargarGastos();

  if (posicion >= 1 && posicion <= gastos.length) {
    gastos.splice(posicion - 1, 1);
    guardarGastos(gastos);
    console.log("Gasto eliminado. ");
  } else {
    console.log("Posición no válida.");
  }
}

// Función para actualizar un gasto.
function actualizarGasto(posicion, nuevaDescripcion, nuevaMonto, nuevaFecha) {
  let gastos = cargarGastos();

  if (posicion >= 1 && posicion <= gastos.length) {
    gastos[posicion - 1] = {
      descripcion: nuevaDescripcion,
      monto: parseFloat(nuevaMonto),
      fecha: nuevaFecha,
    };
    guardarGastos(gastos);
    console.log("Gasto actualizado exitosamente.");
  } else {
    console.log("Posición no válida.");
  }
}

// Función para mostrar un resumen de los gastos totales.
function verResumenGastos(){
    let gastos = cargarGastos();

    let total = gastos.reduce(( resumen, gasto ) => resumen + gasto.monto, 0);
    console.log(`Total de gastos: $${total.toFixed(2)}`);

}

// Función para mostrar resumen por mes especifico.
function verResumenGastosPorMes(mes) {
  let gastos = cargarGastos();
  let gastosMes = gastos.filter((gasto) => gasto.fecha.startsWith(mes));
  let total = gastosMes.reduce((resumen, gastos) => resumen + gastos.monto, 0);
  console.log(`\nGastos en: ${mes}: $${total.toFixed(2)}`);
}

// Ménu principal.
function mostrarMenu() {
  console.log("BIENVENIDO AL CONTROLADOR DE GASTOS!!!");
  console.log("\nSeleccione una opción: ");
  console.log("1. Agregar gasto.");
  console.log("2. Ver gastos.");
  console.log("3. Eliminar gasto.");
  console.log("4. Actualizar gasto.");
  console.log("5. Ver resumen gastos.");
  console.log("6. Ver resumen gastos por mes.");
  console.log("7. Salir.");
}

// Función que maneja la entrada de la información del usuario desde la línea de comandos (principal)
function principal() {
  mostrarMenu();
  entradaUsuario.question("Ingrese una opción: ", (opcion) => {

    if (opcion === "1") {
      entradaUsuario.question("Descripción del gasto: ", (descripcion) => {
        entradaUsuario.question("Monto: ", (monto) => {
          entradaUsuario.question("Fecha: (YYYY-MM-DD): ", (fecha) => {
            agregarGasto(descripcion, monto, fecha);
            principal();
          });
        });
      });
    } else if (opcion === "2") {
      verGastos();
      principal();
    } else if (opcion === "3") {
      verGastos();
      entradaUsuario.question(
        "Ingresa el gasto que deseas eliminar: ",
        (posicion) => {
          eliminarGasto(parseInt(posicion));
          principal();
        }
      );
    } else if (opcion === "4") {
      verGastos();
      entradaUsuario.question(
        "Ingrese el número de gasto que desea actualizar: ",
        (posicion) => {
          entradaUsuario.question(
            "Nueva Descripción del gasto: ",
            (nuevaDescripcion) => {
              entradaUsuario.question("Nuevo Monto: ", (nuevaMonto) => {
                entradaUsuario.question("Nueva Fecha (YYYY-MM-DD): ", (nuevaFecha) => {
                  actualizarGasto(parseInt(posicion), nuevaDescripcion, nuevaMonto, nuevaFecha);
                  principal();
                });
              });
            }
          );
        }
      );
    } else if (opcion === "5") {
      verResumenGastos();
      principal();
    } else if (opcion === "6") {
      entradaUsuario.question(
        "Ingrese el mes que desea consultar (YYYY-MM): ",
        (mes) => {
          verResumenGastosPorMes(mes);
          principal();
        }
      );
    } else if (opcion === "7") {
      console.log("Saliendo!!");
      entradaUsuario.close();
    } else {
      console.log("Opcion no válida.");
      principal();
    }
  });
}

// Iniciar el programa. Invocando la función "principal"
principal();
