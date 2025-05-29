import { useRef, useState } from "react";
import "./App.css";
import Btn from "./btn";
const App = () => {
  const [otpSize, setOtpSize] = useState(new Array(5).fill(""));
  return (
    <div className="h-100 flex items-center justify-center">
      <Btn otpSize={otpSize} setOtpSize={setOtpSize} />
    </div>
  );
};
export default App;
