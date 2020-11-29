import Tranche from './Item'
import { useQuery} from '@apollo/client'
import {GET_TRANCHES} from '../../queries/Tranche'
import {AnimateGroup, AnimateOnChange} from 'react-animation'
import DeleteButton from './DeleteButton'
import {useState} from 'react'
import Modal from '../Modal'
import Message from '../Message'
import FilterForm from './FilterForm'

export default ()=>{
    const [filter, setFilter] = useState(null)
    const {loading, error, data} = useQuery(GET_TRANCHES, {
        onError(e){
            console.log(e)
            setMessage({text:'Ошибка сервера!', error: true})
        },
        variables:{filter}
    })
    const [deletePayload, setDeletePayload] = useState(null)
    const [message, setMessage] = useState(null)
    return (    
        <>
            {message?
                <tr>
                    <td colSpan="5">
                        <Message error={message.error} close={()=>{setMessage(null)}}/>
                    </td>
                </tr>
            :null}
            <FilterForm filter={filter} setFilter={setFilter}/>
            {loading?<tr><td colSpan="5">Загрузка...</td></tr>:error?null:
                data.tranches.length===0?<tr><td colSpan="5">Пока нет ни одного поступления</td></tr>:
                data.tranches.map((tranche, index)=>(
                        <Tranche
                            key={tranche._id} 
                            tranche={tranche} 
                            index={index} 
                            setDeletePayload={setDeletePayload}
                        />
                    ))
            }
                {deletePayload?
                        <Modal 
                            onClose={()=>setDeletePayload(null)} 
                            ActionButton={
                                <DeleteButton 
                                    setMessage={setMessage} 
                                    deletePayload={deletePayload} 
                                    setDeletePayload={setDeletePayload}
                                    filter={filter}
                                />
                            }
                        >
                                Вы действительно хотите удалить поступление?
                        </Modal>
                :null}
        </>
    )
}