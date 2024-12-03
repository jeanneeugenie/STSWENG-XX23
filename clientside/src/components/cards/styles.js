import { makeStyles } from "@mui/styles";

export default makeStyles ((theme) => ({
      card: {
        display: 'inline-block',
        padding: theme.spacing(2),
        textAlign: 'left',
        boxShadow: theme.shadows[3],
        maxWidth: '90%'
      },
      button: {
        marginTop: theme.spacing(3),
        width: '100%',
        backgroundColor: '#A3B18A !important',
        color: 'white', '&:hover': {backgroundColor: '#578158 !important'},
      },
      textField: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      link: {
        marginTop: theme.spacing(2),
        display: 'block',
        color: '#578158 !important'
      },
      greyH6: {
          color: theme.palette.grey[600],
          fontSize: '0.9rem',
      },
      stickyButton: {
        position: 'sticky',
        backgroundColor: '#A3B18A !important',
        bottom: '2%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }
}));