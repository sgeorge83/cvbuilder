const PI_PAYMENT_AMOUNT = 0.01;
const PI_PAYMENT_MEMO = "UAE CV Builder Payment";

let currentUser = null;
let piAvailable = false;

function isPiBrowser() {
  return typeof Pi !== "undefined" && Pi && typeof Pi.init === "function";
}

function callPaymentApi(endpoint, body) {
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || `Server error (${res.status})`);
      err.status = res.status;
      throw err;
    }
    return data;
  });
}

function initPiAuth() {
  if (!isPiBrowser()) {
    console.info("Pi SDK not available — dev mode enabled.");
    return Promise.resolve(null);
  }

  return Pi.init({ version: "2.0" })
    .then(() => Pi.authenticate(["payments"]))
    .then((auth) => {
      currentUser = auth.user;
      piAvailable = true;
      console.info("Pi authenticated:", currentUser.username);
      return currentUser;
    })
    .catch((err) => {
      console.warn("Pi authentication failed:", err);
      piAvailable = false;
      return null;
    });
}

function createPiPayment(onSuccess, onError) {
  if (!isPiBrowser() || !currentUser) {
    onError(new Error("piAuthRequired"));
    return;
  }

  const paymentData = {
    amount: PI_PAYMENT_AMOUNT,
    memo: PI_PAYMENT_MEMO,
    metadata: { product: "CV-BUILDER", version: "2.0" }
  };

  const callbacks = {
    onReadyForServerApproval(paymentId) {
      console.info("Pi payment awaiting server approval:", paymentId);
      callPaymentApi("/api/payments/approve", { paymentId }).catch((err) => {
        console.error("Server approval request failed:", err.message);
      });
    },
    onReadyForServerCompletion(paymentId, txid) {
      console.info("Pi payment awaiting server completion:", paymentId, txid);
      callPaymentApi("/api/payments/complete", { paymentId, txid })
        .then(() => {
          setDownloadUnlocked(true);
          onSuccess();
        })
        .catch((err) => {
          console.error("Server completion failed:", err.message);
          onError(new Error("paymentError"));
        });
    },
    onCancel(paymentId) {
      console.info("Pi payment cancelled:", paymentId);
      onError(new Error("paymentCancelled"));
    },
    onError(error) {
      console.error("Pi payment error:", error);
      onError(new Error("paymentError"));
    }
  };

  Pi.createPayment(paymentData, callbacks);
}

function devUnlockDownloads() {
  if (isPiBrowser() && piAvailable) {
    return false;
  }
  setDownloadUnlocked(true);
  return true;
}
