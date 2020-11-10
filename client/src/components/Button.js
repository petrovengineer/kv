import StyledButton from './styled/StyledButton'
import load from '../assets/loading.gif'

const Button = ({loading, click})=>{
    return (
        <StyledButton onClick={click}>
            {loading?<img src={load} style={{height: '14px', verticalAlign: 'middle'}} alt="loading..."/>:
            'Создать'}
        </StyledButton>
    )
}

export default Button