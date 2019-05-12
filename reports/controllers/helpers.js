const Handlebars = require('handlebars')

//Helper para tratar o CPF
Handlebars.registerHelper('cpf', function (cpf) {
    if (cpf) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 12)}`
    }
    return 'Não especificado'
})

