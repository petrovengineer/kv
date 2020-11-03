const {GraphQLObjectType, GraphQLNonNull, GraphQLString} = require('graphql')

const PayerType = new GraphQLObjectType({
    name: 'PayerType',
    fields: ()=>({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
    })
})

module.exports = {PayerType}