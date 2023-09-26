export const UPDATE_FORM = 'UPDATE_FORM';

export const onInputChange = (name, value, dispatch, formState) => {
  const { hasError, errorMessage } = validateInput(name, value);
  let isFormValid = true;

  for (const key in formState) {
    const item = formState[key];
    // Check if the current field has error
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      // Check if any other field has error
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, errorMessage, touched: false, isFormValid }
  });
};

export const validateInput = (name, value) => {
  let hasError = false,
    errorMessage = '';
  switch (name) {
    case 'interestRate':
    case 'initialRepaymentRate':
    case 'loanAmount':
      if (value.trim() === '') {
        hasError = true;
        errorMessage = 'Cannot be empty';
      } else if (!/^[1-9]\d*$/.test(value)) {
        hasError = true;
        errorMessage = 'Not a positive number (Int)';
      } else {
        hasError = false;
        errorMessage = '';
      }
      break;
    default:
      break;
  }
  return { hasError, errorMessage };
};

export const onFocusOut = (name, value, dispatch, formState) => {
  const { hasError, errorMessage } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key];
    if (key === name && hasError) {
      isFormValid = false;
      break;
    } else if (key !== name && item.hasError) {
      isFormValid = false;
      break;
    }
  }

  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, errorMessage, touched: true, isFormValid }
  });
};
