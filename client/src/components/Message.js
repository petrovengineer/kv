
import StyledClose from './styled/Close'
import StyledMessage from './styled/Message'

const Message = ({message='Ошибка сервера! Обратитесь к администратору.', error=false, info=false, success=false, close})=>{
    return (
        <div className=""
        className={['alert alert-dismissable', error?'alert-danger':success?'alert-success':'alert-info'].join(' ')}>
            {close?
                <button onClick={close} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
            :null}
            {message} 
        </div>
    )
}

export default Message