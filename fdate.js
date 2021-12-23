// function parsearFecha(datos) {
//     if(datos.length == 10){
//         return new Date(datos)
//     }
//     if(parseInt(datos) > 99){
//        return new Date(parseInt(datos))
//     }
// }

function armarJson(datos) {
    
    datosParseados = new Date(datos.datos)
    
    return {
        "Año": datosParseados.getFullYear() ,
        "Mes": datosParseados.getMonth(),
        "Dia": datosParseados.getDate(),
        "Hora": datosParseados.getHours(),
        "Minutos": datosParseados.getMinutes(),
        "Segundos":datosParseados.getSeconds()
    }
}




module.exports = {armarJson}