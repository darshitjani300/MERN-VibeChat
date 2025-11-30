
import NavIcon from "../../../../components/icons/NavIcon";
import { data } from "../../../../data/data";
import styles from "./conversation.module.scss";

const Conversation = () => {
  return (
    <div className={styles.conversationWrapper}>
      <div className={styles.containerWrapper}>
        {data.map((item, index) => (
          <div className={styles.container} key={index}>
            <div className={styles.imageContainer}>
              <img src="/favicon.svg" alt="Icon" className={styles.image} />
            </div>

            <div className={styles.wrapperContainer}>
              <div className={styles.upperContainer}>
                <h4 className={styles.name}>{item.name}</h4>
                <p className={styles.day}>{item.day}</p>
              </div>
              <div className={styles.lowerContainer}>
                <p className={styles.chat}>{item.chat}</p>
                <NavIcon
                  name="TbPinnedFilled"
                  className={styles.pinIcon}
                  size={22}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversation;
