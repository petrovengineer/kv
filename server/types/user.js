const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLList} = require('graphql')

const UserType = new GraphQLObjectType({
    name:'UserType',
    fields:()=>({
        _id: {type: new GraphQLNonNull(GraphQLString)},
		email: {type: GraphQLString},
		scopes: {type: GraphQLList(ScopesType)},
        computedScopes: {type: GraphQLList(ComputedScopesType)},
    })
})

const ScopesType = new GraphQLObjectType({
    name: 'ScopesType',
    fields: ()=>({
		sectionId: {type: GraphQLString},
        read: {type: GraphQLList(GraphQLString)},
        write: {type: GraphQLList(GraphQLString)},
    })
})

const ComputedScopesType = new GraphQLObjectType({
    name: 'ComputedScopesType',
    fields: ()=>({
        name: {type: GraphQLString},
        read: {type: GraphQLBoolean},
        write: {type: GraphQLBoolean},
    })
})


const LoggedType = new GraphQLObjectType({
	name: 'LoggedType',
	fields:()=>({
		_id: {type: new GraphQLNonNull(GraphQLString)},
		email: {type: GraphQLString},
		firstName: {type: GraphQLString},
		lastName: {type: GraphQLString},
        token: {type: GraphQLString} 
	})
})



module.exports = {UserType, LoggedType}