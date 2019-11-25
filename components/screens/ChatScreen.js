import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import useApi from "../misc/hooks/useApi";
import { quickReplyModel, replyModel } from "../misc/shared/replyModels";

const WatsonIcon = props => (
  <View
    style={{
      backgroundColor: "#4B0082",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18
    }}>
    <Svg fill='#fff' left={"20%"} top={"20%"} width={38} height={36} {...props}>
      <Path d='M16.3 5.9c-2-1.1-4.3-1.5-6.5-.9-.3.1-.5.5-.4.8.1.3.4.5.8.4 1-.3 2.1-.3 3.1-.1-1.6.8-3.4 2.7-4.9 5.2-.5.9-1 1.9-1.3 2.9-.4-.4-.7-.8-1-1.2-.8-1.3-.9-2.4-.5-3.2.5-.8 1.6-1.3 3.2-1.2.3 0 .6-.3.7-.6 0-.3-.3-.6-.6-.7-2.1-.2-3.6.5-4.4 1.8-.7 1.2-.5 2.8.5 4.4.4.7 1 1.3 1.6 2-.1.5-.2 1-.3 1.4V18c-.7-.9-1.2-1.9-1.5-3-.1-.3-.4-.5-.8-.5-.3.1-.5.4-.5.8.6 2.3 2 4.3 4.1 5.5C9 21.6 10.5 22 12 22c3 0 5.9-1.5 7.5-4.3 2.4-4.1.9-9.4-3.2-11.8zm-6.9 6c2.2-3.8 5-5.6 6.2-4.9 3.5 2 4.7 6.6 2.7 10.1-1 1.7-4.8 1.5-8.3-.5-.8-.4-1.5-1-2.1-1.5.5-1 .9-2.1 1.5-3.2zm-1.1 7.9c-.6-.3-.9-1.3-.7-2.7 0-.2.1-.4.1-.6l1.8 1.2c2.1 1.2 4.2 1.8 6 1.8h.6c-2.2 1.5-5.3 1.7-7.8.3zM3.2 7.6L.9 6.3c-.3-.2-.6-.1-.8.2-.2.3-.1.7.2.8l2.3 1.3c.1.1.2.1.3.1.2 0 .4-.1.5-.3.2-.3.1-.7-.2-.8zM12 3.5c.3 0 .6-.3.6-.6V.6c0-.3-.3-.6-.6-.6s-.6.3-.6.6v2.2c0 .4.3.7.6.7zm5 1.3c.1.1.2.1.3.1.2 0 .4-.1.5-.3l1.2-2c.2-.3.1-.7-.2-.8-.3-.2-.7-.1-.9.2l-1.2 2c-.1.2 0 .6.3.8zm-10 0c-.1 0-.2.1-.3.1-.2 0-.4-.1-.5-.3L5 2.6c-.1-.3 0-.7.3-.9.3-.2.7-.1.9.2l1.2 2c0 .3-.1.7-.4.9zm16.9 1.7c-.2-.3-.6-.4-.9-.2l-2.3 1.3c-.3.2-.4.6-.2.9.1.2.3.3.5.3.1 0 .2 0 .3-.1l2.3-1.3c.4-.2.5-.6.3-.9z' />
    </Svg>
  </View>
);
const renderAvatar = () => {
  return <WatsonIcon />;
};

const ChatScreen = () => {
  const [state, setState] = useState({ messages: [] });
  const { getWatsonMessage } = useApi();

  const sendToWatson = async msg => {
    const payload = {
      text: msg,
      context: {}
    };
    let res = await getWatsonMessage(payload);
    let text = "";
    let quickReplies = [];

    res.output.generic.forEach(item => {
      text = item.text || text;
      quickReplies =
        item.options &&
        item.options.map(o => {
          return {
            title: o.label,
            value: o.value.input.text
          };
        });
    });

    if (quickReplies && quickReplies.length > 0) {
      return quickReplyModel(text, quickReplies);
    }
    const sender = res.sender === "watson" ? "Watson" : "User";
    return replyModel(text, sender);
  };

  useEffect(() => {
    sendToWatson("hi").then(reply => {
      setState({
        messages: [reply]
      });
    });
  }, []);

  const handleSend = (messages = []) => {
    setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    sendToWatson(messages[0].text).then(reply => {
      setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [reply])
      }));
    });
  };

  const handleQuickReply = (quickReply = []) => {
    setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [
        replyModel(quickReply[0].title)
      ])
    }));

    sendToWatson(quickReply[0].value).then(reply => {
      setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [reply])
      }));
    });
  };

  return (
    <GiftedChat
      messages={state.messages}
      onSend={messages => handleSend(messages)}
      renderAvatar={renderAvatar}
      onQuickReply={reply => handleQuickReply(reply)}
      user={{
        _id: 1
      }}
    />
  );
};

export default ChatScreen;
