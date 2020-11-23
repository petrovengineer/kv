import StyledButton from './styled/StyledButton'
import load from '../assets/loading.gif'
import { useEffect, useRef, useState } from 'react'

const Button = ({loading, onClick, children, danger, success})=>{
    const btn = useRef(null)
    const [width, setWidth] = useState(0)
    useEffect(()=>{
        setWidth(btn.current.offsetWidth)
    },[])
    return (
        <button 
            ref={btn}
            onClick={onClick} 
            type="button" 
            className={['btn', danger?'btn-danger':success?'btn-success':'btn-primary'].join(' ')} style={{marginRight:'10px'}}>
            {loading?
                <div style={{width:width-24}}>
                    <img src={load} style={{height: '14px', verticalAlign: 'middle'}} alt="loading..."/>
                </div>
                :children}
        </button>
    )
}

export default Button