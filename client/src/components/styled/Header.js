import styled from 'styled-components'

const StyledHeader = styled.div`
    .header, .footer {
        min-height: 60px;
        padding: 0 15px;
    }

    .header {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 1002;
    }

    .black-bg {
        background: #22242a;
        border-bottom: 1px solid #393d46;
    }
    .sidebar-toggle-box {
        float: left;
        padding-right: 15px;
        margin-top: 20px;
    }

    .sidebar-toggle-box .fa-bars {
        cursor: pointer;
        display: inline-block;
        font-size: 20px;
    }


    .sidebar-closed > #sidebar > ul {
        display: none;
    }

    .sidebar-closed #main-content {
        margin-left: 0px;
    }

    .sidebar-closed #sidebar {
        margin-left: -180px;
    }

`

export default StyledHeader