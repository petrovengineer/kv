import { zoomIn, zoomOut } from 'react-animations'
import styled, {keyframes, css} from 'styled-components'

const anim = keyframes`${zoomIn}`
const animOut = keyframes`${zoomOut}`

const Paper = styled.div`
    background-color: white;
    padding: 10px;
    font-size: 14px;
    /* animation: 0.3s ${anim}; */
    /* margin-bottom: 10px; */
    display: flex;
    justify-content: space-between;
    /* margin-right: 10px; */
    /* animation: ${props=>props.out?css`0.3s ${animOut}`:null}; */
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