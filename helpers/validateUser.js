const validateUser = (email, passowrd) => {
  const validEmail = typeof email === "string" && email.trim() !== "";
  const validPassword =
    typeof passowrd === "string" && passowrd.trim().length >= 6;
  return validEmail && validPassword;
};
module.exports = validateUser;
