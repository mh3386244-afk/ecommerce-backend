export const validationMiddle = (Schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const result = Schema.validate(data, { abortEarly: false });

    if (result.error) {
      const errorMessage = result.error.details.map((x) => x.message);
      return next(new Error(errorMessage));
    }

    return next();
  };
};