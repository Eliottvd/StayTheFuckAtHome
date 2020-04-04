import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Home() {
    const classes = useStyles();
    const [codePostal, setCodePostal] = React.useState("");
    const [registreNational, setRegistreNational] = React.useState("");
    const [result, setResult] = React.useState("infectious");
    const [movements, setMovements] = React.useState([])

    const onConnect = (e) => {
        e.preventDefault()
        console.log({ codePostal, registreNational, result, movements })
    }

    const onChange = (e) => {
        switch (e.target.name) {
            case "codePostal": setCodePostal(e.target.value);
                break;
            case "registreNational": setRegistreNational(e.target.value);
                break;
            case "result": setResult(e.target.value);
                break;
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Ajouter un zombie
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={registreNational}
                                onChange={onChange}
                                id="registreNational"
                                label="Numéro de registre national"
                                name="registreNational"
                                autoComplete="registreNational"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="codePostal"
                                label="Code postal"
                                type="codePostal"
                                value={codePostal}
                                onChange={onChange}
                                id="codePostal"
                                autoComplete="codePostal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select onChange={onChange} name="result" value={result}>
                                <MenuItem value="infectious">Infecté</MenuItem>
                                <MenuItem value="Susceptible">Ok tier</MenuItem>
                                <MenuItem value="Removed">Guéri ou mort</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => onConnect(e)}
                    >
                        Ajouter un zombie
                    </Button>
                </form>
            </div>
        </Container>
    );
}