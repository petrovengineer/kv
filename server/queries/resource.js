const {GraphQLList, GraphQLString} = require('graphql')
const Resource = require('mongoose').model('Resource')
const {ResourceType} = require('../types/resource')

module.exports = {
	resources: {
		type: new GraphQLList(ResourceType),
		resolve: async ()=>{
            try{
				const resources = await Resource.find({}).sort({created:-1});
                return resources;
            }
            catch(e){
                throw new Error("Error connect to DB!")
            }
        }
    },
    resource: {
        type: ResourceType,
        args: {
            _id: {type: GraphQLString} 
        },
        resolve: async (_,{_id})=>{
            try{
				const resource = await Resource.findOne({_id});
                return resource;
            }
            catch(e){
                throw new Error("Error connect to DB!")
            }
        }
    }
}