//Utilizei express para cirar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")

//configurar arquivos estaticos(css, script, images)
server.use(express.static("public"))

//habilitar uso do re.body
server.use(express.urlencoded({ extended: true }))

//configuracoes do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//Rotas
//Captura o pedido do cliente para responder
server.get("/", function(req, res) {
    //Consultando Dados na tabela
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }           
        
        const reversedIdeas = [...rows].reverse()
    
        let lastIdeas = []
        for (let idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", {ideas: lastIdeas})
    })
})

server.get("/ideias", function(req, res) {
    //Consultando Dados na tabela
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }           
        
        const reversedIdeas = [...rows].reverse()
    
        return res.render("ideias.html", {ideas: reversedIdeas})
    })

})

server.post("/", function(req, res) {
    //Inserir dado na tabela
    const query = `
            INSERT INTO ideas(
                image,
                title,
                category,
                description,
                link
            ) VALUES (?,?,?,?,?);
    `
    const values = [ 
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }           

        return res.redirect("/ideias")
    })
})

server.post("/delete", function(req, res) {
    //Deletando dado na tabela
    db.run('DELETE FROM ideas WHERE id = ?', req.body.id, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        } 

        console.log("DELETEI", this)
        return res.redirect("/ideias")
    })
})

//Servidor iniado na porta 3000
server.listen(3000)