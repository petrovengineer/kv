import {gql} from '@apollo/client'

const GET_TRANCHES = gql`
    query{
        tranches{
            _id
            amount
            resource{
                name
            }
            payer{
            name
            }
            date
        }
    }
`
const CREATE_TRANCHE = gql`
    mutation CreateTranche($amount:Int, $payer: String, $resource: String, $date: String){
        createTranche(amount:$amount, payer: $payer, resource: $resource, date: $date){
        _id
        amount
        resource{
            name
        }
        payer{
            name
        }
        date
        }
    }
`
export {GET_TRANCHES, CREATE_TRANCHE}