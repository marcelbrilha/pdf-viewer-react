import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { Document, Page, pdfjs } from "react-pdf";
import { Grid, Icon, Fab, LinearProgress, Tooltip } from "@material-ui/core";
import { isMobile } from "react-device-detect";

import Style from "./style";

pdfjs.GlobalWorkerOptions.workerSrc = import(
  "pdfjs-dist/build/pdf.worker.entry"
);

const CreatePages = (numPages, scale, page) => {
  const pages = [];

  for (let i = page * 10 + 1; i <= page * 10 + 10; i++) {
    if (i > numPages) break;

    pages.push(
      <Page
        renderMode="canvas"
        loading={<LinearProgress color="primary" />}
        pageNumber={i}
        width={scale}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    );
  }

  return pages;
};

const ZoomNavigator = ({ config, setConfig }) => {
  const { scale, minScale, maxScale, scalePoint } = config;

  const handleScale = type => {
    const comparation = type === "max" ? scale < maxScale : scale > minScale;
    const newScale =
      type === "max"
        ? parseInt(scale) + parseInt(scalePoint)
        : parseInt(scale) - parseInt(scalePoint);

    if (comparation) setConfig({ ...config, scale: newScale });
  };

  const handleAutoScale = () => {
    const newScale = scale === minScale ? maxScale : minScale;
    setConfig({ ...config, scale: newScale });
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-end"
    >
      <Grid item>
        <Tooltip title="Ajustar à largura" placement="left">
          <Fab
            disableRipple
            color="primary"
            aria-label="add"
            onClick={handleAutoScale}
          >
            <Icon>fullscreen</Icon>
          </Fab>
        </Tooltip>
      </Grid>

      <Grid item>
        <Tooltip title="Aumentar zoom" placement="left">
          <Fab
            disableRipple
            color="primary"
            aria-label="add"
            onClick={() => handleScale("max")}
          >
            <Icon>add</Icon>
          </Fab>
        </Tooltip>
      </Grid>

      <Grid item>
        <Tooltip title="Diminuir zoom" placement="left">
          <Fab
            disableRipple
            color="primary"
            aria-label="add"
            onClick={() => handleScale("min")}
          >
            <Icon>remove</Icon>
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const PagesNavigator = ({
  classes,
  fileOrBase64,
  filename,
  config,
  onClose,
  setConfig
}) => {
  const { fullLoading, numPages, page } = config;
  const {
    header,
    title,
    containerFilename,
    iconFilename,
    containerNavigation,
    containerPagination
  } = classes;

  const fileNameProcessed =
    String(filename).length > 30
      ? `${String(filename).substr(0, 30)} ...`
      : filename;

  const handlePage = type => {
    const comparation = type === "next" ? page < numPages / 10 - 1 : page > 0;
    const newPage = type === "next" ? page + 1 : page - 1;

    if (comparation) setConfig({ ...config, page: newPage });
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={header}
      spacing={2}
    >
      <Grid item xs={12} md={3} className={containerFilename}>
        <Icon className={iconFilename}>picture_as_pdf</Icon>
        <span className={title}>{fileNameProcessed}</span>
      </Grid>

      {fullLoading && numPages > 10 && (
        <Grid item xs={12} md={6} className={containerPagination}>
          {`Pág. ${page * 10 + 1} até ${
            numPages <= 10
              ? numPages
              : (page + 1) * 10 > numPages
              ? numPages
              : (page + 1) * 10
          } de ${numPages}`}
        </Grid>
      )}

      <Grid item xs={12} md={3}>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={containerNavigation}
        >
          <Tooltip title="10 páginas anteriores" placement="bottom">
            <Fab disableRipple onClick={() => handlePage("previous")}>
              <Icon>navigate_before</Icon>
            </Fab>
          </Tooltip>

          <Tooltip title="Próximas 10 páginas" placement="bottom">
            <Fab disableRipple onClick={() => handlePage("next")}>
              <Icon>navigate_next</Icon>
            </Fab>
          </Tooltip>

          <Tooltip title="Fazer o download" placement="bottom">
            <a
              href={fileOrBase64}
              download={filename}
              target={!isMobile ? "_blank" : "_self"}
            >
              <Fab disableRipple>
                <Icon>get_app</Icon>
              </Fab>
            </a>
          </Tooltip>

          <Tooltip title="Fechar" placement="bottom">
            <Fab disableRipple onClick={onClose}>
              <Icon>close</Icon>
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

const PDFViewer = ({ file, filename, onClose }) => {
  const classes = Style();
  const fileOrBase64 = file.toLowerCase().endsWith(".pdf")
    ? file
    : `data:application/pdf;base64,${file}`;

  const [config, setConfig] = useState({
    fullLoading: false,
    numPages: null,
    scale: parseInt(`${isMobile ? 370 : 700}`),
    pageNumber: 10,
    page: 0,
    minScale: 500,
    maxScale: parseInt(window.innerWidth) - 50,
    scalePoint: 40
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setConfig({ ...config, numPages, fullLoading: true });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        className={classes.container}
      >
        <Grid item>
          <PagesNavigator
            classes={classes}
            fileOrBase64={fileOrBase64}
            filename={filename}
            config={config}
            setConfig={setConfig}
            onClose={onClose}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
            className={classes.content}
          >
            <Grid item xs={12}>
              <Document
                file={fileOrBase64}
                onLoadSuccess={onDocumentLoadSuccess}
                renderTextLayer={false}
                loading={<LinearProgress color="primary" />}
              >
                {CreatePages(config.numPages, config.scale, config.page).map(
                  (page, index) => (
                    <div key={`pdf-viewer-key-${index}`}>{page}</div>
                  )
                )}
              </Document>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {!isMobile && (
        <div className={classes.zoom}>
          <ZoomNavigator config={config} setConfig={setConfig} />
        </div>
      )}
    </>
  );
};

CreatePages.propTypes = {
  numPages: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired
};

ZoomNavigator.propTypes = {
  setConfig: PropTypes.func.isRequired,
  config: PropTypes.exact({
    fullLoading: PropTypes.bool.isRequired,
    scale: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    minScale: PropTypes.number.isRequired,
    maxScale: PropTypes.number.isRequired,
    scalePoint: PropTypes.number.isRequired,
    numPages: PropTypes.number
  }).isRequired
};

PagesNavigator.propTypes = {
  fileOrBase64: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  config: PropTypes.exact({
    fullLoading: PropTypes.bool.isRequired,
    scale: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    minScale: PropTypes.number.isRequired,
    maxScale: PropTypes.number.isRequired,
    scalePoint: PropTypes.number.isRequired,
    numPages: PropTypes.number
  }).isRequired
};

PDFViewer.propTypes = {
  file: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default memo(PDFViewer);
