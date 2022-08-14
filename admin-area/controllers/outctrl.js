exports.rendere = (req,res) =>{
    res.clearCookie('id',{path: '/'});
    res.redirect('/login');
}