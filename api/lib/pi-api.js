const PI_API_BASE = "https://api.minepi.com/v2";

function getApiKey() {
  const key = process.env.PI_API_KEY;
  if (!key) {
    const err = new Error("PI_API_KEY is not configured on the server");
    err.status = 500;
    throw err;
  }
  return key;
}

async function piRequest(path, options = {}) {
  const response = await fetch(`${PI_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Key ${getApiKey()}`,
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const err = new Error(data.error || data.message || `Pi API error (${response.status})`);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function approvePayment(paymentId) {
  return piRequest(`/payments/${encodeURIComponent(paymentId)}/approve`, {
    method: "POST",
    body: "{}"
  });
}

async function completePayment(paymentId, txid) {
  return piRequest(`/payments/${encodeURIComponent(paymentId)}/complete`, {
    method: "POST",
    body: JSON.stringify({ txid })
  });
}

module.exports = { approvePayment, completePayment };
