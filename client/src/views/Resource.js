import { useQuery, useMutation } from '@apollo/client'
import {GET_RESOURCE} from '../queries/Resource'
import {GET_TRANCHES} from '../queries/Tranche'
import styled from 'styled-components'
import {formatTime} from '../usefull'
import Title from '../components/Title'
import Paper from '../components/styled/Paper'
import Time from '../components/styled/Time'
import Money from '../components/styled/Money'
// import { useEffect } from 'react';

const Resource = ({match})=>{
    const { loading, error, data } = useQuery(GET_RESOURCE, {variables:{_id:match.params._id}});
    const { loading: tranchesLoading, error: tranchesError, data: tranchesData } = useQuery(GET_TRANCHES, {variables:{filter:{resource:{_id: match.params._id}}}});
    return (
        <>
            {loading?'Loading...':error?null:
                <>
                    <Title>{data.resource.name}</Title>
                    <h3 style={{color:'LIMEGREEN'}}>Поступления</h3>
                    {tranchesLoading?'Loading...':tranchesError?null:tranchesData.tranches.length===0?'Пока нет поступлений.':tranchesData.tranches.map(tranche=>(
                        <Paper>
                            <Time>{formatTime(tranche.date)} </Time>
                            <Money> {tranche.amount} руб </Money>
                        </Paper>
                    ))}
                </>
            }
        </>
    )
}

export default Resource