import {useState} from 'react'
import Paper from '../components/styled/Paper'
import Title from '../components/Title'
import { useQuery, useMutation } from '@apollo/client'
import {GET_TRANCHES} from '../queries/Tranche'
import styled from 'styled-components'
import TranchAddForm from '../components/TrancheAddForm'
import {formatTime} from '../usefull'
import Message from '../components/Message'

const Tranches = ()=>{
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
                    <StyledPaper key={tranche._id}>
                        <span className="time">{formatTime(tranche.date)}</span>
                        <span className="money">{tranche.amount?tranche.amount+' руб':'Сумма не указана'} </span>
                        <span >{tranche.resource?tranche.resource.name+' ':null}</span>
                        <span className="payer">{tranche.payer?tranche.payer.name: 'Контрагент не указан'}</span>
                    </StyledPaper>
                ))}
            </>
        }  
    </>
)}

const StyledPaper = styled(Paper)`
font-size: 16px;
.time{
    color: blue;
    margin-right: 10px;
}
.money{
    color: green;
}
.payer{
    color: maroon;
}
`

export default Tranches