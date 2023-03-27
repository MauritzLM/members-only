

// Display home page on get
exports.getHomePage = (req, res, next) => {
    res.render("index", { title: "Homepage" });
}