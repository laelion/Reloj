function parsearFecha(fecha) {
    if(fecha.length == 10){
        return new Date(fecha)
    }
    if(parseInt(fecha) > 99){
       return new Date(parseInt(fecha))
    }
}

function armarJson(date) {
    return {
        "Año": date.getFullYear() ,
        "Mes": date.getMonth(),
        "Dia": date.getDate(),
        "Hora": date.getHours(),
        "Minutos": date.getMinutes(),
        "Segundos":date.getSeconds()
    }
}




module.exports = {parsearFecha,armarJson}