import Paper from '../components/Paper'
import Title from '../components/Title'
import { useQuery, useMutation } from '@apollo/client'
import {GET_TRANCHES} from '../queries/Tranche'

const Tranches = ()=>{
    const {loading, error, data} = useQuery(GET_TRANCHES)
    return (
    <>
    <Title>Поступления</Title>
    {loading?'Loading':error?'Error':
        data.tranches.map((tranche)=>(
            <Paper key={tranche._id}>
                {tranche.amount}
            </Paper>
        ))
    }  
    </>
)}



export default Tranches