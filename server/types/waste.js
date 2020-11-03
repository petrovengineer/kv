const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const {UserType} = require('../types/user')
const User = require('mongoose').model('User')

const WasteType = new GraphQLObjectType({
    name: 'WasteType',
    fields: ()=>({
        _id: {type: GraphQLString},
        goal: {type: GraphQLString},
        amount: {type: GraphQLInt},
        user: {
            type: UserType,
            resolve: async (waste)=>{
                return await User.findOne({_id: waste.user})
            }
        },
        date: {
            type: GraphQLString,
            resolve: (tranche)=>(tranche.date.toISOString())
        },
        cashback:{type: GraphQLInt},
        moneyback:{type: GraphQLInt}
    })
})

module.exports = {WasteType}