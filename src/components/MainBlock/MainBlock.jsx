import { useState } from "react";
import { Avatar, Text, Box, Paper, Image as MantineImage, Modal } from "@mantine/core";
import { useSelector } from "react-redux";
import consultantPhoto from "../../assets/logoConsultant.svg";
import "./MainBlockStyle.scss";

const MainBlock = () => {
  const messages = useSelector((state) => state.chat.messages);

  // Состояние для модального окна
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Функция открытия модального окна с изображением
  const openImageModal = (image) => {
    setSelectedImage(image);
    setOpened(true);
  };

  // Функция закрытия модального окна
  const closeImageModal = () => {
    setOpened(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <div className="status-container">
        <Avatar src={consultantPhoto} className="avatarStatusBlock" />
        <Text className="statusText">Сейчас в сети</Text>
        <Text className="textStatusBottom">Менеджер SkyCross</Text>
      </div>

      <div className="chat-container">
        <Paper radius="md" p="md" shadow="xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.sender === "bot" ? "bot-message" : "user-message"}
            >
              {msg.sender === "bot" && (
                <MantineImage
                  src={consultantPhoto}
                  className="bot-message-avatar"
                  width={40}
                  height={40}
                />
              )}
              <Box
                className={
                  msg.sender === "bot" ? "BoxWithTextBot" : "BoxWithTextUser"
                }
              >
                <Text className={msg.sender === "bot" ? "welcomeTextBot" : ""}>
                  {msg.text}
                </Text>

                {/* Изображения сообщения */}
                {msg.images && msg.images.length > 0 && (
                  <div
                    className={`image-collage ${
                      msg.images.length > 3 ? "more-than-three" : `count-${msg.images.length}`
                    }`}
                  >
                    {msg.images.map((image, index) => (
                      <MantineImage
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="collage-image"
                        radius="sm"
                        withPlaceholder
                        onClick={() => openImageModal(image)} // Открытие модального окна
                        style={{ cursor: "pointer" }} // Указатель на изображение
                      />
                    ))}
                  </div>
                )}
              </Box>
            </div>
          ))}
        </Paper>
      </div>

      {/* Модальное окно для просмотра изображения */}
      <Modal
        opened={opened}
        onClose={closeImageModal} // Закрытие при клике вне изображения
        size="100%"
        overlayOpacity={0.5}
        overlayBlur={2}
        centered
        withCloseButton={false}
        classNames={{
          modal: "custom-modal", // Пользовательский класс для стилизации
        }}
      >
        <Box
          onClick={closeImageModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <MantineImage
            src={selectedImage}
            alt="Full-size image"
            fit="contain"
            onClick={(e) => e.stopPropagation()} // Остановка всплытия события клика на родительский элемент
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default MainBlock;
