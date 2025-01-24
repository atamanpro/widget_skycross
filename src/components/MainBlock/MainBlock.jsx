import { useState } from "react";
import { useSelector } from "react-redux";
import consultantPhoto from "../../assets/logoConsultant.svg";
import "./MainBlockStyle.scss";

const MainBlock = () => {
  const messages = useSelector((state) => state.chat.messages);

  // State for modal window
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open a modal window with an image
  const openImageModal = (image) => {
    setSelectedImage(image);
    setOpened(true);
  };

  // Modal window close function
  const closeImageModal = () => {
    setOpened(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="status-container">
        <img src={consultantPhoto} className="avatarStatusBlock" alt="Consultant" />
        <p className="statusText">Сейчас в сети</p>
        <p className="textStatusBottom">Менеджер SkyCross</p>
      </div>

      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg) => (
            <div key={msg.id} className={msg.sender === "bot" ? "bot-message" : "user-message"}>
              {msg.sender === "bot" && (
                <img src={consultantPhoto} className="bot-message-avatar" width={40} height={40} alt="Bot" />
              )}
              <div className={msg.sender === "bot" ? "BoxWithTextBot" : "BoxWithTextUser"}>
                <p className={msg.sender === "bot" ? "welcomeTextBot" : ""}>{msg.text}</p>

                {/* Post images */}
                {msg.images && msg.images.length > 0 && (
                  <div
                    className={`image-collage ${msg.images.length > 3 ? "more-than-three" : `count-${msg.images.length}`}`}
                  >
                    {msg.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="collage-image"
                        style={{ cursor: "pointer", borderRadius: "5px" }}
                        onClick={() => openImageModal(image)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal window for viewing an image */}
      {opened && (
        <div className="modal-overlay" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full-size" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainBlock;