const {GraphQLList, GraphQLString, GraphQLInputObjectType} = require('graphql')
const Tranche = require('mongoose').model('Tranche')
const {TrancheType, TrancheResourceInputType} = require('../types/tranche')

const TrancheFilterInputType = new GraphQLInputObjectType({
	name: 'TrancheFilterInputType',
	fields: ()=>({
		resource: {type: TrancheResourceInputType}
	})
})

module.exports = {
	tranches: {
		type: new GraphQLList(TrancheType),
		args:{
			filter: {type: TrancheFilterInputType}
		},
		resolve: async (root, {filter = {}}, req)=>{
            try{
				const tranches = await Tranche.find(filter).sort({date:-1});
				console.log("TRANCHES", tranches)
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