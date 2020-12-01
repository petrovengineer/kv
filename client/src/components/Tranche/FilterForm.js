import {useEffect, useState, useRef} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import Button from '../Button'
import Dropdown from 'react-dropdown'
import DatePicker from 'react-datepicker'
import {GET_PAYERS} from '../../queries/Payer'
import {GET_RESOURCES} from '../../queries/Resource'
import {UPDATE_TRANCHE, GET_TRANCHES} from '../../queries/Tranche'
import Message from '../Message'

const FilterForm = ({filter, setFilter, defaultFilter})=>{
    // const [startDate, setStartDate] = useState(new Date(tranche.date))
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(new Date());
    let timerIdFrom = useRef(null);
    let timerIdTo = useRef(null);
    let amountFromRef = useRef(null);
    let amountToRef = useRef(null);
    const [amountFrom, setAmountFrom] = useState(filter.amountFrom)
    const [amountTo, setAmountTo] = useState(filter.amountTo)
    const [payerOptions, setPayerOptions] = useState([])
    const [resourceOptions, setResourceOptions] = useState([])
    const {loading: payerLoading, error: payerError, data: payerData} = useQuery(GET_PAYERS)
    const {loading: resourcesLoading, error: resourcesError, data: resourcesData} = useQuery(GET_RESOURCES)
    const [message, setMessage] = useState(null)
 
    useEffect(()=>{
        console.log("DEBUG", filter)
        let inputFrom = amountFromRef.current;
        inputFrom.value = filter.amountFrom;
        let inputTo = amountToRef.current;
        inputTo.value = filter.amountTo;
    },[filter])

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
        clearTimeout(timerIdFrom.current)
        var numbers = /^[0-9]+$/;
        let key = e.which || e.keyCode || e.charCode;
        let input = amountFromRef.current;
        if(input.value.length==0){
            input.value = '0';
        }
        let newValue = Number.parseInt(input.value)
        input.value = newValue;
        if(input.value.match(numbers) || key==8){
            timerIdFrom.current = setTimeout(function(){
                let newFilter = filter?{...filter}:{}
                newFilter.amountFrom = newValue;
                setFilter(newFilter)
            }, 2000)
        }
    }
    
    const handleChangeAmountTo = (e)=>{
        clearTimeout(timerIdTo.current)
        var numbers = /^[0-9]+$/;
        let key = e.which || e.keyCode || e.charCode;
        let input = amountToRef.current;
        if(input.value.length==0){
            input.value = '0';
        }
        let newValue = Number.parseInt(input.value)
        input.value = newValue;
        if(input.value.match(numbers) || key==8){
            timerIdTo.current = setTimeout(function(){
                let newFilter = filter?{...filter}:{}
                newFilter.amountTo = newValue;
                setFilter(newFilter)
            }, 2000)
        }
    }

    const onChangeDate = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };

    return (
        <>
        <tr>
            <td style={{padding:'0'}}>
                <table className="table-borderless">
                    <tr>
                        <td>C</td>
                        <td><DatePicker 
                                selected={startDate} 
                                onChange={date => setStartDate(date)} 
                                startDate={startDate}
                                endDate={endDate}
                                selectsStart
                                dateFormat="dd.MM.yyyy"
                                customInput={
                                        <input type="text" className="form-control"></input>
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>По</td>
                        <td>
                            <DatePicker 
                                selected={endDate} 
                                onChange={date => setEndDate(date)} 
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                selectsEnd
                                dateFormat="dd.MM.yyyy"
                                customInput={
                                        <input type="text" className="form-control"></input>
                                }
                            />
                        </td>
                    </tr>
                </table>
            </td>
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
            <td style={{padding:'0'}}>
                <table className="table-borderless">
                    <tr>
                        <td>
                            От
                        </td>
                        <td>
                            <input
                                type="text"
                                size="10"
                                ref={amountFromRef}
                                style={{paddingRight:'5px'}}
                                className="form-control" 
                                placeholder = "Сумма" 
                                onChange = {handleChangeAmountFrom}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            До
                        </td>
                        <td>
                            <input
                                type="text"
                                style={{paddingRight:'5px'}}
                                ref={amountToRef}
                                className="form-control" 
                                placeholder = "Сумма" 
                                onChange = {handleChangeAmountTo}
                            />
                        </td>
                    </tr>
                </table>
            </td>
            <td>
                <Button onClick={()=>{setFilter(defaultFilter)}} danger>Сбросить</Button>
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