function getCvFileName() {
  const name = (document.getElementById("fullName").value || "UAE-CV")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  return name || "UAE-CV";
}

function renderCvCanvas() {
  const preview = document.getElementById("cvPreview");
  return html2canvas(preview, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false
  });
}

function downloadPng() {
  return renderCvCanvas().then((canvas) => {
    const link = document.createElement("a");
    link.download = `${getCvFileName()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

function downloadPdf() {
  return renderCvCanvas().then((canvas) => {
    const { jsPDF } = window.jspdf;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

    pdf.save(`${getCvFileName()}.pdf`);
  });
}
