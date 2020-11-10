import {gql} from '@apollo/client'

const GET_PAYERS = gql`
    query{
        payers{
        _id
        name
        }
    }
`
export {GET_PAYERS}