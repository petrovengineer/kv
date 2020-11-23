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
	updateTranche:{
		type: TrancheType,
		args:{
			_id:{type: GraphQLString},
        	amount: {type: GraphQLInt},
        	date: {type: GraphQLString},
			payer: {type: TranchePayerInputType},
			resource: {type: TrancheResourceInputType}
        },
        resolve: async (root, args, req)=>{
			const {_id} = args;
			const tranche = await Tranche.findOne({_id});
			Object.keys(args).map(key=>{
				tranche[key] = args[key]
			})
			try{
				return await tranche.save()
			}
			catch(e){
				throw new Error("Error write to DB");
			}
        }
	},
	deleteTranche:{
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

