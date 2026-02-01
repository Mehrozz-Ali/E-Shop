//  create Token and saving it in cookies
const sendShopToken = (user, statusCode, res) => {
    const seller_token = user.getJwtToken();

    // options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statusCode).cookie("seller_token", seller_token, options).json({
        success: true,
        user,
        seller_token,
    })
}


module.exports = sendShopToken;