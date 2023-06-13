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

  const twoDigits = (number) => {
    if (typeof number !== 'number') return number;

    return number > 9 ? number : '0' + number;
  };

  return (
    <div className="flip-card">
      <div className="top">{twoDigits(currentTime)}</div>
      <div className="bottom">{twoDigits(previousTime)}</div>

      <div ref={topFlipRef} className="top-flip">
        {twoDigits(previousTime)}
      </div>
      <div ref={bottomFlipRef} className="bottom-flip">
        {twoDigits(currentTime)}
      </div>
    </div>
  );
};

FlipCard.propTypes = {
  previousTime: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.oneOf(['AM', 'PM']),
  ]),
  currentTime: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.oneOf(['AM', 'PM']),
  ]),
};

export default FlipCard;
