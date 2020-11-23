import InputText from '../InputText'
import {useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import StyledInputText from '../styled/StyledInputText'
import Button from '../Button'
import Dropdown from 'react-dropdown'
import DatePicker from 'react-datepicker'
import {GET_PAYERS} from '../../queries/Payer'
import {GET_RESOURCES} from '../../queries/Resource'
import {CREATE_TRANCHE, GET_TRANCHES} from '../../queries/Tranche'
import Message from '../Message'
import {AnimateOnChange} from 'react-animation'

const TrancheAddForm = ()=>{
    const [startDate, setStartDate] = useState(new Date())
    const [options, setOptions] = useState([])
    const [resourceOptions, setResourceOptions] = useState([])
    const {loading, error, data} = useQuery(GET_PAYERS)
    const {loading: resourcesLoading, error: resourcesError, data: resourcesData} = useQuery(GET_RESOURCES)
    const [payer, setPayer] = useState(null)
    const [resource, setResource] = useState(null)
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState(null)

    const [createTranche, {loading: loadingCreate}] = useMutation(CREATE_TRANCHE, 
        {
            refetchQueries:[{query: GET_TRANCHES, variables:{filter:{resource:{_id: resource?resource._id:null}}}}],
            update(cache, {data: {createTranche}}){
                const {tranches} = cache.readQuery({query: GET_TRANCHES})
                cache.writeQuery({query: GET_TRANCHES, data: {tranches: [createTranche, ...tranches]}})
            },
            onError(){
                setMessage({text:'Ошибка сервера!', error: true})
            }
    })

    useEffect(()=>{
        if(!loading && data){
            setOptions([...data.payers.map(p=>({value:p._id, label:p.name}))]);
        }
    }, [data])

    useEffect(()=>{
        if(!resourcesLoading && resourcesData){
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
        <>
        <tr>
         
            <td>
                <DatePicker 
                    selected={startDate} 
                    onChange={date => setStartDate(date)} 
                    dateFormat="dd.MM.yyyy"
                    customInput={
                            <input type="text" className="form-control"></input>
                    }
                />
            </td>
            <td>
                <Dropdown 
                    options={options} 
                    onChange={handleChangePayer}
                    placeholder="Выбрать"
                    controlClassName='form-control pr'
                />
            </td>
            <td>
                <Dropdown 
                    options={resourceOptions} 
                    onChange={handleChangeResource}
                    placeholder="Выбрать"
                    controlClassName='form-control pr'
                />
            </td>
            <td>
                <input
                    type="text"
                    className="form-control" 
                    placeholder = "Сумма" 
                    onChange = {e=>setAmount(e.currentTarget.value)}
                    value = {amount}
                />
            </td>
            <td>
                <Button onClick={handleCreateTranche} loading={loadingCreate}>Создать</Button>
            </td>
        </tr>
        {message?
            <tr>
                <td colSpan="5">                        
                    <Message error={message.error} close={()=>{setMessage(null)}}/>
                </td>
            </tr>
        :null}
    </>
    )
}

export default TrancheAddForm