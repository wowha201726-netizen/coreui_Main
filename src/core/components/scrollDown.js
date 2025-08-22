import React, { useState, useEffect } from 'react';
import { FaArrowDown } from 'react-icons/fa6';

const ScrollToBottomButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (documentHeight - scrollTop > windowHeight * 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.clientHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll-to-bottom ${isVisible ? 'visible' : ''}`} onClick={scrollToBottom}>
      <FaArrowDown />
    </div>
  );
};

export default ScrollToBottomButton;
