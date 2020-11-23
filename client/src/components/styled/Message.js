import styled from 'styled-components'
import Paper from './Paper'

const StyledMessage = styled(Paper)`
    background-color: ${(props)=>(props.error?'ORANGERED':props.success?'green':'blue')};
    color: white;
    position: relative;
    font-weight: 600;
`
export default StyledMessage