import { fadeIn } from 'react-animations'
import styled ,{keyframes, css} from 'styled-components'

const anim = keyframes`${fadeIn}`

const Modal = styled.div`
    /* display: none;  */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    display: flex;
    justify-content: center;
    align-items: center;
    /* animation: 0.3s ${anim}; */
    .content{
        background-color: #fefefe;
        padding: 20px;
        border: 1px solid #888;
        animation: 0.3s ${anim};
    }
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
`

export default Modal