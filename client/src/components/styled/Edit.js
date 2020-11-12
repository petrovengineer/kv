import styled from 'styled-components'
import {ReactComponent as Edit} from '../../assets/edit.svg'

const StyledEdit = styled(Edit)`
        height: 14px;
        width: 14px;
        cursor: pointer;
        fill: silver;
        vertical-align: middle;
        margin-left: 10px;
        :hover{
            fill: limegreen;
        }
`

export default StyledEdit