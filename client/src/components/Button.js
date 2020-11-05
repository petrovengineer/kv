import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: DARKSLATEBLUE;
    border: none;
    color: white;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
    outline: none;
    :hover{
        background-color: MEDIUMSLATEBLUE;
    }
    :active{
        border: none;
    }
`

export default StyledButton;