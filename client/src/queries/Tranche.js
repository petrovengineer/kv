import {gql} from '@apollo/client'

const GET_TRANCHES = gql`
    query{
        tranches{
            _id
            amount
            resource{
                _id
                name
            }
            payer{
            _id
            name
            }
            date
        }
    }
`
const CREATE_TRANCHE = gql`
    mutation CreateTranche($amount:Int, $payer: TranchePayerInputType, $resource: TrancheResourceInputType, $date: String){
        createTranche(amount:$amount, payer: $payer, resource: $resource, date: $date){
        _id
        amount
        resource{
            _id
            name
        }
        payer{
            _id
            name
        }
        date
        }
    }
`
export {GET_TRANCHES, CREATE_TRANCHE}