const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLInputObjectType} = require('graphql')

const TrancheType = new GraphQLObjectType({
    name: 'TrancheType',
    fields: ()=>({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        amount: {type: GraphQLInt},
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

const TrancheFilterInputType = new GraphQLInputObjectType({
	name: 'TrancheFilterInputType',
	fields: ()=>({
		resource: {type: TrancheResourceInputType},
        payer: {type: TranchePayerInputType},
        amountFrom:{type: GraphQLInt},
        amountTo:{type: GraphQLInt},
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

const TrancheResourceInputType = new GraphQLInputObjectType({
    name: 'TrancheResourceInputType',
    fields: ()=>({
        _id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
})

const TranchePayerInputType = new GraphQLInputObjectType({
    name: 'TranchePayerInputType',
    fields: ()=>({
        _id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
})

module.exports = {TrancheType, TrancheResourceInputType, TranchePayerInputType, TrancheFilterInputType}