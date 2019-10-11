import React from "react";

import PdfViewer from "~/components/PDFViewer";

const Examples = () => (
  <PdfViewer
    file="./sample.pdf"
    filename="Análise de eficiência na detecção de vulnerabilidades em sistemas web com o uso de ferramentas gratuitas e de código aberto"
    onClose={() => console.log("OnClose")}
  />
);

export default Examples;
