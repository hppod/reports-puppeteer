//Requires
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const hbs = require('handlebars')
const path = require('path')
const sequelize = require('./../../database/sequelize_config')
const helpers = require('./helpers')

//Variável que receberá os dados do banco de dados
var usuarios;

//Função responsável por compilar o template e os dados
const compile = async function (templateName, data) {
    const filePath = path.join(process.cwd(), './reports/templates', `${templateName}.hbs`)
    const html = await fs.readFile(filePath, 'utf-8')
    return hbs.compile(html)(data)
}

//Função responsável por gerar o relatório
const reportUsuarios = async () => {
    try {
        //Query do banco de dados utilizando sequelize
        var result = await sequelize.query(
            `SELECT 
            U.ID,
            U.NOME,
            U.EMAIL,
            DATE_FORMAT(U.NASCIMENTO, '%d/%m/%Y') AS NASCIMENTO,
            U.CPF
        FROM
            USUARIO AS U;`
        )

        //Setando o resultado da query a variável
        usuarios = {
            "usuarios": result[0]
        }

        //Iniciando o puppeteer, criando uma nova pagina e chamando a função compile
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const content = await compile('usuarios', usuarios)

        //Setando o conteúdo da pagina, emulando a tela e configurando a pagina
        await page.setContent(content)
        await page.emulateMedia('screen')
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                left: '10px',
                right: '10px'
            }
        })

        //Encerrando o puppeteer e retornando o resultado
        console.log('Relatório emitido com sucesso')
        await browser.close()
        return pdf
    } catch (e) {
        console.log(e)
    }
};

module.exports = { reportUsuarios }