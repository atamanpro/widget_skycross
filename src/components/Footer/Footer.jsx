import { ActionIcon, Box, Image, Textarea, Button } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { addMessage } from "../../slices/chatSlice.js";
import clipButton from "../../assets/clipButton.svg";
import sendButton from "../../assets/sendButton.svg";
import sendActive from "../../assets/SendActive.svg";
import attachFoto from "../../assets/AttachFoto.svg";
import cameraIcon from "../../assets/Camera.svg";
import addFileIcon from "../../assets/AddFile.svg";
import "./FooterStyle.scss";

const Footer = ({ isNavClosed }) => {
  const [message, setMessage] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);
  const clipRef = useRef(null);
  const dispatch = useDispatch();

  const handleSend = () => {
    if (message.trim()) {
      dispatch(
        addMessage({
          id: Date.now(),
          sender: "user",
          text: message,
        })
      );
      setMessage("");
    } else {
      console.error("Сообщение пустое");
    }
  };

  const isTyping = message.length > 0;

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen); 
    if (!isModalOpen && clipRef.current) {
      const rect = clipRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top - 125, 
        left: rect.left, 
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !clipRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <div
          className="modal-content"
          style={{
            position: "absolute",
            top: modalPosition.top,
            left: modalPosition.left,
          }}
          ref={modalRef}
        >
          <Button fullWidth variant="subtle" className="modal-button">
            Прикрепить фото
            <img src={attachFoto} className="button-icon" alt="Attach Foto" />
          </Button>
          <Button fullWidth variant="subtle" className="modal-button">
            Сделать снимок
            <img src={cameraIcon} className="button-icon" alt="Camera" />
          </Button>
          <Button fullWidth variant="subtle" className="modal-button">
            Прикрепить файлы
            <img src={addFileIcon} className="button-icon" alt="Add File" />
          </Button>
        </div>
      )}
      <Box
        component="footer"
        className={clsx("footer", isNavClosed && "noLeftPadding")}
      >
        <div className="inputWrapper">
          <Image
            className="clip-icon"
            w={24}
            h={24}
            src={clipButton}
            onClick={handleToggleModal}
            ref={clipRef}
            style={{ cursor: "pointer" }}
          />
          <Textarea
            classNames={{ input: "input" }}
            style={{ width: "100%" }}
            placeholder="Сообщение"
            autosize
            variant="unstyled"
            radius="xl"
            size="lg"
            minRows={1}
            maxRows={8}
            value={message}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <ActionIcon
            className={`sendIcon ${isTyping ? "sendIconActive" : ""}`}
            variant="transparent"
            onClick={handleSend}
            w={48}
            h={48}
          >
            <Image
              className="sendIconImage"
              w={32}
              src={isInputActive ? sendActive : sendButton}
            />
          </ActionIcon>
        </div>
      </Box>
    </>
  );
};

Footer.propTypes = {
  isNavClosed: PropTypes.bool,
};

export default Footer;
