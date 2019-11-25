export const quickReplyModel = (text = "", quickreplies = []) => {
  return {
    _id: Math.round(Math.random() * 100000),
    text: text,
    createdAt: new Date(),
    quickReplies: {
      type: "radio", // or 'checkbox',
      keepIt: true,
      values: quickreplies
    },
    user: {
      _id: 2,
      name: "Watson"
    }
  };
};

export const replyModel = (text = "", sender = "User") => {
  return {
    _id: Math.round(Math.random() * 100000),
    text: text,
    createdAt: new Date(),
    user: {
      _id: sender === "User" ? 1 : 2,
      name: sender
    }
  };
};

/* quickreplies [
        {
          title: "😋 Yes",
          value: "yes"
        },
        {
          title: "📷 Yes, let me show you with a picture!",
          value: "yes_picture"
        },
        {
          title: "😞 Nope. What?",
          value: "no"
        }
      ]
    },*/
