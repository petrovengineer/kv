const { GraphQLList } = require("graphql");
const {WasteType} = require('../types/waste')
const Waste = require('mongoose').model('Waste')

module.exports = {
    wastes : {
        type: new GraphQLList(WasteType),
        resolve: async ()=>{
            try{
                const wastes = await Waste.find({})
                return wastes;
            }catch(e){throw new Error("Error connect to DB!")}
        }
    }
}