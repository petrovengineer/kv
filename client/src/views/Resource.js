import { useQuery, useMutation } from '@apollo/client'
import {GET_RESOURCE} from '../queries/Resource'
import {GET_TRANCHES} from '../queries/Tranche'
import {formatTime} from '../usefull'
import Title from '../components/styled/Title'
import Paper from '../components/styled/Paper'
import Time from '../components/styled/Time'
import Money from '../components/styled/Money'

const Resource = ({match})=>{
    const { loading, error, data } = useQuery(GET_RESOURCE, {variables:{_id:match.params._id}});
    const { loading: tranchesLoading, error: tranchesError, data: tranchesData } = useQuery(GET_TRANCHES, {variables:{filter:{resource:{_id: match.params._id}}}});
    return (
        <>
            {loading?'Loading...':error?null:
                <>
                    <Title>{data.resource? data.resource.name: 'Ресурс не существует'}</Title>
                    <h3 style={{color:'LIMEGREEN'}}>Поступления</h3>
                    {tranchesLoading?'Loading...':tranchesError?null:tranchesData.tranches.length===0?'Пока нет поступлений.':tranchesData.tranches.map(tranche=>(
                        <Paper key={tranche._id}>
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