import {useState} from 'react'
import Paper from '../components/styled/Paper'
import Title from '../components/Title'
import { useQuery, useMutation } from '@apollo/client'
import {GET_TRANCHES} from '../queries/Tranche'
import TranchAddForm from '../components/TrancheAddForm'
import {formatTime} from '../usefull'
import Message from '../components/Message'
import {useHistory} from 'react-router-dom'
import Money from '../components/styled/Money'
import Time from '../components/styled/Time'
import Payer from '../components/styled/Payer'
import Resource from '../components/styled/Resource'
import Link from '../components/styled/Link'
import Remove from '../components/styled/Remove'
import Edit from '../components/styled/Edit'

const Tranches = ()=>{
    const history = useHistory()
    const {loading, error, data} = useQuery(GET_TRANCHES, {
        onError(){showMessage('Ошибка сервера!')}
    })
    const [message, showMessage] = useState(false);
    return (
    <>
        <Title>Поступления</Title>
        {message?<Message message={message} error close={()=>{showMessage(false)}}/>:null}
        {loading?'Загрузка...':error?null:
            <>
                <TranchAddForm/>
                {data.tranches.length===0?'Пока нет ни одного поступления':data.tranches.map((tranche)=>(
                    <Paper key={tranche._id}>
                        <Time>{formatTime(tranche.date)} </Time>
                            <Money>{tranche.amount?tranche.amount+' руб':'Сумма не указана'} </Money>
                        <Resource>
                            {tranche.resource && tranche.resource.name?
                                <Link onClick={() => {history.push(`/resource/${tranche.resource._id}`)}}>{tranche.resource.name} </Link>
                                :null}
                        </Resource>
                        <Payer>{tranche.payer?tranche.payer.name: 'Контрагент не указан'}</Payer>
                        <Edit/>
                        <Remove/>
                    </Paper>
                ))}
            </>
        }  
    </>
)}

export default Tranches