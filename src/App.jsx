import "./App.css";

import { useState, useRef, useEffect } from "react";

const Otp = ({ conditionForOtpSection, OtpGenerate }) => {
  let inpref = useRef([]);
  let [otpLength, setOtpLengthData] = useState(new Array(5).fill(""));
  let [otpStore, setOtp] = useState("");
  let [storeOtpBasedCondition, setOtpBasedCondition] = useState();

  useEffect(() => {
    if (conditionForOtpSection) {
      inpref.current[0].focus();
      setOtp(OtpGenerate);
    }
  }, []);

  const HandleInputOnchange = (index, e) => {
    let value = e.target.value;

    let arrayForSplice = [...otpLength];

    arrayForSplice[index] = value.substring(value.length - 1);

    setOtpLengthData(() => arrayForSplice);

    if (value && index < 4 && inpref.current[index + 1].value === "") {
      inpref.current[index + 1].focus();
    }
    setOtpBasedCondition(arrayForSplice.join(""));
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      inpref.current[index].value !== "" &&
      index > 0 &&
      inpref.current[index - 1].value !== ""
    ) {
      setTimeout(() => {
        inpref.current[index - 1].focus();
      }, 0);
    }
  };

  return (
    <div>
      <div>{otpStore}</div>
      {otpStore !== storeOtpBasedCondition ? (
        <div className="flex gap-3">
          {otpLength.map((val, i) => (
            <input
              type="text"
              key={val + i}
              value={otpLength[i]}
              className="bg-white h-13 w-15 text-3xl text-black px-5"
              ref={(el) => (inpref.current[i] = el)}
              onChange={(e) => HandleInputOnchange(i, e)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            ></input>
          ))}
        </div>
      ) : (
        <div>Login Successfully</div>
      )}
    </div>
  );
};

let App = () => {
  let [state, setState] = useState("");
  let [confirm, setConfirm] = useState(false);
  const handleChange = (e) => {
    setState(e.target.value);
  };

  function OtpGenerate() {
    let otpRange = "1234567890^~$@";
    let otpLength = 5;
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
      let random = Math.floor(Math.random() * otpRange.length);
      otp += otpRange[random];
    }
    return otp;
  }

  const submitHandle = (e) => {
    e.preventDefault();
    let stateToNumber = Number(state);
    if (state.length > 10 && stateToNumber) {
      setConfirm(true);
    } else {
      alert("Valid Number Please");
    }
  };
  return (
    <div className="h-screen w-screen flex p-30 flex-col items-center bg-black text-gray-400 gap-6">
      <h1 className="text-4xl font-semibold">
        {!confirm ? "Enter Your Mobile Number" : "Enter OTP"}
      </h1>
      {!confirm ? (
        <div className="h-30 w-90">
          <form className="flex gap-2" onSubmit={submitHandle}>
            <input
              type="text"
              placeholder="Enter Your Mobile Number"
              value={state}
              onChange={handleChange}
              className="w-70 bg-gray-500 px-4 rounded-2xl py-1 outline-blue-500"
            ></input>
            <button
              type="submit"
              className="bg-amber-50 text-black font-semibold px-5 rounded-2xl"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <Otp
            conditionForOtpSection={confirm}
            OtpGenerate={() => OtpGenerate()}
          />
        </>
      )}
    </div>
  );
};
export default App;
