const {GraphQLList, GraphQLString} = require('graphql')
const User = require('mongoose').model('User')
const {UserType} = require('../types/user')

module.exports = {
	users: {
		type: new GraphQLList(UserType),
		resolve: async (root, args, req)=>{
			const userList = await User.find({});
        	return userList;
        }
	},
	user: {
		type: UserType,
		args:{
			_id: {type: GraphQLString}
		},
		resolve: async (root, {_id}, req)=>{
			const user = await User.findOne({_id});
        	return user;
        }
	},
}