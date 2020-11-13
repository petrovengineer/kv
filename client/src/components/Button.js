import StyledButton from './styled/StyledButton'
import load from '../assets/loading.gif'

const Button = ({loading, onClick, children, danger, success})=>{
    return (
        <StyledButton onClick={onClick} danger={danger} success={success}>
            {loading?<img src={load} style={{height: '14px', verticalAlign: 'middle'}} alt="loading..."/>:children}
        </StyledButton>
    )
}

export default Button