function checkAdminRole(req, res, next) {
    const user = req.session.user;
    if (user && user.role === 'admin') {
        next();
    } else {
        res.redirect('/')
    }
}
module.exports = checkAdminRole;