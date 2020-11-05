import styled from 'styled-components'

const StyledClose = styled.div`
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 12px;
    width: 18px;
    height: 18px;
    opacity: 0.5;
    :hover {
    opacity: 1;
    }
    :before, :after {
    position: absolute;
    left: 9px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: white;
    }
    :before {
    transform: rotate(45deg);
    }
    :after {
    transform: rotate(-45deg);
    }
`

export default StyledClose