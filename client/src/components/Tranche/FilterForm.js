import {useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import Button from '../Button'
import Dropdown from 'react-dropdown'
import DatePicker from 'react-datepicker'
import {GET_PAYERS} from '../../queries/Payer'
import {GET_RESOURCES} from '../../queries/Resource'
import {UPDATE_TRANCHE, GET_TRANCHES} from '../../queries/Tranche'
import Message from '../Message'

const FilterForm = ({resource, setResource})=>{
    // const [startDate, setStartDate] = useState(new Date(tranche.date))
    // const [options, setOptions] = useState([])
    const [resourceOptions, setResourceOptions] = useState([])
    // const {loading, error, data} = useQuery(GET_PAYERS)
    const {loading: resourcesLoading, error: resourcesError, data: resourcesData} = useQuery(GET_RESOURCES)
    // const [payer, setPayer] = useState(tranche.payer)
    // const [resource, setResource] = useState(tranche.resource)
    // const [amount, setAmount] = useState(tranche.amount?tranche.amount:'')
    const [message, setMessage] = useState(null)


    useEffect(()=>{
        if(!resourcesLoading && resourcesData){
            setResourceOptions([...resourcesData.resources.map(r=>({value:r._id, label:r.name}))]);
        }
    }, [resourcesData])

    // const handleChangePayer = (payer)=>{
    //     setPayer({_id:payer.value, name: payer.label})
    // }
    const handleChangeResource = (resource)=>{
        setResource({_id:resource.value, name: resource.label})
    }
    // const handleUpdateTranche = ()=>{
    //     const variables = {}
    //     variables._id = tranche._id;
    //     if(amount){variables.amount = Number.parseInt(amount)}
    //     if(payer._id && payer.name){
    //         variables.payer = {};
    //         variables.payer._id=payer._id;
    //         variables.payer.name=payer.name;
    //     }
    //     if(resource._id && resource.name){
    //         variables.resource = {};
    //         variables.resource._id=resource._id;
    //         variables.resource.name=resource.name;
    //     }
    //     variables.date = startDate.toISOString();
    //     updateTranche({variables})
    // }

    return (
        <>
        <tr>
{/*          
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
            </td> */}
            <td>
                <Dropdown 
                    options={resourceOptions} 
                    onChange={handleChangeResource}
                    placeholder="Выбрать"
                    controlClassName='form-control pr'
                    value={resource && resource._id?{value:resource._id, label: resource.name}:null}
                />
            </td>
            {/* <td>
                <input
                    type="text"
                    className="form-control" 
                    placeholder = "Сумма" 
                    onChange = {e=>setAmount(e.currentTarget.value)}
                    value = {amount}
                />
            </td> */}
            {/* <td>
                <Button onClick={handleUpdateTranche} success loading={loadingUpdate}>Искать</Button>
                <Button onClick={onClose} danger>Сбросить</Button>
            </td> */}
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

export default FilterForm