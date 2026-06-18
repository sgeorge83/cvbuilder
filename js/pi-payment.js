const PI_PAYMENT_AMOUNT = 0.01;
const PI_PAYMENT_MEMO = "UAE CV Builder Payment";

let currentUser = null;
let piAvailable = false;

function isPiBrowser() {
  return typeof Pi !== "undefined" && Pi && typeof Pi.init === "function";
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
      console.info("Pi payment awaiting approval:", paymentId);
    },
    onReadyForServerCompletion(paymentId, txid) {
      console.info("Pi payment complete:", paymentId, txid);
      setDownloadUnlocked(true);
      onSuccess();
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
