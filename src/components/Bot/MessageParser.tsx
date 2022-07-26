// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions } : any) => {
  const parse = (message : any) => {
    let messageLower = message.toLowerCase()
    if (messageLower.includes('hello') || messageLower.includes('hi')) {
      return actions.handleHello();
    };
    if(messageLower.includes('help')){
      return actions.handleHelp();
    };
    if(messageLower.includes('settings')){
      return actions.hendleSettings();
    }else{
      return actions.handleSome();
    };
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;