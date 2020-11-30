import {useEffect, useState, useRef} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import Button from '../Button'
import Dropdown from 'react-dropdown'
import DatePicker from 'react-datepicker'
import {GET_PAYERS} from '../../queries/Payer'
import {GET_RESOURCES} from '../../queries/Resource'
import {UPDATE_TRANCHE, GET_TRANCHES} from '../../queries/Tranche'
import Message from '../Message'

const FilterForm = ({filter, setFilter})=>{
    // const [startDate, setStartDate] = useState(new Date(tranche.date))
    let timerId = useRef(null);
    let timerIdTo = useRef(null);
    let amountFromRef = useRef(null);
    let amountToRef = useRef(null);
    const [amountFrom, setAmountFrom] = useState(filter && filter.amountFrom?filter.amountFrom:0)
    const [amountTo, setAmountTo] = useState(filter && filter.amountFrom?filter.amountTo:1000000)
    const [payerOptions, setPayerOptions] = useState([])
    const [resourceOptions, setResourceOptions] = useState([])
    const {loading: payerLoading, error: payerError, data: payerData} = useQuery(GET_PAYERS)
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

    useEffect(()=>{
        if(!payerLoading && payerData){
            setPayerOptions([...payerData.payers.map(p=>({value:p._id, label:p.name}))]);
        }
    }, [payerData])

    useEffect(()=>{
        timerId.current = setTimeout(function(){
           let newFilter = filter?{...filter}:{}
           newFilter.amountFrom = amountFrom;
           setFilter(newFilter)
       }, 2000)
    },[amountFrom])

    useEffect(()=>{
        timerIdTo.current = setTimeout(function(){
           let newFilter = filter?{...filter}:{}
           newFilter.amountTo = amountTo;
           setFilter(newFilter)
       }, 2000)
    },[amountTo])

    const handleChangePayer = (payer)=>{
        let newFilter = filter?{...filter}:{}
        newFilter.payer = {_id:payer.value, name: payer.label}
        setFilter(newFilter)
    }
    const handleChangeResource = (resource)=>{
        let newFilter = filter?{...filter}:{}
        newFilter.resource = {_id:resource.value, name: resource.label}
        setFilter(newFilter)
    }
    const handleChangeAmountFrom = (e)=>{
        var numbers = /^[0-9]+$/;
        let key = e.which || e.keyCode || e.charCode;
        let value = amountFromRef.current.value;
        if(value.length==0){
            setAmountFrom(0)
        }else if(value.match(numbers) || key==8){
            value = Number.parseInt(value)
            setAmountFrom(value)
        }
        clearTimeout(timerId.current)
    }
    const handleChangeAmountTo = (e)=>{
        let numbers = /^[0-9]+$/;
        let key = e.which || e.keyCode || e.charCode;
        let value = amountToRef.current.value;
        if(value.length==0){
            setAmountTo(0)
        }else if(value.match(numbers) || key==8){
            value = Number.parseInt(value)
            setAmountTo(value)
        }
        clearTimeout(timerId.current)
    }
    return (
        <>
        <tr>
            {/* <td>
                <DatePicker 
                    selected={startDate} 
                    onChange={date => setStartDate(date)} 
                    dateFormat="dd.MM.yyyy"
                    customInput={
                            <input type="text" className="form-control"></input>
                    }
                />
            </td> */}
            <td>
                <Dropdown 
                    options={payerOptions} 
                    onChange={handleChangePayer}
                    placeholder="Выбрать"
                    controlClassName='form-control pr'
                    value={filter && filter.payer && filter.payer._id?{value:filter.payer._id, label: filter.payer.name}:null}
                />
            </td>
            <td>
                <Dropdown 
                    options={resourceOptions} 
                    onChange={handleChangeResource}
                    placeholder="Выбрать"
                    controlClassName='form-control pr'
                    value={filter && filter.resource && filter.resource._id?{value:filter.resource._id, label: filter.resource.name}:null}
                />
            </td>
            <td style={{display:'flex', alignItems:'center'}}>
                От: <input
                    type="text"
                    size="10"
                    ref={amountFromRef}
                    style={{paddingRight:'5px'}}
                    className="form-control" 
                    placeholder = "Сумма" 
                    onChange = {handleChangeAmountFrom}
                    value = {amountFrom}
                />

                До: <input
                    type="text"
                    style={{paddingRight:'5px'}}
                    ref={amountToRef}
                    className="form-control" 
                    placeholder = "Сумма" 
                    onChange = {handleChangeAmountTo}
                    value = {amountTo}
                />
            </td>
            <td>
                <Button onClick={()=>{setFilter(null)}} danger>Сбросить</Button>
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

export default FilterForm