# Proyecto de gestión de muebles de hogar y oficina.

Este proyecto basado en Node.js y MongoDB permite ver, buscar, agregar, modificar y eliminar recursos en una base de datos. Utiliza Express.js como servidor y la base de datos MongoDB está alojada en un clúster de mongodb.com, al cual la aplicación Node.js está conectada.

## ENDPOINTS: 

1. **DEFINIR LA RUTA GET**
- Método: GET
- URL: `/`
- Descripción: Define la ruta raíz del servidor.

2. **OBTENER TODOS LOS MUEBLES**
- Método: GET
- URL: `/mobiliario`
- Descripción: Devuelve todos los muebles almacenados en la base de datos. 

3. **OBTENER UN MUEBLE POR SU ID**
- Método: GET
- URL: `/mobiliario/:id`
- Descripción: Busca y devuelve un mueble especifico por su nÚmero ID. 

4. **OBTENER UN MUEBLE POR SU NOMBRE O NOMBRE PARCIAL**
- Método: GET
- URL: `/mobiliario/nombre/:nombre`
- Descripción: Busca y devuelve un mueble que coincida con su nombre o la parcialidad de su nombre proporcionado (no distingue entre mayúsculas o minúsculas). 

5. **AGREGAR UN NUEVO MUEBLE**
- Método: POST
- URL: `/mobiliario`
- Descripción: Crea un nuevo mueble en la base de datos.
- Cuerpo de la solicitud JSON: 
`{
  "nombre": "Practicuna Corralito",
  "precio": 499.99,
  "categoria": "Dormitorio",
  "id": 31
}`

6. **MODIFICAR EL PRECIO DE UN MUEBLE**
- Método: PATCH
- URL: `/mobiliario/:id`
- Descripción: Modifica el precio de un mueble según su ID. 
- Cuerpo de la solicitud JSON: 
`{
  "precio": 600 
} `

7. **ELIMINAR UN MUEBLE**
- Método: DELETE
- URL: `/mobiliario/:id`
- Descripción: Elimina un mueble de la base de datos según su ID.

# Manejo de Errores

La aplicación maneja errores internos y notifica errores de solicitud.

## Especificaciones de la API
- Formato de Respuestas: Todas las respuestas son en formato JSON.

 __Códigos de Estado HTTP:__

- 200 : Solicitud exitosa.
- 201 : Recurso creado exitosamente.
- 404 : Recurso no encontrado.
- 422 : Error en el formato de los datos.
- 500 : Error interno del servidor.

## EJEMPLOS DE USO

- ***OBTENER TODOS LOS MUEBLES:***

  GET http://localhost:3000/mobiliario

- ***OBTENER UN MUEBLE POR SU ID:***

  GET http://localhost:3000/mobiliario/5

- ***OBTENER UN MUEBLE POR SU NOMBRE O NOMBRE PARCIAL:***
  
   GET http://localhost:3000/mobiliario/nombre/ESCRITORIO

   GET http://localhost:3000/mobiliario/nombre/cam

- ***AGREGAR UN NUEVO MUEBLE:***

   POST http://localhost:3000/mobiliario
   
   Body: { "nombre": "Practicuna Corralito", "precio": 499.99, "categoria": "Dormitorio", "id": 31 }

- ***MODIFICAR EL PRECIO DE UN MUEBLE:***

   PATCH http://localhost:3000/mobiliario/25

   Body: { "precio": 600 }

- ***ELIMINAR UN MUEBLE:***
  
   DELETE http://localhost:3000/mobiliario/25


   #### ___Trabajo realizado por Magalí Guerzoni.___









