export const useValidatePassword = (
  errorBag: any,
  values: any,
  input: string,
  text: string,
) => {
  let validate = false

  if (values[input] && errorBag[input]) {
    const error = errorBag[input]
    if (!error?.includes(text)) {
      validate = true
    }
  }

  if (values[input] && !errorBag[input]) {
    validate = true
  }

  return validate
}
