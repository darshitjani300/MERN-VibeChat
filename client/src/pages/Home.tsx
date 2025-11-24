import { useEffect } from "react";
import { homeApi } from "../api/homeApi";
import { toastMessage } from "../utils/toastMessage";
import NavMenu from "./Home/navbar/NavMenu";
import Chat from "./Home/chat/Chat";
import styles from "./home.module.scss";
import Messages from "./Home/chat/components/messages/Messages";

const Home = () => {
  const getHomeData = async () => {
    try {
      await homeApi();
    } catch (error: any) {
      toastMessage("error", error.response.data.message);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div className={styles.wrapper} style={{ display: "flex" }}>
      <NavMenu />
      <Chat />
      <Messages />
    </div>
  );
};

export default Home;
