import { ActionIcon, Box, Image, Textarea } from "@mantine/core";
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import clipButton from "../../assets/clipButton.svg";
import sendButton from "../../assets/sendButton.svg";
import "./FooterStyle.scss"; // Подключаем стили напрямую

const Footer = ({ isNavClosed }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Отправленное сообщение:", message);
      setMessage(""); // Очищаем поле после отправки
    } else {
      console.error("Сообщение пустое или идентификатор чата отсутствует");
    }
  };

  const isTyping = message.length > 0;

  return (
    <Box component="footer" className={clsx("footer", isNavClosed && "noLeftPadding")}>
  <div className="inputWrapper">
    {/* Иконка прикрепления */}
    <Image className="clip-icon" w={24} h={24} src={clipButton} />
    <Textarea
      classNames={{ input: "input" }}
      style={{ width: '100%' }}
      placeholder="Сообщение"
      autosize
      variant="unstyled"
      radius="xl"
      size="lg"
      minRows={1}
      maxRows={8}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
    />
    {/* Иконка отправки сообщения */}
    <ActionIcon
      className={`sendIcon ${isTyping ? "sendIconActive" : ""}`}
      variant="transparent"
      onClick={handleSend}
      w={48}
      h={48}
    >
      <Image className={isTyping ? "sendIconActive" : ""} w={32} src={sendButton} />
    </ActionIcon>
  </div>
</Box>
  );
};

Footer.propTypes = {
  isNavClosed: PropTypes.bool,
};

export default Footer;
