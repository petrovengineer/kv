const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const {UserType} = require('../types/user')
const User = require('mongoose').model('User')

const CashWasteType = new GraphQLObjectType({
    name: 'CashWasteType',
    fields: ()=>({
        _id: {type: GraphQLString},
        goal: {type: GraphQLString},
        amount: {type: GraphQLInt},
        user: {
            type: UserType,
            resolve: async (cashwaste)=>{
                console.log("DEBUG", cashwaste)
                return await User.findOne({_id: cashwaste.user})
            }
        },
        date: {
            type: GraphQLString,
            resolve: (tranche)=>(tranche.date.toISOString())
        }
    })
})

module.exports = {CashWasteType}