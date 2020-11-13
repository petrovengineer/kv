import Modal from './styled/Modal'
import Button from './Button'
import { useState, useRef } from 'react'

export default ({children, onClose, onAgree, onCancel, onDelete})=>{
    const modal = useRef(null);
    useState(()=>{
        window.onclick = function(event) {
            if (event.target == modal.current) {
              onClose();
            }
          }
    },[])
    return (
        <Modal ref={modal}>
            <div className="content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>
                    {children}
                </p>
                <p>
                    {onDelete && <Button danger onClick={onDelete}>Удалить</Button>}
                    {onAgree && <Button success onClick={onAgree}>Да</Button>}
                    {onCancel && <Button onClick={onCancel}>Нет</Button>}
                </p>
            </div>
        </Modal>
    )
}