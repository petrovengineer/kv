import {useMutation} from '@apollo/client'
import {DELETE_TRANCHE, GET_TRANCHES} from '../../queries/Tranche'
import Button from '../Button'

export default ({deletePayload, setDeletePayload, setMessage, filter})=>{
    const {trancheId, resourceId = null, index} = deletePayload;
    const [deleteTranche, {loading}] = useMutation(DELETE_TRANCHE, 
        {
            refetchQueries:[{query: GET_TRANCHES, variables:{filter:{resource:{_id: resourceId}}}}],
            update(cache, {data: {deleteTranche}}){
                if(deleteTranche){
                    const {tranches} = cache.readQuery({query: GET_TRANCHES, variables:{filter}})
                    const newTranches = [...tranches];
                    newTranches.splice(index, 1);
                    cache.evict({fieldName: "tranches",broadcast: false,});
                    cache.writeQuery({query: GET_TRANCHES, variables:{filter}, data: {tranches: newTranches}})
                    setDeletePayload(null)
                }
                else{
                    
                }
            },
            onError(){
                setDeletePayload(null)
                setMessage({text:'Ошибка сервера!', error: true})
            }
    })

    function handleDeleteTranche(){
        deleteTranche({variables:{_id: trancheId}})
    }

    return <Button danger onClick={handleDeleteTranche} loading={loading}>Удалить</Button>
}