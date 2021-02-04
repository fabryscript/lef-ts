const input_fields = {
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};

export const validateEmail = (email: string) => {
  if(input_fields.email.test(email))
    return true;
  else
    return false;
};
export const validatePassword = (password: string) => {
  if (password.trim().length <= 0 && password.length <= 5)
    return false;
  else
    return true;
}