const {LoggedType} = require('../types/user')
const {GraphQLString} = require('graphql')
const User = require('mongoose').model('User')

module.exports = {
	create:{
		type: LoggedType,
		args:{
        	email: {type: GraphQLString},
        	password: {type: GraphQLString}
        },
        resolve: async (root, {email, password}, req)=>{
    		let exist = await User.findOne({email});
			if(exist) {throw new Error("User exist!")}
			if(!email) {throw new Error("Email required!")}
			if(!password) {throw new Error("Email required!")}
			const finalUser = new User({email})
			finalUser.setPassword(password)
			await finalUser.save()
			return finalUser.toAuthJSON()
        }
	},
	login:{
		type: LoggedType,
		args:{
        	email: {type: GraphQLString},
        	password: {type: GraphQLString}
        },
        resolve: async (root, {email, password}, req)=>{
			let user = await User.findOne({email});
			if(!user){throw new Error("User not found!")}
			if(!user.validatePassword(password)){throw new Error("Wrong password!")}
			return user.toAuthJSON();
        }
	}
}