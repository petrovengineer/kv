import {useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import Button from '../Button'
import Dropdown from 'react-dropdown'
import DatePicker from 'react-datepicker'
import {GET_PAYERS} from '../../queries/Payer'
import {GET_RESOURCES} from '../../queries/Resource'
import {UPDATE_TRANCHE, GET_TRANCHES} from '../../queries/Tranche'
import Message from '../Message'

const UpdateForm = ({tranche, index, onClose})=>{
    const [startDate, setStartDate] = useState(new Date(tranche.date))
    const [options, setOptions] = useState([])
    const [resourceOptions, setResourceOptions] = useState([])
    const {loading, error, data} = useQuery(GET_PAYERS)
    const {loading: resourcesLoading, error: resourcesError, data: resourcesData} = useQuery(GET_RESOURCES)
    const [payer, setPayer] = useState(tranche.payer)
    const [resource, setResource] = useState(tranche.resource)
    const [amount, setAmount] = useState(tranche.amount?tranche.amount:'')
    const [message, setMessage] = useState(null)

    const [updateTranche, {loading: loadingUpdate}] = useMutation(UPDATE_TRANCHE, 
        {
            refetchQueries:[{query: GET_TRANCHES, variables:{filter:{resource:{_id: resource?resource._id:null}}}}],
            update(cache, {data: {updateTranche}}){
                if(updateTranche){
                    const {tranches} = cache.readQuery({query: GET_TRANCHES})
                    const newTranches = [...tranches];
                    newTranches[index] = updateTranche;
                    console.log(newTranches)
                    // cache.writeQuery({query: GET_TRANCHES, data: {tranches: newTranches}})
                }else{}
            },
            onError(){
                setMessage({text:'Ошибка сервера!', error: true})
            }
    })

    useEffect(()=>{
        if(!loading && data){
            setOptions([...data.payers.map(p=>({value:p._id, label:p.name}))]);
            console.log("PAYER",payer)
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
    const handleUpdateTranche = ()=>{
        updateTranche({variables:{ _id: tranche._id, amount: Number.parseInt(amount), payer, resource, date:startDate.toISOString()}})
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
                    value={payer._id?{value:payer._id, label: payer.name}:null}
                />
            </td>
            <td>
                <Dropdown 
                    options={resourceOptions} 
                    onChange={handleChangeResource}
                    placeholder="Выбрать"
                    controlClassName='form-control pr'
                    value={resource._id?{value:resource._id, label: resource.name}:null}
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
                <Button onClick={handleUpdateTranche} success loading={loadingUpdate}>Обновить</Button>
                <Button onClick={onClose} danger>Отмена</Button>
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

export default UpdateForm