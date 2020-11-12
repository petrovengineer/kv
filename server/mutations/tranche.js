const {TrancheType} = require('../types/tranche')
const {GraphQLString, GraphQLInt, GraphQLInputObjectType} = require('graphql')
const Tranche = require('mongoose').model('Tranche')

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

