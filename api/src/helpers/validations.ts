// only accept letters
const onlyLetters = /^[a-zA-Z\s]*$/g;
// email
const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// password, 10 char minimum, a special char, a Uppercase, and a number
const password =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

const validate = { onlyLetters, email, password };

export default validate;
