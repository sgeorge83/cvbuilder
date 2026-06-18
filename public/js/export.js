const EXPORT_WIDTH = 794;

function getCvFileName() {
  const name = (document.getElementById("fullName").value || "UAE-CV")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  return name || "UAE-CV";
}

function setExportStatus(message, isError) {
  const el = document.getElementById("exportStatus");
  if (!el) return;
  el.textContent = message || "";
  el.classList.toggle("is-error", Boolean(isError));
}

function waitForImages(root) {
  const images = [...root.querySelectorAll("img")].filter((img) => img.src);
  if (!images.length) return Promise.resolve();
  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
}

function buildExportNode() {
  const source = document.getElementById("cvPreview");
  const stage = document.getElementById("exportStage");
  if (!source || !stage) {
    throw new Error("CV preview not found");
  }

  stage.innerHTML = "";
  const clone = source.cloneNode(true);
  clone.removeAttribute("id");
  clone.style.width = `${EXPORT_WIDTH}px`;
  clone.style.minHeight = "1123px";
  clone.style.maxWidth = "none";
  stage.appendChild(clone);
  return clone;
}

function renderCvCanvas() {
  const node = buildExportNode();
  return waitForImages(node).then(
    () =>
      new Promise((resolve, reject) => {
        requestAnimationFrame(() => {
          html2canvas(node, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
            width: EXPORT_WIDTH,
            windowWidth: EXPORT_WIDTH,
            scrollX: 0,
            scrollY: 0
          })
            .then(resolve)
            .catch(reject);
        });
      })
  );
}

function triggerFileDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);

  try {
    link.click();
  } catch {
    window.open(url, "_blank");
  }

  setTimeout(() => {
    if (link.parentNode) link.parentNode.removeChild(link);
    URL.revokeObjectURL(url);
  }, 4000);
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not create image"));
      }, "image/png");
      return;
    }
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const parts = dataUrl.split(",");
      const mime = parts[0].match(/:(.*?);/)[1];
      const binary = atob(parts[1]);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
      resolve(new Blob([array], { type: mime }));
    } catch (err) {
      reject(err);
    }
  });
}

function downloadPng() {
  setExportStatus(typeof t === "function" ? t("exportPreparing") : "Preparing download…");
  return renderCvCanvas()
    .then((canvas) => canvasToBlob(canvas))
    .then((blob) => {
      triggerFileDownload(blob, `${getCvFileName()}.png`);
      setExportStatus(typeof t === "function" ? t("exportSuccess") : "Download started");
    })
    .catch((err) => {
      console.error("PNG export failed:", err);
      setExportStatus(typeof t === "function" ? t("exportFailed") : "Download failed", true);
      throw err;
    });
}

function downloadPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    setExportStatus(typeof t === "function" ? t("exportFailed") : "Download failed", true);
    return Promise.reject(new Error("jsPDF not loaded"));
  }

  setExportStatus(typeof t === "function" ? t("exportPreparing") : "Preparing download…");

  return renderCvCanvas()
    .then((canvas) => {
      const { jsPDF } = window.jspdf;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
      } else {
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
          heightLeft -= pageHeight;
        }
      }

      const blob = pdf.output("blob");
      triggerFileDownload(blob, `${getCvFileName()}.pdf`);
      setExportStatus(typeof t === "function" ? t("exportSuccess") : "Download started");
    })
    .catch((err) => {
      console.error("PDF export failed:", err);
      setExportStatus(typeof t === "function" ? t("exportFailed") : "Download failed", true);
      throw err;
    });
}
