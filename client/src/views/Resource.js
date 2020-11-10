import { useQuery, useMutation } from '@apollo/client'
import {GET_RESOURCE} from '../queries/Resource'
import styled from 'styled-components'
// import { useEffect } from 'react';

const Resource = ({match})=>{
    const { loading, error, data } = useQuery(GET_RESOURCE, {variables:{_id:match.params._id}});
    return (
        <>
            {loading?'Loading...':error?null:
                <>
                    <StyledTitle>{data.resource.name}</StyledTitle>
                    <h3>Поступления</h3>
                    {data.resource.tranches.map((tranche)=>(
                        <span>{tranche.amount}</span>
                    ))}
                </>
            }
        </>
    )
}

const StyledTitle = styled.h2`
    color: MEDIUMSLATEBLUE
`

export default Resource