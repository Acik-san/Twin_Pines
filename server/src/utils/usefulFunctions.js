module.exports.prepareMessage = (message, forwardedFromUserNameArr) => {
  const matchedName = forwardedFromUserNameArr.find(
    forwardedFrom => forwardedFrom.id === message?.forwardedFrom?.sender
  );
  if (matchedName) {
    message.forwardedFrom = {
      ...message.forwardedFrom,
      userName: matchedName.userName,
    };
  }
  return message;
};

module.exports.prepareForwardedFromMessages = (
  messages,
  forwardedFromUserNameArr
) =>
  messages.map(message => {
    message = module.exports.prepareMessage(message, forwardedFromUserNameArr);
    if (message.repliedMessage) {
      message.repliedMessage = module.exports.prepareMessage(
        message.repliedMessage,
        forwardedFromUserNameArr
      );
    }
    return message;
  });
