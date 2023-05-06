import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-modal';
import './Title.css';

const Popup = forwardRef((props, ref) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        setModalIsOpen(value) {
            setModalIsOpen(value);
        }
    }));

    function closeModal() {
        setModalIsOpen(false);
    }

    const popupWindow = {
        content : {
          width: '50%',
          height: '50%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
    };

    const text = {
        content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100vh'
        }
    }

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={popupWindow}>
            <button onClick={closeModal}>Close Modal</button>
            {props.response && (
                <>
                    <p style={text}>{props.response.result}</p>
                </>
            )}
        </Modal>
    )
})

export default Popup