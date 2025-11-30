import NavIcon from "../../components/icons/NavIcon";
import styles from "./chat.module.scss";
import Conversation from "./components/conversation/Conversation";
import SelectFilter from "./components/filters/SelectFilter";
import ChatSearch from "./components/search/ChatSearch";

const Chat = () => {
  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <h1>VibeChat</h1>
        <div>
          <NavIcon name="RiChatNewLine" color="#474545ff" />
        </div>
      </div>
      <ChatSearch />
      <SelectFilter />
      <Conversation />
    </section>
  );
};

export default Chat;
