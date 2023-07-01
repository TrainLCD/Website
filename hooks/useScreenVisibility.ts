import { MutableRefObject, useCallback, useEffect, useState } from 'react';

const useScreenVisibility = (
  contentRef: MutableRefObject<HTMLDivElement | null>
): boolean => {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const top = contentRef.current?.getBoundingClientRect().top;
    if (top) {
      setVisible(top < window.innerHeight);
    }
  }, [contentRef]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return visible;
};

export default useScreenVisibility;
