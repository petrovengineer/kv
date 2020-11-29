const {GraphQLList, GraphQLString, GraphQLInputObjectType} = require('graphql')
const Tranche = require('mongoose').model('Tranche')
const {TrancheType, TrancheFilterInputType} = require('../types/tranche')

module.exports = {
	tranches: {
		type: new GraphQLList(TrancheType),
		args:{
			filter: {type: TrancheFilterInputType}
		},
		resolve: async (root, {filter}, req)=>{
            try{
				let localFilter = {}
				if(filter){
					if(filter.resource && filter.resource._id){localFilter['resource._id']=filter.resource._id}
					if(filter.payer && filter.payer._id){localFilter['payer._id']=filter.payer._id}
					if(filter.amountFrom){localFilter['amount']={'$gte':filter.amountFrom}}
				}
				const tranches = await Tranche.find(localFilter).sort({date:-1});
                return tranches;
            }
            catch(e){
				// console.log(e)
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