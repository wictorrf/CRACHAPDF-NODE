const express = require("express");
const cors = require("cors");
const pdf = require("html-pdf");
const ejs = require("ejs");
const bodyParser = require("body-parser")
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(cors())


app.get("/cracha", async  (req, res) => {
    const idprocesso = req.query.idprocesso;
    const situacao = req.query.situacao;
    const tpequipamento = req.query.tpequipamento;
    const tamanho = req.query.tamanho;
    const atividade = req.query.atividade;
    const polo = req.query.polo;
    const periodo = req.query.periodo;
    const periodo2 = req.query.periodo2;

    ejs.renderFile("./views/cracha.ejs", {idprocesso: idprocesso, situacao: situacao, tpequipamento: tpequipamento, tamanho: tamanho, atividade: atividade, polo: polo, periodo: periodo, periodo2: periodo2}, (err, html) => {

        if(err){
           console.log(err)
       }else{
           pdf.create(html,{}).toFile("./crachaPDF.pdf", (err, res) => {
               if(err){
                   console.log("Um erro aconteceu!!")
               } else{
                   console.log(res);
               }
           })
       }
   
   })
   res.send("<h1> gerando PDF cracha de evento! </h1>")

})


app.listen(3030, ()=>{
    console.log("app rodando!");
});