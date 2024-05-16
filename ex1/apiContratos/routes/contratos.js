var express = require('express');
var router = express.Router();
var contratoModel = require('../models/contrato')
var Contrato = require('../controllers/contrato')

router.get('/entidades', function(req, res) {
    Contrato.listEntidades()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
    });

router.get('/tipos', function(req, res) {
    Contrato.listTipos()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
    });

router.get('/', function(req, res) {
    if (req.query.entidade) {
        Contrato.findByEntidade(req.query.entidade)
            .then(data => res.jsonp(data))
            .catch(erro => res.jsonp(erro));
    } else if (req.query.tipo) {
        Contrato.findByTipo(req.query.tipo)
            .then(data => res.jsonp(data))
            .catch(erro => res.jsonp(erro));
    } else {
        Contrato.list()
            .then(data => res.jsonp(data))
            .catch(erro => res.jsonp(erro));
    }
});

router.get('/:id', function(req, res) {
    Contrato.findById(req.params.id)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

router.post('/', function(req, res) {
    console.log(req.body)
    Contrato.insert(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(erro => res.status(523).jsonp(erro))
    });

router.delete('/:id', function(req, res) {
    console.log(req.params.id)
    Contrato.delete(req.params.id)
        .then(data => res.status(200).jsonp(data))
        .catch(erro => res.status(404).jsonp(erro));
})

router.put('/:id', function(req, res) {
    Contrato.update(req.params.id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });

module.exports = router;
