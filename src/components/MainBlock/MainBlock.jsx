import { Avatar, Text, Box, Paper, Image } from "@mantine/core";
import consultantPhoto from "../../assets/logoConsultant.svg";
import "./MainBlockStyle.scss";

const MainBlock = () => {
  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      {/* Верхний блок с фото консультанта и статусом */}
      <div className="status-container">
        <Avatar src={consultantPhoto} className="avatarStatusBlock" />
        <Text className="statusText">Сейчас в сети</Text>
        <Text className="textStatusBottom">Менеджер SkyCross</Text>
      </div>

      {/* Блок чата с приветственным сообщением от бота */}
      <div className="chat-container">
        <Paper>
          <div className="bot-message">
            <Image
              src={consultantPhoto}
              className="bot-message-avatar"
            />
            <Box className="BoxWithTextBot">
              <Text className="welcomeTextBot">
                Приветствуем в SkyCross!
                <br />
                <br />
                Пришлите фото обуви, а я сделаю оценку по стоимости 👇
              </Text>
            </Box>
          </div>
        </Paper>
      </div>
    </Box>
  );
};

export default MainBlock;
