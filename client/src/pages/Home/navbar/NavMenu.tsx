import NavIcon from "../../../components/icons/NavIcon";
import styles from "./navmenu.module.scss";

const NavMenu = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.upperContainer}>
        <li className={styles.activeIcon}>
          <NavIcon name="IoChatboxEllipses" />
        </li>
        <li>
          <NavIcon name="IoFilterCircle" />
        </li>
        <li>
          <NavIcon name="LuBot" />
        </li>
      </ul>
      <ul className={styles.lowerContainer}>
        <li>
          <NavIcon name="IoSettingsSharp" />
        </li>
        <li>
          <NavIcon name="LuBot" />
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
