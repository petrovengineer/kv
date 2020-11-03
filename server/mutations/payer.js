const {PayerType} = require('../types/payer')
const {GraphQLString} = require('graphql')
const Payer = require('mongoose').model('Payer')

module.exports = {
    createPayer:{
		type: PayerType,
		args:{
        	name: {type: GraphQLString},
        },
        resolve: async (root, {name = 'Новый плательщик'}, req)=>{
			const newPayer = new Payer({
				name, 
			})
			try{
				await newPayer.save()
				return newPayer;
			}
			catch(e){
				throw new Error("Error write to DB");
			}
        }
	},
}