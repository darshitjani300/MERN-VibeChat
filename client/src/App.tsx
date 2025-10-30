import RouterPage from "./routes/RouterPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "top-right",
        }}
      />
      <RouterPage />
    </>
  );
};

export default App;
