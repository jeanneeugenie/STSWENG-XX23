import { makeStyles } from "@mui/styles";

export default makeStyles ((theme) => ({
    card: {
        width: 300,
        padding: theme.spacing(2),
        textAlign: 'left',
        boxShadow: theme.shadows[3],
      },
      button: {
        marginTop: theme.spacing(2),
        width: '100%',
      },
      textField: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      link: {
        marginTop: theme.spacing(2),
        display: 'block',
      },
}));