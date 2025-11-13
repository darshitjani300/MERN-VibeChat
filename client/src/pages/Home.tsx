import { useEffect } from "react";
import { homeApi } from "../api/homeApi";
import { toastMessage } from "../utils/toastMessage";
import NavMenu from "./Home/navbar/NavMenu";
import Chat from "./Home/chat/Chat";

const Home = () => {
  const getHomeData = async () => {
    try {
      const data = await homeApi();
      console.log(data);
    } catch (error: any) {
      toastMessage("error", error.response.data.message);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div className="" style={{ display: "flex" }}>
      <NavMenu />
      <Chat />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
