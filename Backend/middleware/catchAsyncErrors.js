

module.exports = (thefunc) => (req, res, next) => {
    return Promise.resolve(thefunc(req, res, next)).catch(next);
};
