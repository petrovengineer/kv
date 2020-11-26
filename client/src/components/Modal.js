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
        <div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: 'block', paddingRight: '17px', backgroundColor: 'rgba(0,0,0,0.2)'}}>
            <div class="modal-dialog" style={{top:'100px'}}>
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel"></h4>
                    <button type="button" class="close" onClick={onClose} aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    {children}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" onClick={onClose}>Отмена</button>
                    {ActionButton}
                </div>
                </div>
            </div>
        </div>
            // <Modal ref={modal}>
            //     <div className="content">
            //         <span className="close-icon" onClick={onClose}>&times;</span>
            //         <p>
            //             {children}
            //         </p>
            //         {/* {message?<Message message={message.text} error/>:null} */}
            //         <p>
            //             {ActionButton}
            //             <button className="btn btn-light" onClick={onClose}>Отмена</button>
            //         </p>
            //     </div>
            // </Modal>
    )
}