// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import CartB from './CartButton';
import Login from './login';
import Options from './Options';
const botName = 'Bot';

const config : any = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`, {})],
  botName: "Bot Vlixes",
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props : any) => <Options {...props}/>
    },
    {
      widgetName: "Login",
      widgetFunc: () => <Login/>
    },
    {
      widgetName: "Cart",
      widgetFunc: () => <CartB/>
    }
  ],
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