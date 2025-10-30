import { useEffect } from "react";
import { homeApi } from "../api/homeApi";
import { toastMessage } from "../utils/toastMessage";

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

  return <div>Home</div>;
};

export default Home;
