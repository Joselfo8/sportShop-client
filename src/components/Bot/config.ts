// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
const botName = 'Bot';

const config : any = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`, {})],
  botName: "Bot Vlixes",
  state: {
    myCustomProperty: 'Bikershorts',
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: 'black',
    },
    chatButton: {
      backgroundColor: 'black',
    },
  },
};

export default config;