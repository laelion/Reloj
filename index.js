const reqdate = require ("./fdate.js")
const reqbase = require ("./database.js")
const PUERTO = 3000
const express = require("express");
const app = express();

/*
app.post("/fecha", function (req, res)  {
    let date = reqdate.parsearFecha(req.query.fecha)
    let reloj = reqdate.armarJson(date)
    res.json(reloj)
});*/

app.post("/seleccionar", function (req,res){
    async function seleccionar(){
    try{    
        await reqbase.conexion.connect()
        let seleccion = await reqbase.request.query("SELECT * FROM reloj")
        res.send(seleccion)
    }
    catch(errores){
        console.log(errores)
    }
    }
    seleccionar();
});

   //INSERTAR O MODEIFICAR REGISTROS
   app.post("/insertar", function (req, res)  {
    let date = reqdate.parsearFecha(req.query.fecha)
    let reloj = reqdate.armarJson(date)
    async function insertar(){
        try {
            await reqbase.conexion.connect()
           let seleccion = await reqbase.request.query("SELECT * FROM reloj")
           if(seleccion.rowsAffected==0){
               let insertar =  await reqbase.request.query("INSERT INTO reloj values (" 
               + reloj.Año + "," + reloj.Mes + "," + reloj.Dia + "," + reloj.Hora + "," + reloj.Minutos + "," + reloj.Segundos + ")")
               console.log(insertar)
               res.send(reloj)
           }
                let modificar = await reqbase.request.query("UPDATE reloj set año=" + reloj.Año + ", mes=" + reloj.Mes + ", dia= " + reloj.Dia
                + ", hora=" + reloj.Hora + ", minutos= " + reloj.Minutos + ", segundos= " + reloj.Segundos)
                console.log(modificar)
                res.send( reloj)

        } catch (errores) {
            console.log(errores)
        }
    }
    insertar();
});//post


 
//BORRAR REGISTROS 
app.post("/borrar", function (req, res)  {
    async function borrar(){
    await reqbase.conexion.connect()
    let resultado = await reqbase.request.query("DELETE FROM RELOJ")
    if (resultado.rowsAffected!=0){
        res.send("Campos borrados correctamente");
    }
        res.send("No hay campos para borrar");
    }
    borrar()    
});   

app.listen(PUERTO, () => {
    console.log("Conectado en el puerto: " + PUERTO);
});
