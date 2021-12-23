const contenedroRelojBase = document.querySelector("#contenedroRelojBase")

//ajax llamar a la ruta seleccionar
fetch("/seleccionar", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
})
.then(response => response.json()

//manipulacion del data para insertarlo en html
.then(data => {

//parsear json a new date
   let date = ( new Date (parseInt(data.recordset[0].año),parseInt(data.recordset[0].mes),parseInt(data.recordset[0].dia),
 parseInt(data.recordset[0].hora),parseInt(data.recordset[0].minutos),parseInt(data.recordset[0].segundos)))

//insertar new date en contenedor html
 contenedroRelojBase.innerHTML = date

 //programar reloj img con el new date   
    let horaReloj = parseInt(data.recordset[0].hora)
    let minutoReloj = parseInt(data.recordset[0].minutos)
    let segundoReloj = parseInt(data.recordset[0].segundos)
    if(horaReloj >= 12){
        porcentajeHoras = horaReloj / 12 * 360
    } else {
        porcentajeHoras = horaReloj / 24 * 360
    }
    porcentajeHoras += minutoReloj / 60 * 30
    porcentajeMinutos = minutoReloj / 60 * 360;
    porcentajeSegundos = segundoReloj / 60 * 360;
    document.querySelector("#horas").style.transform = "rotate("+ porcentajeHoras +"deg)";
    document.querySelector("#minutos").style.transform = "rotate("+ porcentajeMinutos +"deg)";
    document.querySelector("#segundos").style.transform = "rotate("+ porcentajeSegundos +"deg)";
}
))


//Insertar Date
document.querySelector("#FormEnviarDate").addEventListener("submit", function(e){
    e.preventDefault()
    let inputReloj = document.querySelector("#inputReloj").value
    fetch("/insertar",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({datos: inputReloj})
    })
    .then (response => response.json() 
    .then(data =>{
      
        let date = ( new Date ((data.Año),parseInt(data.Mes),parseInt(data.Dia),
 parseInt(data.Hora),parseInt(data.Minutos),parseInt(data.Segundos)))
        contenedroRelojBase.innerHTML = new Date(date)
    
        //programar reloj img con el new date   
    let horaReloj = data.Hora
    let minutoReloj = data.Minutos
    let segundoReloj = data.Segundos
  
    if(horaReloj >= 12){
        porcentajeHoras = horaReloj / 12 * 360
    } else {
        porcentajeHoras = horaReloj / 24 * 360
    }
    porcentajeHoras += minutoReloj / 60 * 30
    porcentajeMinutos = minutoReloj / 60 * 360;
    porcentajeSegundos = segundoReloj / 60 * 360;
    document.querySelector("#horas").style.transform = "rotate("+ porcentajeHoras +"deg)";
    document.querySelector("#minutos").style.transform = "rotate("+ porcentajeMinutos +"deg)";
    document.querySelector("#segundos").style.transform = "rotate("+ porcentajeSegundos +"deg)";
    })
    )
   
     
})


//  var today = new Date();
//  var year = today.getFullYear();

//  console.log(new Date('2023-05-05T05:55'))





// // Ejemplo implementando el metodo POST:
// async function postData(url = '', data = {}) {
//     // Opciones por defecto estan marcadas con un *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }
  
//   postData('/seleccionar', { answer: 42 })
//     .then(data => {
//       console.log(data); // JSON data parsed by `data.json()` call
//     });

//     function AjaxSeleccionar (){
//         fetch()
//     }