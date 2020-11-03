const { GraphQLList } = require("graphql");
const {CashWasteType} = require('../types/cashwaste')
const CashWaste = require('mongoose').model('CashWaste')

module.exports = {
    cashwastes : {
        type: new GraphQLList(CashWasteType),
        resolve: async ()=>{
            try{
                const cashwaste = await CashWaste.find({})
                return cashwaste;
            }catch(e){throw new Error("Error connect to DB!")}
        }
    }
}