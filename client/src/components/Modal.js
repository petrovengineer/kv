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
        <div className="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: 'block', paddingRight: '17px', backgroundColor: 'rgba(0,0,0,0.2)'}}>
            <div className="modal-dialog" style={{top:'100px'}}>
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="myModalLabel"></h4>
                    <button type="button" className="close" onClick={onClose} aria-hidden="true">×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={onClose}>Отмена</button>
                    {ActionButton}
                </div>
                </div>
            </div>
        </div>
    )
}