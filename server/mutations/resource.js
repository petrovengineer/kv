
const {ResourceType} = require('../types/resource')
const {GraphQLString} = require('graphql')
const Resource = require('mongoose').model('Resource')

module.exports = {
    createResource:{
		type: ResourceType,
		args:{
        	name: {type: GraphQLString},
        },
        resolve: async (root, {name = 'Новый ресурс'}, req)=>{
			const newResource = new Resource({
				name, 
				creator: (req && req.payload && req.payload._id)? req.payload._id: null
			})
			try{
				await newResource.save()
				return newResource;
			}
			catch(e){
				throw new Error("Error write to DB");
			}
        }
	},
	updateResource:{
		type: ResourceType,
		args:{
			_id: {type: GraphQLString},
			trancheId: {type: GraphQLString}
		},
		resolve: async (_, {_id, trancheId})=>{
			const newResource = Resource.findOne({_id});
			newResource.tranches.push(trancheId);
			try{
				await newResource.save()
			}catch(e){throw new Error("Error write to DB!")}
		}
	}
}