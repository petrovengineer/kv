import styled from 'styled-components'

const StyledTitle = styled.h2`
    color: DARKSLATEBLUE;
    font-weight:800;
`

const Title = ({children})=>{
    return (
        <StyledTitle>
            {children}
        </StyledTitle>
    )
}

export default Title