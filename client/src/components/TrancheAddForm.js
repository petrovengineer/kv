import InputText from '../components/InputText'
import {useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import StyledInputText from '../components/styled/StyledInputText'
import Button from '../components/Button'
import Dropdown from 'react-dropdown'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import {GET_PAYERS} from '../queries/Payer'
import {GET_RESOURCES} from '../queries/Resource'
import {CREATE_TRANCHE, GET_TRANCHES} from '../queries/Tranche'

const TrancheAddForm = ()=>{
    const [startDate, setStartDate] = useState(new Date())
    const [options, setOptions] = useState([])
    const [resourceOptions, setResourceOptions] = useState([])
    const {loading, error, data} = useQuery(GET_PAYERS)
    const {loading: resourcesLoading, error: resourcesError, data: resourcesData} = useQuery(GET_RESOURCES)
    const [payer, setPayer] = useState(null)
    const [resource, setResource] = useState(null)
    const [amount, setAmount] = useState('')

    const [createTranche, {loading: loadingCreate}] = useMutation(CREATE_TRANCHE, 
        {
            refetchQueries:[{query: GET_TRANCHES, variables:{filter:{resource:{_id: resource?resource._id:null}}}}],
            update(cache, {data: {createTranche}}){
                const {tranches} = cache.readQuery({query: GET_TRANCHES})
                cache.writeQuery({query: GET_TRANCHES, data: {tranches: [createTranche, ...tranches]}})
            },
    })

    useEffect(()=>{
        if(!loading){
            setOptions([...data.payers.map(p=>({value:p._id, label:p.name}))]);
        }
    }, [data])

    useEffect(()=>{
        if(!resourcesLoading){
            setResourceOptions([...resourcesData.resources.map(r=>({value:r._id, label:r.name}))]);
        }
    }, [resourcesData])

    const handleChangePayer = (payer)=>{
        setPayer({_id:payer.value, name: payer.label})
    }
    const handleChangeResource = (resource)=>{
        setResource({_id:resource.value, name: resource.label})
    }
    const handleCreateTranche = ()=>{
        createTranche({variables:{ amount: Number.parseInt(amount), payer, resource, date:startDate.toISOString()}})
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
            <Dropdown 
                options={options} 
                onChange={handleChangePayer}
                placeholder="Контрагент"
            />
            <Dropdown 
                options={resourceOptions} 
                onChange={handleChangeResource}
                placeholder="Ресурс"
            />
            <Button onClick={handleCreateTranche} loading={loadingCreate}>Создать</Button>
        </div>
    )
}

export default TrancheAddForm