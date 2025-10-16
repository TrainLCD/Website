import { useCallback, useEffect, useState } from 'preact/hooks';

type RefObject<T> = {
  current: T;
};

const useScreenVisibility = (
  contentRef: RefObject<HTMLDivElement | null>
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

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return visible;
};

export default useScreenVisibility;
