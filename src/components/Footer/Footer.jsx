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
        const serverResponse = await sendMessageToServer(
          message,
          attachedImages
        );
        console.log(serverResponse);

        const botMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text:
            serverResponse.content.message || "Ответ от сервера отсутствует",
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

  const handleTextareaResize = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset the height for recalculation
    textarea.style.height = `${Math.min(textarea.scrollHeight, 190)}px`; // Setting the height
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
    <footer className={clsx("footer", isNavClosed && "noLeftPadding")}>
      <div
        className={clsx(
          "inputFile",
          attachedImages.length > 0 && "inputWithAttachments"
        )}
      >
        {attachedImages.length > 0 && (
          <div className="attached-images-container" ref={containerRef}>
            {attachedImages.map((image, index) => (
              <div className="attached-image-wrapper" key={index}>
                <img
                  src={image}
                  alt={`Attached ${index}`}
                  className="attached-image"
                />
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
          <img
            className="clip-icon"
            src={clipButton}
            alt="Attach"
            onClick={handleToggleModal}
            ref={clipRef}
            style={{ cursor: "pointer", width: "24px", height: "24px" }}
          />
          <textarea
            className="input"
            placeholder="Сообщение"
            rows="1"
            style={{
              height: "auto",
              width: "100%",
              border: "none",
              outline: "none",
              resize: "none",
              // padding: "10px",
              fontSize: "16px",
            }}
            value={message}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTextareaResize(e);
            }}
            onInput={handleTextareaResize}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            className={`sendIcon ${
              message.length > 0 || attachedImages.length > 0
                ? "sendIconActive"
                : ""
            }`}
            onClick={handleSend}
            style={{
              width: "48px",
              height: "48px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <img
              className="sendIconImage"
              src={
                isInputActive || attachedImages.length > 0
                  ? sendActive
                  : sendButton
              }
              alt="Send"
              style={{ width: "32px", height: "32px" }}
            />
          </button>
        </div>
      </div>

      <span className="inputBottomText">
        2024 © Powered by{" "}
        <a
          href="https://www.linkedin.com/company/utlik-co/mycompany/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Utlik.
        </a>
      </span>

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
          <button className="modal-button">
            Сделать снимок
            <img src={cameraIcon} className="button-icon" alt="Camera" />
          </button>
          <button className="modal-button">
            Прикрепить файлы
            <img src={addFileIcon} className="button-icon" alt="Add File" />
          </button>
        </div>
      )}
    </footer>
  );
};

Footer.propTypes = {
  isNavClosed: PropTypes.bool,
};

export default Footer;
