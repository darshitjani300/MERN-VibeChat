import { useEffect } from "react";
import { homeApi } from "../../api/homeApi";
import { toastMessage } from "../../utils/toastMessage";
import styles from "./home.module.scss";
import { socket } from "../../socket/socket";
import Chat from "../Chat/Chat";
import Message from "../Chat/components/messages/Message";

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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server: ", socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log("Server says ", msg);
    });

    return () => {
      socket.off("connect");
      socket.off("welcome");
    };
  }, []);

  return (
    <>
      <div className={styles.wrapper} >
        <Chat />
        {/* <PlaceholderMessage /> */}
        <Message />
      </div>
    </>
  );
};

export default Home;
