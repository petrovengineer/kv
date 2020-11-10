import { zoomIn } from 'react-animations'
import styled, {keyframes, css} from 'styled-components'

const anim = keyframes`${zoomIn}`

const Paper = styled.div`
    background-color: white;
    padding: 10px;
    font-size: 14px;
    animation: 0.3s ${anim};
    margin-bottom: 10px;
    ${({clickble})=>clickble && css`
        cursor: pointer;
        :hover{
          background-color: MEDIUMSLATEBLUE;
          color: white;
        }
      `
    }   
`

export default Paper