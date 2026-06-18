const { completePayment } = require("../lib/pi-api");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { paymentId, txid } = req.body || {};
    if (!paymentId || typeof paymentId !== "string") {
      return res.status(400).json({ error: "paymentId is required" });
    }
    if (!txid || typeof txid !== "string") {
      return res.status(400).json({ error: "txid is required" });
    }

    const payment = await completePayment(paymentId.trim(), txid.trim());
    return res.status(200).json({ success: true, payment });
  } catch (err) {
    console.error("Pi complete error:", err.message, err.data || "");
    const status = err.status && err.status >= 400 && err.status < 600 ? err.status : 500;
    return res.status(status).json({ error: err.message || "Payment completion failed" });
  }
};
