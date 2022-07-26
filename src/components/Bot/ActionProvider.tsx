// in ActionProvider.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const ActionProvider = ({ createChatBotMessage, setState, children } : any) => {
  const name = useSelector((state : any) => state.auth.auth.user.name);
  const name1 = name
  const handleHello = () => {
    const botMessage = createChatBotMessage(`Hello ${name1}. Nice to meet you.`);

    setState((prev : any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleHelp = () => {
    const botMessage = createChatBotMessage('Need help? You can contact us by email vlixes.international@gmail.com or 0800-XXX-XXX!');
    setState((prev : any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const hendleSettings = () => {
    const botMessage = createChatBotMessage('You need go settings?', <button></button>);
    setState((prev : any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleSome = () => {
    const botMessage = createChatBotMessage('How are you?');
    setState((prev : any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleHelp,
            handleSome,
            hendleSettings,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;