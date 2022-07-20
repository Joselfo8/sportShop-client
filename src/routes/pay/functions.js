const Stripe = require("stripe");

const stripe = new Stripe(
  "sk_test_51LKnldGAj3CaqOgHFGASJlk71FicQIsKNZ7DBSQDGqGeA5FcSBBm9e4y8rzhaIaDr7l4uPIA8R96w2xWtSNLMYnA000ECGpz5h"
);

const postPay = async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Descripcion del producto",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    res.send({ message: "Succefull payment" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
};

module.exports = { postPay };
