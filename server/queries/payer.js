const { GraphQLList } = require("graphql");
const {PayerType} = require('../types/payer')
const Payer = require('mongoose').model('Payer')

module.exports = {
    payers : {
        type: new GraphQLList(PayerType),
        resolve: async ()=>{
            try{
                const payers = await Payer.find({})
                return payers;
            }catch(e){throw new Error("Error connect to DB!")}
        }
    }
}