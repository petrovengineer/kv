import styled from 'styled-components'
import {
    Link
  } from "react-router-dom";

const StyledDrawer = styled.div`
    position: fixed;
    background-color: DARKSLATEBLUE;
    width: 300px;
    height: 100%;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    display: block;
    :hover{
        color: AQUAMARINE;
    }
`

const Drawer = ()=>{
    return (
        <StyledDrawer>
            <div style={{margin:"20px"}}>
                <StyledLink to="/">Ресурсы</StyledLink>
                <StyledLink to="/tranches">Поступления</StyledLink>
                <StyledLink to="/wastes">Затраты</StyledLink>
                <StyledLink to="/cashwastes">Затраты (нал)</StyledLink>
                <StyledLink to="/users">Пользователи</StyledLink>
                <StyledLink to="/payers">Контрагенты</StyledLink>
            </div>
        </StyledDrawer>
    )
}

export default Drawer;