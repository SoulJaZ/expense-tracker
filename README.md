Administrador de Gastos CLI

Este es un gestor de gastos simple basado en Node.js que permite agregar, actualizar, eliminar y listar gastos desde la línea de comandos.

Características

Agregar nuevos gastos.
Listar todos los gastos.
Eliminar un gasto específico.
Actualizar un gasto.
Mostrar un resumen total de los gastos.
Mostrar un resumen de gastos por mes.

Instalación
Clona el repositorio:

git clone https://github.com/SoulJaZ/expense-tracker.git
cd expense-tracker

Asegúrate de tener Node.js instalado:
node -v

Uso

Agregar un gasto
node expense-tracker.js '1' "Cena en restaurante" 35.50 "2025-03-09"

Listar todos los gastos
node expense-tracker.js '2'

Eliminar un gasto
node expense-tracker.js '3' 

Actualizar un gasto
node expense-tracker.js '4' 1 "Supermercado" 50.00 "2025-03-10"

Ver el resumen total de los gastos
node expense-tracker.js '5'

Ver el resumen de gastos por mes
node expense-tracker.js '6' 2025-03

Tecnologías

Node.js
JSON para almacenamiento de datos

Licencia

Este proyecto está bajo la licencia MIT. ¡Siéntete libre de contribuir!
