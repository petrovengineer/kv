import { useQuery, useMutation } from '@apollo/client'
import {GET_RESOURCE} from '../queries/Resource'
import styled from 'styled-components'
import { useEffect } from 'react';

const Resource = ({match})=>{
    const { loading, error, data } = useQuery(GET_RESOURCE, {variables:{_id:match.params._id}});
    useEffect(()=>{
        console.log(match.params);
    }, [])
    return (
        <>
            {loading?'Loading...':error?'Error!':
                <StyledTitle>{data.resource.name}</StyledTitle>
            }
        </>
    )
}

const StyledTitle = styled.h2`
    color: MEDIUMSLATEBLUE
`

export default Resource