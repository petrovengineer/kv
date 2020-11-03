const {WasteType} = require('../types/waste')
const {GraphQLString, GraphQLInt} = require('graphql')
const Waste = require('mongoose').model('Waste')

module.exports = {
    createWaste:{
		type: WasteType,
		args:{
        	goal: {type: GraphQLString},
        	user: {type: GraphQLString},
            date: {type: GraphQLString},
            moneyback: {type: GraphQLInt},
            cashback: {type: GraphQLInt},
        },
        resolve: async (root, {goal, user, date, cashback, moneyback}, req)=>{
			const newWaste = new Waste({
				goal, user, date: (date?new Date(date):null), moneyback, cashback
			})
			try{
				await newWaste.save()
				return newWaste;
			}
			catch(e){
				throw new Error("Error write to DB");
			}
        }
	},
}