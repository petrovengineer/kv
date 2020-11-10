import styled from 'styled-components'
import StyledInputText from './styled/StyledInputText'

const InputText = ({value, change = ()=>{}, placeholder})=>{
    return(
    <>
        <StyledInputText value={value} placeholder={placeholder} onChange={(e)=>{change(e.target.value)}}></StyledInputText>
    </>
)}

export default InputText;