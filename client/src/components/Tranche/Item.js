import {useHistory} from 'react-router-dom'
import {formatTime} from '../../usefull'
import Edit from '../styled/Edit'
import Remove from '../styled/Remove'
import {Link } from "react-router-dom"
import {useState} from 'react'
import { animations } from 'react-animation'
import UpdateForm from './UpdateForm'

export default ({tranche, setDeletePayload, index, filter})=>{
    const history = useHistory()
    const [update, showUpdate] = useState(false)
    return (
        <>
            {update?<UpdateForm onClose={()=>{showUpdate(false)}} tranche={tranche} filter={filter}/>:
                <tr style={{animation: animations.fadeIn}} >
                    <td>
                        {formatTime(tranche.date)}
                    </td>
                    <td>{tranche.payer?tranche.payer.name?tranche.payer.name:'Не указана':null}</td>
                    <td> 
                        {tranche.resource && tranche.resource.name?
                                    <a onClick={() => {history.push(`/resource/${tranche.resource._id}`)}}>{tranche.resource.name} </a>
                        :'Не указан'}
                    </td>
                    <td>
                        {tranche.amount?tranche.amount+' руб':'Сумма не указана'}
                    </td>
                    <td>
                    <Edit onClick={()=>{showUpdate(true)}}/>
                    <Remove onClick={()=>{
                            setDeletePayload({
                                trancheId: tranche._id, resourceId: tranche.resource? tranche.resource._id:null, index
                            })}}/>
                    </td>
                </tr>
            }
        </>

    )
}

