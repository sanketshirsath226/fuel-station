import Razorpay from "razorpay";
import crypto from 'crypto';

export const initOrder = async (req, res) => {
    const {
        amount
    } = req.body
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const verifyOrder = async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body.data;
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);


        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        let generatedSignature = hmac.digest('hex');

        let isSignatureValid = generatedSignature === razorpaySignature;

        // comaparing our digest with the actual signature
        if (!isSignatureValid)
            return res.json({ msg: "Transaction not legit!" });

        res.json({
            msg: "Success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};

