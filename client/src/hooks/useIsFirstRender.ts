import { useEffect, useState } from 'react';

const useIsFirstRender = () => {
  const [isFirstRender, setIsfirstRender] = useState(true);
  useEffect(() => {
    setIsfirstRender(false);
  }, []);
  return isFirstRender;
};

export default useIsFirstRender;
