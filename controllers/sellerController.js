const sellerRegisterHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sellerRegisterHandler };
