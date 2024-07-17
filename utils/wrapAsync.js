module.exports = (fn) => {
  return (req, res, next) => {
    // Ensure that the function is an async function
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
