const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt} = require('graphql')
const { PayerType } = require('./payer')
const Payer = require('mongoose').model('Payer')

const TrancheType = new GraphQLObjectType({
    name: 'TrancheType',
    fields: ()=>({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        amount: {type: GraphQLString},
        payer: {
            type: PayerType,
            resolve: async (tranch)=>{
                return await Payer.findOne({_id: tranch.payer})
            }
        },
        date: {
            type: GraphQLString,
            resolve: (tranche)=>(tranche.date.toISOString())
        }
    })
})

module.exports = {TrancheType}