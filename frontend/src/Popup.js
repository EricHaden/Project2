import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-modal';
import './Title.css';

const Popup = forwardRef((props, ref) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // to control the open of the pop up window through outside request
    useImperativeHandle(ref, () => ({
        setModalIsOpen(value) {
            setModalIsOpen(value);
        }
    }));

    // function to close the pop up window
    function closeModal() {
        setModalIsOpen(false);
    }

    // style class of the pop window
    const popupWindow = {
        content : {
            width: '50%',
            height: '50%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '25px',
            overflow: 'hidden',
            background: 'white',
        }
    };

    // css class of the text block in the pop up window
    const text = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      };

    return (
        // a pop up window block,
        // it is open when modalIsopen is true and close when closeModal is requested
        // css style use popupWindow css class
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={popupWindow}>
            <button onClick={closeModal}>X</button>
            {/* show the response from the backend if existed */}
            {props.response && (
                <div style={text}>
                    {/* in line css: set fontSize and bold */}
                    <p style={{fontSize: '5vw', fontWeight: 'bold'}}>{props.response.result}</p>
                </div>
            )}
        </Modal>
    )
})

export default Popup