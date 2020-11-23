import Tranche from './Item'
import { useQuery} from '@apollo/client'
import {GET_TRANCHES} from '../../queries/Tranche'
import {AnimateGroup, AnimateOnChange} from 'react-animation'
import DeleteButton from './DeleteButton'
import {useState} from 'react'
import Modal from '../Modal'
import Message from '../Message'

export default ()=>{
    const {loading, error, data} = useQuery(GET_TRANCHES, {
        onError(){setMessage({text:'Ошибка сервера!', error: true})}
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
            {loading?'Загрузка...':error?null:
                data.tranches.length===0?'Пока нет ни одного поступления':
                data.tranches.map((tranche, index)=>(
                    // <AnimateGroup animation="bounce" component="tr">
                        <Tranche
                            key={tranche._id} 
                            tranche={tranche} 
                            index={index} 
                            setDeletePayload={setDeletePayload}
                        />
                    // </AnimateGroup>
                    ))
            }
            <AnimateOnChange>
                {deletePayload?
                        <Modal 
                            onClose={()=>setDeletePayload(null)} 
                            ActionButton={
                                <DeleteButton 
                                    setMessage={setMessage} 
                                    deletePayload={deletePayload} 
                                    setDeletePayload={setDeletePayload}
                                />
                            }
                        >
                                Вы действительно хотите удалить поступление?
                        </Modal>
                :null}
            </AnimateOnChange>
        </>
    )
}