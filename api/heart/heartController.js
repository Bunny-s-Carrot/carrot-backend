const productService = require('../product/productService');
const heartService = require('./heartService');

const updateHeart = async (req, res) => {
  const body = req.body;
  const plus = req.body.plus;
  const product_id = req.body.product_id;
  await heartService.updateHeart(body);
  await productService.updateHeart(product_id, plus);

  return res.status(200).json({
    success: 1,
    message: "Heart update"
  })
}

const getHeart = async (req, res) => {
  const type = req.params.type;
  const product_id = req.params.id;
  const loginId = req.query.login_id;
  const heart = await heartService.getHeart({ type, product_id, user_id: loginId })
  const heartInfo = heart.length !== 0;

  return res.status(200).json({
    payload: { heart: heartInfo }
  })
}

const heartController = {
  updateHeart,
  getHeart,
}

module.exports = heartController;

