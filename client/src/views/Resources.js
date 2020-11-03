import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

const Resources = ()=>{
    const {loading, error, data} = useQuery(GET_RESOURCES);
    return (
    <>
      {loading?'Loading':error?'Error':
        data.resources.map((resource)=>(
            <Paper key={resource._id}>
                {resource.name}
            </Paper>
        ))
      }  
    </>
)}

const GET_RESOURCES = gql`
  query GetResources {
    resources {
        _id
        name
    }
  }
`;

const Paper = styled.div`
    background-color: white;
    border-radius: 4px;
    padding: 10px;
    font-size: 18px;
`

export default Resources