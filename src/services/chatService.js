import axios from "axios";

export const sendMessageToServer = async (message, images) => {
    try {
        const imagesBase64 = await Promise.all(
            images.map((image) => fetch(image).then((res) => res.blob()).then(blobToBase64))
        );

        const payload = {
            question: message,
            images: imagesBase64,
        };

        const response = await axios.post(
            "https://skycross-widget.replit.app/consultation",
            payload,
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data;
    } catch (error) {
        console.error("Ошибка при отправке сообщения на сервер:", error);
        throw error;
    }
};

const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
