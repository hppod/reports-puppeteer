const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//Importando a rota responsável pelo relatório
const reportRoute = require('./reports/routes/report.routes')

app.get('/', function (req, res) {
    res.send(`API listen on port ${port}`)
})

//Tornando a rota acessível
app.use('/', reportRoute)

app.listen(port, function () {
    console.log(`API listen on port ${port}`)
})

module.exports = app

