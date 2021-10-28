const reqdate = require ("./fdate.js")
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
const request = new sql.Request(conexion);
const queryS = "SELECT * FROM reloj"
const queryR = "DELETE FROM RELOJ"

async function conectar() {
  await conexion.connect()
}



//Seleccionar
async function seleccionar(req, res){
  try{    
      await conectar();
      let resultado = await  request.query(queryS)
      res.json(resultado)
  }
  catch(errores){
      console.log(errores)
  }
  }
//Seleccionas sin Json
  var seleccionarSinJson = async function (req, res){
    try{    
        await conectar()
        let resultadoS = await request.query(queryS)
        return resultadoS
        
    }
    catch(errores){
        console.log(errores)
    }
    }

//Insertar o Modificar
async function insertar(req, res){
 
        let date = reqdate.parsearFecha(req.query.fecha)
        let reloj = reqdate.armarJson(date)
          try {
              const resulatosS = await seleccionarSinJson()
              if(resulatosS.rowsAffected==0){
               let insertar =  await request.query("INSERT INTO reloj values (" 
               + reloj.Año + "," + reloj.Mes + "," + reloj.Dia + "," + reloj.Hora + "," + reloj.Minutos + "," + reloj.Segundos + ")")
               console.log(insertar)
               res.send(reloj)
                }else{
                let modificar = await request.query("UPDATE reloj set año=" + reloj.Año + ", mes=" + reloj.Mes + ", dia= " + reloj.Dia
                + ", hora=" + reloj.Hora + ", minutos= " + reloj.Minutos + ", segundos= " + reloj.Segundos)
                console.log("modificar")
                res.send( reloj)
              }
                }catch(errores){
                console.log(errores)
                }
}

      //Borrar
async function borrar(req, res){
        try {
          await conectar()
          let resultadoD = await request.query(queryR)
          if (resultadoD.rowsAffected!=0){
            res.send("Campos borrados correctamente");
        }else{
            res.send("No hay campos para borrar");
        }
        } catch (error) {
          console.log(error)
        }
}              

module.exports = {sql, sqlConfig, conexion, request, seleccionar, insertar, borrar}