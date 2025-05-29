import { useEffect, useRef, useState } from "react";

const Btn = ({ otpSize, setOtpSize }) => {
  const inpRef = useRef({});
  const handleChange = (e, i) => {
    if (isNaN(e.target.value)) {
      return;
    }

    let newArr = [...otpSize];
    newArr[i] = e.target.value.slice(-1);
    setOtpSize(newArr);

    e.target.value && inpRef.current[i + 1]?.focus();
  };

  useEffect(() => {
    inpRef.current[0].focus();
  }, []);
  const handlekey = (e, i) => {
    if (!e.target.value && e.key === "Backspace") {
      inpRef.current[i - 1]?.focus();
    }
  };
  return (
    <div className="flex gap-1">
      {otpSize.map((val, i) => {
        return (
          <input
            onKeyDown={(e) => {
              handlekey(e, i);
            }}
            ref={(e) => (inpRef.current[i] = e)}
            key={i}
            onChange={(e) => handleChange(e, i)}
            type="text"
            value={otpSize[i]}
            className="border-2 h-13 px-4 w-13 text-2xl flex justify-center "
          ></input>
        );
      })}
    </div>
  );
};

export default Btn;
