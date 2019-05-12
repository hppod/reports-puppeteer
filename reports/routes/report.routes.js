//Requires
const express = require('express')
const route = express.Router()

//Require da função
const { reportUsuarios } = require('./../controllers/reports')

//Metodo HTTP e chamada da função
route.get('/relatorio-usuarios', function (req, res) {
    reportUsuarios().then((pdf) => {
        //É importante definirmos o tipo da response como 'application/pdf' pois estamos retornando um arquivo de pdf
        res.type('application/pdf')
        res.send(pdf)
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = route

