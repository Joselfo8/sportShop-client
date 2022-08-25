import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Actions
import { getUser } from "redux/action/user";

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  // Store
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const name = useSelector((state: any) => state.user.name);

  useEffect(() => {
    if (!name && isLoggedIn) dispatch(getUser());
  }, [isLoggedIn, name, dispatch]);

  const handleHello = () => {
    const botMessage = createChatBotMessage(
      `Hello ${name ? name : "User"}. Nice to meet you.`
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const hanldeLogin = () => {
    const botMessage = createChatBotMessage(
      "Hello guest. Nice to meet you. I see that you are not logged. To give you a better experience, log in here",
      {
        widget: "Login",
      }
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleHelp = () => {
    const botMessage = createChatBotMessage(
      "Need help? You can contact us by email vlixes.international@gmail.com or 0800-XXX-XXX!"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const hendleSettings = () => {
    const botMessage = createChatBotMessage("You need go settings?", {
      widget: "options",
    });
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSome = () => {
    const botMessage = createChatBotMessage("How are you?");
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleFine = () => {
    const botMessage = createChatBotMessage("Im glad! What do you need?");
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleCart = () => {
    const botMessage = createChatBotMessage("You need go to Cart?", {
      widget: "Cart",
    });
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleAbout = () => {
    const botMessage = createChatBotMessage(
      "We are a team of eight people who ventured into a group project which is to create an e-commerce page for the Henry Academy."
    );
    setState((prev: any) => ({
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
            hanldeLogin,
            handleAbout,
            handleFine,
            handleCart,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
