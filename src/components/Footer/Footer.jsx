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
import { sendMessageToServer } from "../../services/chatService";

const Footer = ({ isNavClosed }) => {
  const [message, setMessage] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attachedImages, setAttachedImages] = useState([]);
  const modalRef = useRef(null);
  const clipRef = useRef(null);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const handleSend = async () => {
    if (message.trim() || attachedImages.length > 0) {
      const userMessage = {
        id: Date.now(),
        sender: "user",
        text: message,
        images: attachedImages,
      };

      dispatch(addMessage(userMessage));
      setMessage("");
      setAttachedImages([]);

      try {
        const serverResponse = await sendMessageToServer(message, attachedImages);
        console.log(serverResponse);

        const botMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text: serverResponse.content.message || "Ответ от сервера отсутствует"
        };
        dispatch(addMessage(botMessage));
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      }
    } else {
      console.error("Сообщение пустое");
    }
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAttachImage = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setAttachedImages([...attachedImages, ...imagePreviews]);
    setIsModalOpen(false);
  };

  const handleRemoveImage = (index) => {
    setAttachedImages((prev) => prev.filter((_, i) => i !== index));
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

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;

      if (container.scrollWidth <= container.clientWidth) {
        container.style.overflowX = "hidden";
      } else {
        container.style.overflowX = "auto";
      }
    }
  }, [attachedImages]);


  return (
    <Box component="footer" className={clsx("footer", isNavClosed && "noLeftPadding")} >
    <div className={clsx("inputFile", attachedImages.length > 0 && "inputWithAttachments")}>
      {attachedImages.length > 0 && (
          <div className="attached-images-container" ref={containerRef}>
            {attachedImages.map((image, index) => (
                <div className="attached-image-wrapper" key={index}>
                  <img src={image} alt={`Attached ${index}`} className="attached-image" />
                  <button
                      className="remove-image-button"
                      onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </button>
                </div>
            ))}
          </div>
      )}

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
            className={`sendIcon ${
                message.length > 0 || attachedImages.length > 0 ? "sendIconActive" : ""
            }`}
            variant="transparent"
            onClick={handleSend}
            w={48}
            h={48}
        >
          <Image
              className="sendIconImage"
              w={32}
              src={isInputActive || attachedImages.length > 0 ? sendActive : sendButton}
          />
        </ActionIcon>
      </div>
    </div>

    <span className="inputBottomText">Powered by Utlik.</span>

    {isModalOpen && (
        <div className="modal-content" ref={modalRef}>
          <label className="modal-button">
            Прикрепить фото
            <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleAttachImage}
            />
            <img src={attachFoto} className="button-icon" alt="Attach Foto" />
          </label>
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
  </Box>
);
};

Footer.propTypes = {
  isNavClosed: PropTypes.bool,
};

export default Footer;
