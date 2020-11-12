import styled from 'styled-components'
import {ReactComponent as Remove} from '../../assets/remove.svg'

const StyledRemove = styled(Remove)`
        height: 14px;
        width: 14px;
        cursor: pointer;
        fill: silver;
        vertical-align: middle;
        margin-left: 10px;
        :hover{
            fill: red;
        }
`

export default StyledRemove