import {gql} from '@apollo/client'

const GET_RESOURCES = gql`
query GetResources {
  resources {
      _id
      name
      amount
  }
}
`;

const CREATE_RESOURCE = gql`
mutation Create($name:String){
  createResource(name:$name){
    _id
    name
    amount
  }
}
`

const GET_RESOURCE = gql`
  query GetResource($_id: String){
    resource(_id: $_id){
      _id
      name
      amount
      created
    }
  }
`
export {GET_RESOURCES, CREATE_RESOURCE, GET_RESOURCE}