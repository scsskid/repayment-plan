import type { DispatchAction, FormState, FormStateItem } from '@/types/common';

export const UPDATE_FORM = 'UPDATE_FORM';

export const onInputChange = (
  name: keyof FormState,
  value: string,
  dispatch: (action: DispatchAction) => {},
  formState: FormState
) => {
  const { hasError, errorMessage } = validateInput(name, value);
  let isFormValid = true;

  for (const key in formState) {
    const item = formState[key as keyof FormState] as FormStateItem;
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

export const validateInput = (name: string, value: string) => {
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

export const onFocusOut = (
  name: keyof FormState,
  value: string,
  dispatch: (action: DispatchAction) => {},
  formState: FormState
) => {
  const { hasError, errorMessage } = validateInput(name, value);
  let isFormValid = true;
  for (const key in formState) {
    const item = formState[key as keyof FormState] as FormStateItem;
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

// const validateForm = (formState) => {
//   let isFormValid = true;
//   for (const key in formState) {
//     const item = formState[key];
//     if (item.hasError) {
//       isFormValid = false;
//       break;
//     }
//   }
//   return isFormValid;
// };
