import {gql} from '@apollo/client'

const GET_TRANCHES = gql`
    query{
        tranches{
            _id
            amount
            payer{
            name
            }
            date
        }
    }
`
const CREATE_TRANCHE = gql`
    mutation CreateTranche($amount:Int, $payer: String, $date: Int){
        createTranche(amount:$amount, payer: $payer, date: $date){
        _id
        amount
        payer{
            name
        }
        date
        }
    }
`
export {GET_TRANCHES, CREATE_TRANCHE}