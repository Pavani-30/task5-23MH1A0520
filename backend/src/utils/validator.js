exports.required = (fields, body) => {
  for (let field of fields) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }
  return null;
};
