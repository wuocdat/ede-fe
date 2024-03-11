import { useEffect, useState } from "react";

export const useDebounce = (data: string, delayTime: number) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setInput(data);
    }, delayTime);

    return () => clearTimeout(timeOutId);
  }, [data]);
  return input;
};
