import NavIcon from "../../../../../components/icons/NavIcon";
import styles from "./conversation.module.scss";

const Conversation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="/favicon.svg" alt="Icon" className={styles.image} />
      </div>

      <div className={styles.wrapperContainer}>
        <div className={styles.upperContainer}>
          <h4 className={styles.name}>Darshit</h4>
          <p className={styles.day}>Tuesday</p>
        </div>
        <div className={styles.lowerContainer}>
          <p className={styles.chat}>
            darshit has a message here darshit has a message here darshit has a
            message here
          </p>
          <NavIcon name="TbPinnedFilled" className={styles.pinIcon} size={22} />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
