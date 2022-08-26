import React from 'react';
import { useSelector } from 'react-redux';

const MessageParser = ({ children, actions } : any) => {
  const state = useSelector((state : any) => state.auth.isLoggedIn);
  const parse = (message : any) => {
    let messageLower = message.toLowerCase()
    if (messageLower.includes('hello') || messageLower.includes('hi')) {
      return actions.handleHello();
    };
    if(messageLower.includes('help')){
      return actions.handleHelp();
    };
    if(messageLower.includes('settings') && state){
      return actions.hendleSettings();
    };
    if(messageLower.includes('about us')){
      return actions.handleAbout();
    };
    if(messageLower.includes('fine') || messageLower.includes('well') || messageLower.includes('good')){
      return actions.handleFine();
    };
    if(messageLower.includes('cart') && state){
      return actions.handleCart();
    };
    if(messageLower && !state){
      return actions.hanldeLogin();
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