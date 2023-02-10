import PropTypes from 'prop-types';

//Styles
import styles from './CustomCheckbox.module.scss';

//CLARIFICATION: the state has to be a controlled input state created with the useInputValue hook
const CustomCheckBox = ({ message, required, state }) => {
  const onCheckboxChange = () => {
    state.setValue(!state.value);
  };

  return (
    <>
      <label className={styles.checkbox_container}>
        <span className={styles.span}>{message}</span>
        <input
          className={styles.checkbox}
          type='checkbox'
          autoComplete='off'
          checked={state.value}
          onChange={onCheckboxChange}
          required={required}
        />
        <span className={styles.checkmark}></span>
      </label>
    </>
  );
};

export default CustomCheckBox;

CustomCheckBox.propTypes = {
  message: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  state: PropTypes.object.isRequired,
};
