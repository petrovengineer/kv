import styled from 'styled-components'

const StyledTitle = styled.h2`
    color: DARKSLATEBLUE;
`

const Title = ({children})=>{
    return (
        <StyledTitle>
            {children}
        </StyledTitle>
    )
}

export default Title