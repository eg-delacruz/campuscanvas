import PropTypes from 'prop-types';

//Styles
import styles from './StaticProgressBar.module.scss';

const StaticProgressBar = (props) => {
  //MaxAmount HAS TO BE > than left!!!
  const { left, MaxAmount, units } = props;
  const percentageLeft = (left / MaxAmount) * 100;

  const fillerStyles = {
    width: `${percentageLeft}%`,
  };

  return (
    <div className={styles.container}>
      <div style={fillerStyles} className={styles.filler}></div>
      <span className={styles.label}>
        {left} {units || ''}
      </span>
    </div>
  );
};

export default StaticProgressBar;

// the main parent div container - represents the whole bar
// the child div - completed part of the bar with the span which will show the completed percentage number.

StaticProgressBar.propTypes = {
  left: PropTypes.number.isRequired,
  MaxAmount: PropTypes.number.isRequired,
  units: PropTypes.string,
};
