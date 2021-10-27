const reqdate = require ("./fdate.js")
const reqbase = require ("./database.js")
const PUERTO = 3000
const express = require("express");
const app = express();

//Fecha
app.post("/fecha", function (req, res)  {
    let date = reqdate.parsearFecha(req.query.fecha)
    let reloj = reqdate.armarJson(date)
    res.json(reloj)
})

//Seleccionar
app.post("/seleccionar", function (req,res){
    reqbase.seleccionar(req, res);
});

   //INSERTAR O MODEIFICAR REGISTROS
   app.post("/insertar", function (req, res)  {
    reqbase.insertar(req, res );
});
 
//BORRAR REGISTROS 
app.post("/borrar", function (req, res)  {
    reqbase.borrar(req, res)    
});   

app.listen(PUERTO, () => {
    console.log("Conectado en el puerto: " + PUERTO);
});
