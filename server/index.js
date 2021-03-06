require('dotenv').config()
require('./mongo')
require('./models/User.js')
require('./models/CashWaste.js')
require('./models/Payer.js')
require('./models/Resource.js')
require('./models/Tranche.js')
require('./models/Waste.js')

const {GraphQLObjectType, GraphQLSchema} = require('graphql')
const {graphqlHTTP} = require('express-graphql')
const auth = require('./auth')

const app = require('./app').app

const userQueries = require('./queries/user')
const trancheQueries = require('./queries/tranche')
const resourceQueries = require('./queries/resource')
const payerQueries = require('./queries/payer')
const wasteQueries = require('./queries/waste')
const cashWasteQueries = require('./queries/cashwaste')

const QueryRootType = new GraphQLObjectType({
    name:'QueryRootType',
    fields: ()=>({
        ...userQueries,
        ...trancheQueries,
        ...resourceQueries,
        ...payerQueries,
        ...wasteQueries,
        ...cashWasteQueries
    })
})

const userMutations = require('./mutations/user')
const resourceMutations = require('./mutations/resource')
const payerMutations = require('./mutations/payer')
const trancheMutations = require('./mutations/tranche')
const wasteMutations = require('./mutations/waste')
const cashWasteMutations = require('./mutations/cashwaste')

const MutationRootType = new GraphQLObjectType({
    name: 'MutationRootType',
    fields:()=>({
        ...userMutations,
        ...resourceMutations,
        ...payerMutations,
        ...trancheMutations,
        ...wasteMutations,
        ...cashWasteMutations
    })
})

const Schema = new GraphQLSchema({
    query: QueryRootType,
    mutation: MutationRootType
})

app.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const User = require('mongoose').model('User')
    let user = await User.findOne({email});
    // console.log("USER",user)
    if(!user){return res.sendStatus(401)}
    if(!user.validatePassword(password)){return res.sendStatus(401)}
    return res.send(user.toAuthJSON());
})

app.use('/graphql', 
    auth.required,
    (req,res, next)=>{console.log("REQ ",req.body); next();},
    graphqlHTTP({
      schema: Schema,
      graphiql: true,
    }),
  );

app.listen(3000, () => console.log('Server running on http://localhost:3000/'));
