import NavIcon from "../../../../components/icons/NavIcon";
import { data } from "../../../../data/data";
import styles from "./message.module.scss";

const Message = () => {
  const newData = data[0];
  return (
    <div className={styles.messageWrapper}>
      <div className={styles.headerSection}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src="/favicon.svg" alt="Icon" className={styles.image} />
          </div>

          <h4 className={styles.name}>{newData.name}</h4>
        </div>
        <div className={styles.rightSide}>
          <NavIcon name="IoIosSearch" />
        </div>
      </div>

      <div className={styles.chatSection}></div>

      <div className={styles.conversationSection}>
        <div className={styles.container}>
          <div className={styles.attachment}>
            <NavIcon name="IoAdd" />
          </div>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Type a message"
              className={styles.input}
            />
          </div>
          <div className={styles.speech}>
            <NavIcon name="FaMicrophone" size={23} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
