import { ToastContainer } from "react-toastify";
import NavigationBar from "./Components/NavigationBar";
import Timer from "./Components/Timer";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <NavigationBar />
      <div className="container mx-auto p-3">
        <Timer />
      </div>
    </div>
  );
}

export default App;
