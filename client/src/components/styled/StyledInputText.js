import styled from 'styled-components'

const StyledInputText = styled.input`
display: inline-block;
-webkit-appearance: none;
-moz-appearance: none;
background: white;
font-size: 14px;
border: 1px solid gray;
border-radius: 0;
padding: 7px;
:focus{
    outline: 1px solid MEDIUMSLATEBLUE;
    /* box-shadow: none; */
    /* outline: none; */
    border: 1px solid MEDIUMSLATEBLUE;
    /* padding: 6px 7px; */

}
`

export default StyledInputText