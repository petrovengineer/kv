const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList} = require('graphql')
const {TrancheType} = require('../types/tranche')
const {WasteType} = require('../types/waste')
const {CashWasteType} = require('../types/cashwaste')
const {UserType} = require('../types/user')

const Tranche = require('mongoose').model('Tranche')
const Waste = require('mongoose').model('Waste')
const CashWaste = require('mongoose').model('CashWaste')
const User = require('mongoose').model('User')

const ResourceType = new GraphQLObjectType({
    name: 'ResourceType',
    fields: ()=>({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        created: {
            type: GraphQLString,
            resolve:  (resource)=>(resource.created.toISOString())
        },
        amount: {type: GraphQLString},
        // tranches: {
        //     type: GraphQLList(TrancheType),
        //     resolve: async (resource)=>{
        //         return await Tranche.find({_id: resource.tranches})
        //     }
        // },
        // waste: {
        //     type: GraphQLList(WasteType),
        //     resolve: async (resource)=>{
        //         return await Waste.find({_id: resource.waste})
        //     }
        // },
        // cashWaste:{
        //     type: GraphQLList(CashWasteType),
        //     resolve: async (resource)=>{
        //         return await CashWaste.find({_id: resource.cashWaste})
        //     }
        // },
        creator: {
            type: UserType,
            resolve: async (resource)=>{
                return await User.findOne({_id: resource.creator})
            }
        }
    })
})

module.exports = {ResourceType}