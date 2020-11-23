import { useHistory } from 'react-router-dom'
import Header from './styled/Header'

export default ()=>{
  const history = useHistory()
  function handleExit(){
      window.localStorage.removeItem('token')
      history.push('/login')
    }
    return (
    <Header>
      <header class="header black-bg">
          <div class="sidebar-toggle-box">
            <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
          </div>
            <a class="btn btn-primary" style={{marginTop:'15px', float:'right'}}
              onClick={handleExit}
            >Выйти</a>
        </header>
      </Header>
    )
}