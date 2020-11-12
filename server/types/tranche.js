const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt} = require('graphql')
const { PayerType } = require('./payer')
const { ResourceType } = require('./resource')
const Payer = require('mongoose').model('Payer')
const Resource = require('mongoose').model('Resource')

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
        resource: {
            type: ResourceType,
            resolve: async (tranch)=>{
                return await Resource.findOne({_id: tranch.resource})
            }
        },
        date: {
            type: GraphQLString,
            resolve: (tranche)=>(tranche.date.toISOString())
        }
    })
})

module.exports = {TrancheType}