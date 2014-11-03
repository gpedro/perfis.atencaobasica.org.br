/**
 * MainController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {
  index: function homePage(req, res){
    if(req.isAuthenticated()){
      res.redirect('/account');
    }else{
      res.redirect('/login');
    }
  }
}