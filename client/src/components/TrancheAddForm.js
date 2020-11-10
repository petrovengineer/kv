import InputText from '../components/InputText'
import {useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import StyledInputText from '../components/styled/StyledInputText'
import Button from '../components/Button'
import Dropdown from 'react-dropdown'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import {GET_PAYERS} from '../queries/Payer'
import {CREATE_TRANCHE, GET_TRANCHES} from '../queries/Tranche'

const TrancheAddForm = ()=>{
    const [startDate, setStartDate] = useState(new Date())
    const [options, setOptions] = useState([])
    const {loading, error, data} = useQuery(GET_PAYERS)
    const [payer, setPayer] = useState(null)
    const [amount, setAmount] = useState('')
    const [createTranche] = useMutation(CREATE_TRANCHE, {update(cache, {data: {createTranche}}){
        const {tranches} = cache.readQuery({query: GET_TRANCHES})
        cache.writeQuery({query: GET_TRANCHES, data: {tranches: [createTranche, ...tranches]}})
      }
    })
    useEffect(()=>{
        if(!loading){
            setOptions([...data.payers.map(p=>({value:p._id, label:p.name}))]);
        }
    }, [data])
    const handleChangePayer = (payer)=>{
        setPayer(payer.value)
    }

    const handleCreateTranche = ()=>{
        console.log({ amount: Number.parseInt(amount), payer, date:startDate.toISOString()})
        createTranche({variables:{ amount: Number.parseInt(amount), payer, date:startDate.toISOString()}})
    }

    return (
        <div style={{marginBottom:'10px', display: 'flex'}}>
            <DatePicker 
                selected={startDate} 
                onChange={date => setStartDate(date)} 
                dateFormat="dd.MM.yyyy"
                customInput={<StyledInputText style={{maxWidth:'100px'}}/>}
            />
            <InputText 
                placeholder = "Сумма" 
                change = {amount=>setAmount(amount)}
                value = {amount}
            />
            <StyledDropdown 
                options={options} 
                onChange={handleChangePayer}
                placeholder="Контрагент"
            />
            <Button onClick={handleCreateTranche}>Добавить</Button>
        </div>
    )
}

const StyledDropdown = styled(Dropdown)`
    font-size: 14px;
    font-family: 'Arial';
`

export default TrancheAddForm