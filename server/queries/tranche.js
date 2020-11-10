const {GraphQLList, GraphQLString} = require('graphql')
const Tranche = require('mongoose').model('Tranche')
const {TrancheType} = require('../types/tranche')

module.exports = {
	tranches: {
		type: new GraphQLList(TrancheType),
		resolve: async (root, args, req)=>{
            try{
				const tranches = await Tranche.find({}).sort({date:-1});
                return tranches;
            }
            catch(e){
                throw new Error("Error connect to DB!")
            }
        }
	},
	// user: {
	// 	type: UserType,
	// 	args:{
	// 		_id: {type: GraphQLString}
	// 	},
	// 	resolve: async (root, {_id}, req)=>{
	// 		const user = await User.findOne({_id});
    //     	return user;
    //     }
	// },
}