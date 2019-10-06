import React from "react";

import PdfViewer from "~/components/PDFViewer";

const Examples = () => (
  <PdfViewer
    file="./sample.pdf"
    filename="Example.pdf"
    onClose={() => console.log("OnClose")}
  />
);

export default Examples;
