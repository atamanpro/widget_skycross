import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@mantine/core';

const Widget = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef(null); 
  const [position, setPosition] = useState({ top: 0, left: 0 }); 

  const toggleModal = () => {
    if (!opened && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.top - 670, 
        left: buttonRect.left - 250, 
      });
    }
    setOpened((prev) => !prev); 
  };

  const closeModal = () => {
    setOpened(false); 
  };

  return (
    <>
      <div
        ref={buttonRef}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007BFF',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={toggleModal}
      >
        <span style={{ color: 'white', fontSize: '24px' }}>+</span>
      </div>

      <Modal
        opened={opened}
        onClose={closeModal}
        withCloseButton={false}
        size="auto"
        styles={{
          content: {
            position: 'absolute',
            top: `${position.top}px`, 
            left: `${position.left}px`,
            margin: 0, 
            width: '400px',
            height: '600px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {children}
      </Modal>
    </>
  );
};

Widget.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Widget;
