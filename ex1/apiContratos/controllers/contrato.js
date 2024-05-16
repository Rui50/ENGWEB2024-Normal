var mongoose = require('mongoose')
const { modelName } = require ('../models/contrato')
var Contrato = require('../models/contrato')
const contrato = require('../models/contrato')

module.exports.list = () =>{
    return Contrato
        .find()
        .sort({_id:1})
        .exec()
}

module.exports.findById = id => {
    return Contrato
        .findOne({_id : id})
        .exec()
}

module.exports.findByEntidade = entidade => {
    return Contrato
        .find({'NIPC_entidade_comunicante' : entidade})
        .exec()
}

module.exports.findByTipo = procedimento => {
    return Contrato
        .find({'tipoprocedimento' : procedimento})
        .exec()
}

module.exports.listEntidades = () =>{
    return Contrato
        .distinct('entidade_comunicante')
        .sort({'entidade_comunicante':1})
        .exec()
}

module.exports.listTipos = () =>{
    return Contrato
        .distinct("tipoprocedimento")
        .sort({"tipoprocedimento":1})
        .exec()
}

module.exports.insert = (contrato) =>{
    var newContrato = new Contrato(contrato)
    return newContrato.save()
}

module.exports.delete = (id) => {
    return Contrato
        .deleteOne({ _id: id })  
        .exec();
}

module.exports.update = (id, contrato) =>{
    return Contrato
        .findByIdAndUpdate(id, contrato, {new : true})
        .exec()
}
