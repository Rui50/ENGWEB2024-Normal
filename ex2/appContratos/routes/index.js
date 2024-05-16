var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res, next) {
  // se depois der tempo para meter a data
  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:16000/contratos")
    .then( resp =>{
        var contratos = resp.data
        res.status(200).render("contratosListPage", {"listContratos" : contratos})                        
    })
    .catch(erro =>{
        res.status(501).render("error", {"error" : erro})       
    })
});

router.get('/:id', function(req, res, next) {

  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:16000/contratos/" + req.params.id)
    .then( resp =>{
        var contrato = resp.data
        res.status(200).render("contratoPage", {"contrato" : contrato})                        
    })
    .catch(erro =>{
        res.status(502).render("error", {"error" : erro})       
    })
});

router.get('/entidades/:nipc', function(req, res, next) {
  var entidade = req.params.nipc;

  axios.get("http://localhost:16000/contratos?entidade=" + entidade)

    .then(respEntidades => {
      var entidades = respEntidades.data;
      
      // somar o valor todal
      var valorTotal = 0;
      for (var i = 0; i < entidades.length; i++) {
        valorTotal += entidades[i].precoContratual;
      }

      // limitar a 2 casas decimais
      valorTotal = valorTotal.toFixed(2)

      // usar a primeira pos do array para ir buscar a def do Nipc
      var entidadeData = {
        nipc: entidade,
        nipc_nome: entidades[0]['entidade_comunicante'],
        contratos: entidades,
        valorTotal: valorTotal
      };
      res.render("entidadePage", {
        entidade: entidadeData
      });
    })
    .catch(erro => {
      res.status(502).render("error", { error: erro });
    });
});
module.exports = router;
