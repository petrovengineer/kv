import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: ${(props)=>(props.danger?'#FF5733':props.success?'limegreen':'DARKSLATEBLUE')};
    border: none;
    color: white;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    margin-right: 10px;
    :hover{
        background-color: ${(props)=>(props.danger?'SALMON':props.success?'limegreen':'MEDIUMSLATEBLUE')};
    }
    :active{
        border: none;
    }
`

export default StyledButton;