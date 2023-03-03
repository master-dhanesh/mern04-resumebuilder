exports.homepage = (req, res, next) => {
    res.json({ message: "Homepage / route" });
};

exports.create = (req, res, next) => {
    res.json({ body: req.body });
};
