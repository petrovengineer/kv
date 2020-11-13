const {TrancheType, TrancheResourceInputType, TranchePayerInputType} = require('../types/tranche')
const {GraphQLString, GraphQLInt, GraphQLBoolean} = require('graphql')
const Tranche = require('mongoose').model('Tranche')

module.exports = {
    createTranche:{
		type: TrancheType,
		args:{
        	amount: {type: GraphQLInt},
        	date: {type: GraphQLString},
			payer: {type: TranchePayerInputType},
			resource: {type: TrancheResourceInputType}
        },
        resolve: async (root, {amount = 0, date, payer, resource}, req)=>{
			const newTranche = new Tranche({
				amount, date: new Date(date), payer, resource
			})
			try{
				return await newTranche.save()
			}
			catch(e){
				throw new Error("Error write to DB");
			}
        }
	},
	removeTranche:{
		type: GraphQLBoolean,
		args:{
			_id: {type: GraphQLString}
		},
		resolve: async (_, {_id})=>{
			try{
				return await Tranche.findByIdAndDelete(_id)?true:false
  			}
			catch(e){
				console.log(e)
			}		
		}
	}
}

