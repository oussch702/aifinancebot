import { useEffect, useRef } from 'react';

export function useChatScroll<T extends HTMLElement>(deps: any[]) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      const { scrollHeight, clientHeight } = element;
      const maxScrollTop = scrollHeight - clientHeight;
      
      // Only auto-scroll if user is near bottom
      const shouldScroll = element.scrollTop > maxScrollTop - 100;
      
      if (shouldScroll) {
        setTimeout(() => {
          element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, deps);

  return ref;
}