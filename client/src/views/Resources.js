import {useEffect, useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import InputText from '../components/InputText'
import StyledButton from '../components/Button'
import load from '../assets/loading.gif'
import {GET_RESOURCES, CREATE_RESOURCE} from '../queries/Resource'
import {useHistory} from 'react-router-dom';
import Message from '../components/Message'
import Paper from '../components/Paper'
import Title from '../components/Title'

const Resources = ()=>{
    const [loadingCreate, setLoadingCreate] = useState(false)
    const [name, setName] = useState('')
    const [message, showMessage] = useState(false);
    const history = useHistory()
    const {loading, error, data} = useQuery(GET_RESOURCES)
    const [createResource] = useMutation(CREATE_RESOURCE, {update(cache, {data: {createResource}}){
        const {resources} = cache.readQuery({query: GET_RESOURCES})
        cache.writeQuery({query: GET_RESOURCES, data: {resources: [createResource, ...resources]}})
        setLoadingCreate(false)
      }
    })

    const createResourceHandle = () => {
      if(name === ''){
        showMessage(true);
        return;
      }
      setLoadingCreate(true)
      createResource({variables:{name}})
      setName('')
      showMessage(false)
    }

    return (
    <>
      <Title>Ресурсы</Title>
      {message?<Message message="Название не должно быть пустым!" error close={()=>{showMessage(false)}}/>:null}
      <div style={{marginBottom: '20px'}}>
        <InputText value={name} change={setName}/>
        <StyledButton style={{marginLeft: '5px'}}>
          {loadingCreate?<img src={load} style={{height: '18px', verticalAlign: 'middle'}} alt="loading..."/>:
          <div onClick={createResourceHandle}>Создать</div>}
        </StyledButton>
      </div>
      {loading?'Loading':error?'Error':
        data.resources.map((resource)=>(
            <Paper clickble key={resource._id} onClick={() => {history.push(`/resource/${resource._id}`)}}>
                {resource.name}
            </Paper>
        ))
      }  
    </>
)}

export default Resources