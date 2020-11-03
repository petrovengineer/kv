const {GraphQLList, GraphQLString} = require('graphql')
const Resource = require('mongoose').model('Resource')
const {ResourceType} = require('../types/resource')

module.exports = {
	resources: {
		type: new GraphQLList(ResourceType),
		resolve: async ()=>{
            try{
				const resources = await Resource.find({});
                return resources;
            }
            catch(e){
                throw new Error("Error connect to DB!")
            }
        }
	},
}