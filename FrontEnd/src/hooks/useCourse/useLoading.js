import { useEffect, useState } from "react";

const useLoading = (loading, minTime = 300) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (loading) {
      setVisible(true);
    } else {
      timer = setTimeout(() => {
        setVisible(false);
      }, minTime);
    }

    return () => clearTimeout(timer);
  }, [loading, minTime]);

  return visible;
};

export default useLoading;