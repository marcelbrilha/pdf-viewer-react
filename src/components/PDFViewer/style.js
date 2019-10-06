import { makeStyles } from "@material-ui/styles";

export default makeStyles({
  container: {
    width: "100%",
    height: "100%",
    fontFamily: "Roboto",
    fontWeight: "200",
    background: "rgba(0, 0, 0, 0.7)",

    "& canvas": {
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.7) !important",
      margin: "10px auto !important"
    }
  },

  containerFilename: {
    textAlign: "left",

    "@media(max-width: 959px)": {
      textAlign: "center"
    }
  },

  iconFilename: {
    position: "absolute",
    marginTop: "-3px"
  },

  containerNavigation: {
    justifyContent: "flex-end",

    "@media(max-width: 959px)": {
      justifyContent: "center"
    }
  },

  containerPagination: {
    textAlign: "center"
  },

  header: {
    width: "100%",
    background: "rgb(50, 54, 57)",
    boxShadow:
      "0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)",
    color: "#fff",
    position: "fixed",
    top: "0",
    margin: "0",
    zIndex: "1",
    padding: "0px 15px",

    "& a": {
      textDecoration: "none !important"
    },

    "& button": {
      width: "25px",
      height: "25px",
      color: "#fff !important",
      margin: "0 5px",
      background: "transparent",
      boxShadow: "none",

      "&:hover": {
        background: "transparent !important",
        color: "#fff !important",
        boxShadow: "none"
      },

      "& .MuiIcon-root": {
        width: "20px !important"
      }
    }
  },

  title: {
    marginLeft: "35px"
  },

  content: {
    marginTop: "55px",

    "@media(max-width: 959px)": {
      marginTop: "120px"
    }
  },

  zoom: {
    position: "fixed",
    right: "30px",
    bottom: "30px",

    "& button": {
      width: "36px",
      height: "36px",
      marginBottom: "10px",
      background: "#fff",
      color: "rgb(97, 97, 97)",

      "&:hover": {
        width: "36px",
        height: "36px",
        marginBottom: "10px",
        background: "#fff",
        color: "rgb(97, 97, 97)"
      },

      "&:disable": {
        width: "36px",
        height: "36px",
        marginBottom: "10px"
      }
    }
  }
});
