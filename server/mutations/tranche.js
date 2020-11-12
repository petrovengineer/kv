const {TrancheType} = require('../types/tranche')
const {GraphQLString, GraphQLInt} = require('graphql')
const Tranche = require('mongoose').model('Tranche')

module.exports = {
    createTranche:{
		type: TrancheType,
		args:{
        	amount: {type: GraphQLInt},
        	date: {type: GraphQLString},
			payer: {type: GraphQLString},
			resource: {type: GraphQLString}
        },
        resolve: async (root, {amount = 0, date, payer, resource}, req)=>{
			console.log("DEBUG", resource)
			const newTranche = new Tranche({
				amount, date: new Date(date), payer, resource
			})
			try{
				await newTranche.save()
				return newTranche;
			}
			catch(e){
				throw new Error("Error write to DB");
			}
        }
	},
}