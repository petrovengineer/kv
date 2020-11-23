import styled from 'styled-components'
import {
    Link
  } from "react-router-dom";

const StyledDrawer = styled.div`
    position: fixed;
    background-color: #463973;
    width: 300px;
    height: 100%;
`

const StyledDrawerLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 10px;
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
                <StyledDrawerLink to="/">Ресурсы</StyledDrawerLink>
                <StyledDrawerLink to="/tranches">Поступления</StyledDrawerLink>
                <StyledDrawerLink to="/wastes">Затраты</StyledDrawerLink>
                <StyledDrawerLink to="/cashwastes">Затраты (нал)</StyledDrawerLink>
                <StyledDrawerLink to="/users">Пользователи</StyledDrawerLink>
                <StyledDrawerLink to="/payers">Контрагенты</StyledDrawerLink>
            </div>
        </StyledDrawer>
    )
}

export default Drawer;