

const getIndex = async (req, res) => {
  res.render("index" , {pageTitle : "Home | Robokids"});
};






const getSignUp = async (req,res) =>{

    res.render("signup");
}









const getLogin = async (req, res) => {
 
    res.render("login");
};

module.exports = { getIndex, getSignUp , getLogin  };
