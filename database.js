const reqdate = require("./fdate.js")
const express = require("express");
const app = express();
const sql = require('mssql')
const sqlConfig = {
  user: "lion",
  password: "123",
  database: "ejemplo",
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}
const conexion = new sql.ConnectionPool(sqlConfig);
const request =  new sql.Request(conexion);

async function seleccionar(req, res) {
  try {
    let respuesta = hacerElSelectALaBaseDeDatos()
    console.log(respuesta)
    res.json(respuesta)
  }
  catch (errores) {
    console.log(errores)
  }
}

async function seleccionarSinRES() {
  try {
    let respuesta = hacerElSelectALaBaseDeDatos()
    respuesta
  }
  catch (errores) {
    console.log(errores)
  }
}

async function insertar(req, res) {
  let date = reqdate.parsearFecha(req.query.fecha)
  let reloj = reqdate.armarJson(date)
  try {
    const resulatosS = await seleccionarSinRES()
    console.log(resulatosS)
    if (resulatosS.rowsAffected == 0) {
        hacerElinsertALaBaseDeDatos(reloj)
      res.send(reloj)
    } else {
        hacerElmodificarALaBaseDeDatos(reloj)
      res.send(reloj)
    }
  } catch (errores) {
    console.log(errores)
  }
}

//Borrar
async function borrar(req, res) {
  try {
    let resultadoD =  hacerElEliminarALaBaseDeDatos()
    console.log(resultadoD)
    if (resultadoD.rowsAffected != 0) {
      res.send("Campos borrados correctamente");
    } else {
      res.send("No hay campos para borrar");
    }
  } catch (error) {
    console.log(error)
  }
}

async function conectar() {
 
 
     conexion.connect()
}

var hacerElSelectALaBaseDeDatos = async function () {
   ejecutarquery("SELECT * FROM reloj")
}

var hacerElmodificarALaBaseDeDatos = async function (reloj) {
   ejecutarquery("UPDATE reloj set año=" + reloj.Año + ", mes=" + reloj.Mes + ", dia= " + reloj.Dia
  + ", hora=" + reloj.Hora + ", minutos= " + reloj.Minutos + ", segundos= " + reloj.Segundos)
}

var hacerElinsertALaBaseDeDatos = async function (reloj) {
   ejecutarquery("INSERT INTO reloj values (" + reloj.Año + "," + reloj.Mes + "," + reloj.Dia + "," + reloj.Hora + "," + reloj.Minutos + "," + reloj.Segundos + ")")

}

var hacerElEliminarALaBaseDeDatos = async function () {
    ejecutarquery("DELETE FROM reloj")

}

var ejecutarquery = async function (query) {
  try{
    await conectar()
    let respuesta = await request.query(query)
    return respuesta
  }
 catch(error){
  console.log(error)
 }
}


module.exports = { 
  seleccionar, 
  insertar, 
  borrar 
}