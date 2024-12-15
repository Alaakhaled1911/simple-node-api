module.exports = (asyncFN) => {
  return (req, res, next) => {
    asyncFN(req, res, next).catch((err) => {
      next(err || new Error("An unexpected error occurred."));
    });
  };
};
