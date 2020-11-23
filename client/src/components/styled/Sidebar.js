import styled from 'styled-components'

export default styled.div`
    #sidebar {
        width: 210px;
        height: 100%;
        position: fixed;
        background: #2f323a;
    }

    #sidebar h5 {
        color: #f2f2f2;
        font-weight: 700;
    }

    #sidebar ul li {
        position: relative;
    }

    #sidebar .sub-menu > .sub li  {
        padding-left: 32px;
    }

    #sidebar .sub-menu > .sub li:last-child {
        padding-bottom: 10px;
    }

    /*LEFT NAVIGATION ICON*/
    .dcjq-icon {
        height:17px;
        width:17px;
        display:inline-block;
        background: url("../img/nav-expand.png") no-repeat top;
        border-radius:3px;
        -moz-border-radius:3px;
        -webkit-border-radius:3px;
        position:absolute;
        right:10px;
        top:15px;
    }
    .active .dcjq-icon {
        background: url("../img/nav-expand.png") no-repeat bottom;
        border-radius:3px;
        -moz-border-radius:3px;
        -webkit-border-radius:3px;
    }
    /*---*/

    .nav-collapse.collapse {
        display: inline;
    }

    ul.sidebar-menu , ul.sidebar-menu li ul.sub{
        margin: -2px 0 0;
        padding: 0;
    }

    ul.sidebar-menu {
        margin-top: 75px;
    }

    #sidebar > ul > li > ul.sub {
        display: none;
    }

    #sidebar > ul > li.active > ul.sub, #sidebar > ul > li > ul.sub > li > a {
        display: block;
    }

    ul.sidebar-menu li ul.sub li{
        background: #2f323a;
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
    }

    ul.sidebar-menu li ul.sub li:last-child{
        border-radius: 0 0 4px 4px;
        -webkit-border-radius: 0 0 4px 4px;
    }

    ul.sidebar-menu li ul.sub li a {
        font-size: 12px;
        padding: 6px 0;
        line-height: 35px;
        height: 35px;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        transition: all 0.3s ease;
        color: #aeb2b7;
    }

    ul.sidebar-menu li ul.sub li a:hover {
        color: white;
        background: transparent;
    }

    ul.sidebar-menu li ul.sub li.active a {
        color: #4ECDC4;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        transition: all 0.3s ease;
        display: block;
    }

    ul.sidebar-menu li{
        /*line-height: 20px !important;*/
        margin-bottom: 5px;
        margin-left:10px;
        margin-right:10px;
    }

    ul.sidebar-menu li.sub-menu{
        line-height: 15px;
    }

    ul.sidebar-menu li a span{
        display: inline-block;
    }

    ul.sidebar-menu li a{
        color: #aeb2b7;
        text-decoration: none;
        display: block;
        padding: 15px 0 15px 10px;
        font-size: 12px;
        outline: none;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        transition: all 0.3s ease;
    }

    ul.sidebar-menu li a.active, ul.sidebar-menu li a:hover, ul.sidebar-menu li a:focus {
        background: #4ECDC4;
        color: #fff;
        display: block;

        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        transition: all 0.3s ease;
    }


    ul.sidebar-menu li a i {
        font-size: 15px;
        padding-right: 6px;
    }

    ul.sidebar-menu li a:hover i, ul.sidebar-menu li a:focus i {
        color: #fff;
    }

    ul.sidebar-menu li a.active i {
        color: #fff;
    }


    .mail-info, .mail-info:hover {
        margin: -3px 6px 0 0;
        font-size: 11px;
    }
    ul.sub li a:focus{
        background: none;
    }
`