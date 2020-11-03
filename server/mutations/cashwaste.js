const {CashWasteType} = require('../types/cashwaste')
const {GraphQLString} = require('graphql')
const CashWaste = require('mongoose').model('CashWaste')

module.exports = {
    createCashWaste:{
		type: CashWasteType,
		args:{
        	goal: {type: GraphQLString},
        	user: {type: GraphQLString},
        	date: {type: GraphQLString},
        },
        resolve: async (root, {goal, user, date}, req)=>{
			const newCashWaste = new CashWaste({
				goal, user, date: (date?new Date(date):null) 
			})
			try{
				await newCashWaste.save()
				return newCashWaste;
			}
			catch(e){
				throw new Error("Error write to DB");
			}
        }
	},
}