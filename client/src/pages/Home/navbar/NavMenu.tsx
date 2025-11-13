import { useState } from "react";
import NavIcon from "../../../components/icons/NavIcon";
import styles from "./navmenu.module.scss";

type NavIconType = {
  id: number;
  name: string;
  activeName: string;
  text: string;
  size?: number;
};

const NavMenu = () => {
  const [active, setActive] = useState<number>(1);

  const icons: Array<NavIconType> = [
    {
      id: 1,
      name: "IoChatboxEllipsesOutline",
      activeName: "IoChatboxEllipses",
      text: "Chat",
    },
    {
      id: 2,
      name: "IoFilterCircleOutline",
      activeName: "IoFilterCircle",
      text: "Status",
      size: 32,
    },
    {
      id: 3,
      name: "LuBotOff",
      activeName: "LuBot",
      text: "Bot",
      size: 28,
    },
    {
      id: 4,
      name: "IoSettingsOutline",
      activeName: "IoSettingsSharp",
      text: "Settings",
      size: 26,
    },
    {
      id: 5,
      name: "LuBotOff",
      activeName: "LuBot",
      text: "Profile",
      size: 28,
    },
  ];

  const upperIcons = icons?.splice(0, 3);
  const lowerIcons = icons;

  return (
    <div className={styles.container}>
      <div className={styles.containerWrapper}>
        {/* <div className={styles.headerContainer}>
          <img src="/favicon.svg" alt="Logo" className={styles.headerLogo} />
        </div> */}

        <div className={styles.iconContainer}>
          <ul className={styles.upperContainer}>
            {upperIcons &&
              upperIcons?.map((elem: NavIconType) => {
                const isActive = elem?.id === active;

                return (
                  <li
                    key={elem?.id}
                    className={`${styles.icon} ${
                      isActive ? styles.activeIcon : ""
                    }`}
                    onClick={() => setActive(elem?.id)}
                  >
                    <NavIcon
                      name={isActive ? elem?.activeName : elem?.name}
                      size={elem?.size}
                      className={
                        isActive ? styles.iconStyleActive : styles.iconStyle
                      }
                    />
                    <span
                      className={`${styles.text} ${
                        isActive ? styles.activeText : ""
                      } `}
                    >
                      {elem?.text}
                    </span>
                  </li>
                );
              })}
          </ul>

          <ul className={styles.lowerContainer}>
            {lowerIcons &&
              lowerIcons?.map((elem) => {
                const isActive = elem?.id === active;

                return (
                  <li
                    key={elem?.id}
                    className={`${styles.icon} ${
                      isActive ? styles.activeIcon : ""
                    }`}
                    onClick={() => setActive(elem?.id)}
                  >
                    <NavIcon
                      className={
                        isActive ? styles.iconStyleActive : styles.iconStyle
                      }
                      name={isActive ? elem?.activeName : elem?.name}
                      size={elem?.size}
                    />
                    <span
                      className={`${styles.text} ${
                        isActive ? styles.activeText : ""
                      } `}
                    >
                      {elem?.text}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
