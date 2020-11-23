import {useHistory} from 'react-router-dom'
import React, { useRef, useState } from 'react'


// const Public = () => <h3>Public</h3>
// const Protected = () => <h3>Protected</h3>

const Login = ()=> {
    const history = useHistory()
    const email = useRef()
    const password = useRef()
    const [auth, setAuth] = useState(false)
    async function handleLogin(e){
      let user = {
        // email: email.current.value,
        // password: password.current.value
        email: 'petrovengineer@gmail.com',
        password:'1212'
      };
      try{
        let response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(user)
        });      
        let result = await response.json();
        if(result && result.token){
          window.localStorage.setItem('token', result.token)
          history.push('/')
        }
      }
      catch(e){
        console.log(e)
      }
    }
    return (
      <div className="container">
      <div className="form-login">
        <h2 className="form-login-heading">Вход</h2>
        <div className="login-wrap">
          <input ref={email} type="text" className="form-control" placeholder="Email" autoFocus=""/>
          <br/>
          <input ref={password} type="password" className="form-control" placeholder="Пароль"/>
          <br/>
          <button className="btn btn-theme btn-block" onClick={handleLogin}><i className="fa fa-lock"></i> Войти</button>
        </div>
      </div>
      </div>
    )
}

export default Login