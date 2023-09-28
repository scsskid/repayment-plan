import type {
  DispatchAction,
  DispatchActionDataValue,
  FormState,
  FormStateItem
} from '@/types/common';

export const UPDATE_FORM = 'UPDATE_FORM';

export const onInputChange = (
  name: keyof FormState,
  value: DispatchActionDataValue,
  dispatch: React.Dispatch<DispatchAction>,
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
    data: { name, value, hasError, errorMessage, touched: true, isFormValid }
  });
};

export const validateInput = (name: string, value: DispatchActionDataValue) => {
  let hasError = false,
    errorMessage = '';
  switch (name) {
    case 'interestRate':
    case 'initialRepaymentRate':
    case 'loanAmount':
      if (typeof value === 'boolean' || typeof value === 'object') {
        break;
      }
      if (value.trim() === '') {
        hasError = true;
        errorMessage = 'Cannot be empty';
      } else if (!/^[0-9]+(?:\.[0-9]+)?$/.test(value)) {
        hasError = true;
        errorMessage = 'Not a positive float or decimals not seperated by .)';
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
