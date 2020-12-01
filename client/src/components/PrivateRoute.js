import {Route, Redirect} from "react-router-dom"
import { useQuery} from '@apollo/client'
import {AUTH} from '../queries/User'
import { useEffect, useState } from "react"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const {loading, error, data} = useQuery(AUTH,{
      onError(error){
        console.log(error);
      }
    })
    useEffect(()=>{
      // console.log("ER", data)
    }, [data])
    return(
    <Route {...rest} render={(props) => (
        loading?<Loading/>:error?<Redirect to='/login'/>:
          data.auth? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )}

export default PrivateRoute

const Loading = ()=>(
  <h3>Loading...</h3>
)

const Error = ()=>(
  <h3>Error!</h3>
)