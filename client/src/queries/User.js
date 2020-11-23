import {gql} from '@apollo/client'

const AUTH = gql`
    query {
        auth{
        _id
        email
        }
    }
`

export {AUTH}