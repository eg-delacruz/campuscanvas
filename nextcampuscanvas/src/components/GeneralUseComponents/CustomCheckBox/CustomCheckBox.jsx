import PropTypes from 'prop-types';
import { useState } from 'react';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Styles
import styles from './CustomCheckbox.module.scss';

//CLARIFICATION: required property gets a bool, but doesn´t show any error message if the box is not checked. Therefore, if the returned value is false, but this is required, that parent component should handle that and only allow to continue if checked. If required is true, this component itself won´t allow to conginue, but it just won´t show any message
const CustomCheckBox = ({ message, required, defaultChecked, onBoxCheck }) => {
  const SPONSORS_BOX = useInputValue(defaultChecked);

  const onCheckboxChange = () => {
    SPONSORS_BOX.setValue(!SPONSORS_BOX.value);
    onBoxCheck(SPONSORS_BOX.value);
  };

  return (
    <>
      <label className={styles.checkbox_container}>
        <span className={styles.span}>{message}</span>
        <input
          className={styles.checkbox}
          type='checkbox'
          autoComplete='off'
          defaultChecked={SPONSORS_BOX.value}
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
  defaultChecked: PropTypes.bool.isRequired,
  onBoxCheck: PropTypes.func.isRequired,
};
