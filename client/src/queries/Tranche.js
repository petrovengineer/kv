import {gql} from '@apollo/client'

const GET_TRANCHES = gql`
    query GetTranches($filter: TrancheFilterInputType){
        tranches(filter: $filter){
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

const UPDATE_TRANCHE = gql`
mutation UpdateTranche($_id: String, $amount:Int, $payer: TranchePayerInputType, $date: String, $resource: TrancheResourceInputType){
    updateTranche(_id: $_id, amount:$amount, payer: $payer, date: $date, resource: $resource){
      _id
      amount
      resource{
        _id
        name
      }
      payer{
        name
      }
      date
    }
  }
`

const DELETE_TRANCHE = gql`
    mutation DeleteTranche($_id: String){
        deleteTranche(_id: $_id)
    }
`

export {GET_TRANCHES, CREATE_TRANCHE, DELETE_TRANCHE, UPDATE_TRANCHE}