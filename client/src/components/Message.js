import styled, {keyframes} from 'styled-components'
import {zoomIn} from 'react-animations'
import StyledClose from './Close'

const anim = keyframes`${zoomIn}`

const StyledMessage = styled.div`
    background-color: ${(props)=>(props.error?'ORANGERED':props.success?'green':'blue')};
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    position: relative;
    animation: 0.3s ${anim};
`

const Error = ({message, error=false, info=false, success=false, close})=>{
    return (
        <>
            <StyledMessage 
                className="close" 
                error={error} 
                info={info} 
                success={success} 
                style={{}}
            >
                    {message}
                    <StyledClose onClick={close}/>
            </StyledMessage>
        </>
    )
}

export default Error