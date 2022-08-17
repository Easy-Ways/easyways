const cookieParser = require('cookie-parser');
const User = require('../data-schema/user');

exports.search = (req,res,next) => {
    const user = req.query.searchs;
    User.find({name: {$regex: new RegExp('^' + user + '.*')} }).then(
        (users) => {
            console.log(users);
            res.render('all-students.html', {
                userlist: users,
            })
        }
    )
}