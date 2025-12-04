import { useEffect, useRef, useState } from "react";
import NavIcon from "../../../../components/icons/NavIcon";
import { useAppSelector } from "../../../../types/reduxHooks";
import styles from "./message.module.scss";
import { socket } from "../../../../socket/socket";
const Message = () => {
  const userProfile = useAppSelector((state) => state.userSlice.profile);
  const [input, setInput] = useState<string>("");
  const messages = useAppSelector((state) => state.userSlice.messages);
  const userData = useAppSelector((state) => state.userSlice.userProfile);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !userProfile.userId) return;

    socket.emit("private_message", {
      to: userProfile.userId,
      text: input,
    });

    setInput("");
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.messageWrapper}>
      <div className={styles.headerSection}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img
              src={`http://localhost:5002${userProfile.picture}`}
              alt="Icon"
              className={styles.image}
            />
          </div>

          <h4 className={styles.name}>{userProfile.name}</h4>
        </div>
        <div className={styles.rightSide}>
          <NavIcon name="IoIosSearch" />
        </div>
      </div>

      <div className={styles.chatSection} ref={chatEndRef}>
        {messages?.map((msg) => {
          const isMe = msg.sender === userData?.userId;

          return (
            <div
              key={msg._id}
              className={`${styles.messageRow} ${
                isMe ? styles.myMessage : styles.theirMessage
              }`}
            >
              <div className={styles.messageBubble}>
                {msg.text}
                <span className={styles.time}>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.conversationSection}>
        <form className={styles.container} onSubmit={(e) => sendMessage(e)}>
          <div className={styles.attachment}>
            <NavIcon name="IoAdd" />
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Type a message"
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button className={styles.speech} type="submit">
            <NavIcon name="IoSend" size={22} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
