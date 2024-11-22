import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      id: 1,
      sender: "bot",
      text: "Приветствуем в SkyCross!\n\nПришлите фото обуви, а я сделаю оценку по стоимости 👇",
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
