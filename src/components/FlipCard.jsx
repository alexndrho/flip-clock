import '../styles/flip-card.css';
import { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

const FlipCard = ({ previousTime, currentTime }) => {
  const topFlipRef = useRef(null);
  const bottomFlipRef = useRef(null);

  useMemo(() => {
    if (
      previousTime === currentTime ||
      !topFlipRef.current ||
      !bottomFlipRef.current
    )
      return;

    // restart animation
    topFlipRef.current.style.animationName = 'none';
    bottomFlipRef.current.style.animationName = 'none';

    requestAnimationFrame(() => {
      setTimeout(() => {
        topFlipRef.current.style.animationName = '';
        bottomFlipRef.current.style.animationName = '';
      }, 1);
    });
  }, [previousTime, currentTime, topFlipRef, bottomFlipRef]);

  return (
    <div className="flip-card">
      <div className="top">{currentTime}</div>
      <div className="bottom">{previousTime}</div>

      <div ref={topFlipRef} className="top-flip">
        {previousTime}
      </div>
      <div ref={bottomFlipRef} className="bottom-flip">
        {currentTime}
      </div>
    </div>
  );
};

FlipCard.propTypes = {
  previousTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['AM', 'PM']),
  ]).isRequired,
  currentTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['AM', 'PM']),
  ]).isRequired,
};

export default FlipCard;
