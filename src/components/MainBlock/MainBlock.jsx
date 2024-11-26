import { Avatar, Text, Box, Paper, Image as MantineImage } from "@mantine/core";
import { useSelector } from "react-redux";
import consultantPhoto from "../../assets/logoConsultant.svg";
import "./MainBlockStyle.scss";

const MainBlock = () => {
    const messages = useSelector((state) => state.chat.messages);

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
                                {/* Текст сообщения */}
                                <Text className={msg.sender === "bot" ? "welcomeTextBot" : ""}>
                                    {msg.text}
                                </Text>

                                {/* Изображения сообщения */}
                                {msg.images && msg.images.length > 0 && (<div
                                        className={`image-collage ${msg.images.length > 3 ? 'more-than-three' : `count-${msg.images.length}`}`}
                                    >
                                        {msg.images.map((image, index) => (
                                            <MantineImage
                                                key={index}
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                className="collage-image"
                                                radius="sm"
                                                withPlaceholder
                                            />
                                        ))}
                                    </div>

                                )}
                            </Box>
                        </div>
                    ))}
                </Paper>
            </div>
        </Box>
    );
};

export default MainBlock;
