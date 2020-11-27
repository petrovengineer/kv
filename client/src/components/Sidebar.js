import Sidebar from './styled/Sidebar'
import photo from '../assets/img/ui-sam.jpg'
import { useState } from 'react'
import {Link, useLocation } from "react-router-dom";

export default ()=>{
    const [opened, setOpened] = useState(['fin'])
    const {pathname} = useLocation();
    function handleOpen(item){
        let index = opened.indexOf(item);
        if(index===-1){
            setOpened([...opened, item])
        }else{
            const newOpened = [...opened];
            newOpened.splice(index, 1)
            setOpened(newOpened)
        }
    }
    return (
        <Sidebar>
            <div id="sidebar">
                <ul className="sidebar-menu">
                    <p className="centered">
                        <a href="">
                            <img className="rounded-circle" src={photo} width="80"></img>
                        </a>
                    </p>
                    <h5 className="centered">Sam Soffes</h5>
                    <li className="sub-menu mt">
                        <a onClick={()=>{handleOpen('fin')}} className="mt">Финансы</a>
                        <ul className="sub" style={{display: opened.indexOf('fin')===-1?'none':'block'}}>
                            <li className={pathname==='/'? 'active':''}>
                                <Link to="/">Ресурсы</Link>
                            </li>
                            <li className={pathname==='/tranches'?'active':''}>
                                <Link to="/tranches">Поступления</Link>
                            </li>
                            <li className={pathname==='/wastes'?'active':''}>
                                <Link to="/wastes">Затраты</Link>
                            </li>
                            <li className={pathname==='/cashwastes'?'active':''}>
                                <Link to="/cashwastes">Затраты (нал)</Link>
                            </li>
                            <li className={pathname==='/users'?'active':''}>
                                <Link to="/users">Пользователи</Link>
                            </li>
                            <li className={pathname==='/payers'?'active':''}>
                                <Link to="/payers">Контрагенты</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </Sidebar>
    )
}