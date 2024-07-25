// creating token and sending cookie to the frontend..

exports.sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken();

  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
  };
  res.cookie("token", token, options);
  res.status(200).json({
    success: true,
    info: user,
    token,
  });
};
