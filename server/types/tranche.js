const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt} = require('graphql')

const TrancheType = new GraphQLObjectType({
    name: 'TrancheType',
    fields: ()=>({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        amount: {type: GraphQLString},
        payer: {
            type: TranchePayerType,
        },
        resource: {
            type: TrancheResourceType,
        },
        date: {
            type: GraphQLString,
            resolve: (tranche)=>(tranche.date.toISOString())
        }
    })
})

const TrancheResourceType = new GraphQLObjectType({
    name: 'TrancheResourceType',
    fields: ()=>({
        _id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
})

const TranchePayerType = new GraphQLObjectType({
    name: 'TranchePayerType',
    fields: ()=>({
        _id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
})

module.exports = {TrancheType}