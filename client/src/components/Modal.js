import Modal from './styled/Modal'
import Button from './Button'
import { useEffect, useRef} from 'react'
import Message from './Message'

export default ({children, onClose, ActionButton})=>{
    const modal = useRef(null)
    useEffect(()=>{
        window.onclick = function(event) {
            if (event.target == modal.current) {
              onClose();
            }
          }
    },[])
    return (

            <Modal ref={modal}>
                <div className="content">
                    <span className="close-icon" onClick={onClose}>&times;</span>
                    <p>
                        {children}
                    </p>
                    {/* {message?<Message message={message.text} error/>:null} */}
                    <p>
                        {ActionButton}
                        <button className="btn btn-light" onClick={onClose}>Отмена</button>
                    </p>
                </div>
            </Modal>
    )
}