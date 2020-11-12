import {useEffect, useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import InputText from '../components/InputText'
import Button from '../components/Button'
import {GET_RESOURCES, CREATE_RESOURCE} from '../queries/Resource'
import {useHistory} from 'react-router-dom';
import Message from '../components/Message'
import Paper from '../components/styled/Paper'
import Title from '../components/Title'

const Resources = ()=>{
    // const [loadingCreate, setLoadingCreate] = useState(false)
    const [name, setName] = useState('')
    const [message, showMessage] = useState(false);
    const history = useHistory()
    const {loading, error, data} = useQuery(GET_RESOURCES, {
      onError(){showMessage('Ошибка сервера!')}
    })

    const [createResource, {loading:createLoading}] = useMutation(CREATE_RESOURCE, {
      update(cache, {data: {createResource}}){
        const {resources} = cache.readQuery({query: GET_RESOURCES})
        cache.writeQuery({query: GET_RESOURCES, data: {resources: [createResource, ...resources]}})
      },
      onError(){
        showMessage("Ошибка сервера!");
      },
    })

    const createResourceHandle = () => {
      if(name === ''){
        showMessage("Название не должно быть пустым!");
        return;
      }
      createResource({variables:{name}})
      setName('')
      showMessage(false)
    }

    return (
    <>
      <Title>Ресурсы</Title>      
      {message?<Message message={message} error close={()=>{showMessage(false)}}/>:null}
      {loading?'Загрузка...':error?null:
          <>
            <div style={{marginBottom: '20px', display: 'flex'}}>
              <InputText value={name} change={setName}/>
              <Button loading={createLoading} onClick={createResourceHandle}>
                Создать
              </Button>
            </div>
            {data.resources.length===0?'Пока нет ни одного ресурса  ':data.resources.map((resource)=>(
              <Paper clickble key={resource._id} onClick={() => {history.push(`/resource/${resource._id}`)}}>
                  {resource.name}
              </Paper>)
            )}
        </>
      }
    </>
)}

export default Resources