import Modal from '@mui/material/Modal';
import {Add} from 'iconsax-react';

const CustomModal = ({...props}) => {
  const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: props.type === 'small' ? 440 : props.type === 'large' ? 640 : 800,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 24,
    position: 'relative',
    wordBreak: 'break-word',
  };

  return (
    <Modal open={props.isOpen}>
      <div style={style}>
        <div>
          <div className="text-[24px] font-semibold text-[#101828]">{props.title}</div>
          <button className="absolute right-[5px] top-[5px]" onClick={props.onClose}>
            <Add size="20" color="#000" className="rotate-45" />
          </button>
        </div>
        {props.children}
      </div>
    </Modal>
  );
};

export default CustomModal;
