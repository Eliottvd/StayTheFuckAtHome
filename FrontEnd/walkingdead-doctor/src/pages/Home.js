import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';
import sha256 from 'crypto-js/sha256';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { default as update } from "react-addons-update";
import {default as canUseDOM} from "can-use-dom";
import {shouldUpdate} from 'recompose'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Home() {
    const classes = useStyles();
    const [codePostal, setCodePostal] = React.useState("");
    const [registreNational, setRegistreNational] = React.useState("");
    const [result, setResult] = React.useState("Infectious");
    const [movements, setMovements] = React.useState([]);
    const [date, setDate] = React.useState(new Date());
    const laDate = React.useRef(date);

    const onConnect = (e) => {
        e.preventDefault()
        console.log({ codePostal, registreNational: sha256(registreNational).toString(), result, movements })
        let fectchParameters = {
            method: 'POST',
            body: JSON.stringify({ codePostal, registreNational: sha256(registreNational).toString(), result, movements }),
            headers: {
                'Content-Type': 'application/json',

            }
        }
        fetch("https://cors-anywhere.herokuapp.com/http://walkinddeadapi.azurewebsites.net/walkingdead/addtest", fectchParameters);
    }

    const setMyMarkers = (markers) => {
        let array = [];
        Moment.locale('zh-tw');
        markers.forEach(element => {
            array.push({ longitude: element.position.lng(), latitude: element.position.lat(), date: Moment(element.date).format('YYYY-MM-DD') })
        });

        setMovements(array);
    }

    const handleChangeDate = (d) => {
        setDate(d);
        console.log(d);

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

    const [state, setState] = React.useState({ markers: [] });
    // const laDate = React.useRef(props.date);

    // React.useEffect(() => {
    //     props.setMarkers(state.markers);
    // }, [state.markers]);

    const handleMapClick = (event) => {

        var { markers } = state;

        markers = update(markers, {
            $push: [
                {
                    date: date,
                    position: event.latLng,
                    key: Date.now(),// Add a key property for: http://fb.me/react-warning-keys
                },
            ],
        });
        setState({ markers });
        setMyMarkers(markers);

        // if (3 === markers.length) {
        //     props.toast(
        //         "Right click on the marker to remove it",
        //         "Also check the code!"
        //     );
        // }
    }

    const handleMarkerRightclick = (index, event) => {
        /*
         * All you modify is data, and the view is driven by data.
         * This is so called data-driven-development. (And yes, it's now in
         * web front end and even with google maps API.)
         */
        var { markers } = state;
        markers = update(markers, {
            $splice: [
                [index, 1]
            ],
        });
        setState({ markers });
    }

    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
            defaultZoom={13}
            onClick={handleMapClick}>
            >
            {state.markers && state.markers.map((marker, index) => {
                return (
                    <Marker
                        {...marker}
                        onRightclick={handleMarkerRightclick.bind(this, index)} />
                );
            })}
        </GoogleMap>
    ));

    return (
        <Grid container spacing={1} component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={4} md={7}>
                <div>
                    <GoogleMapExample
                        containerElement={<div style={{
                            width: '100%',
                            height: '100vh'
                        }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ajouter un zombie
                    </Typography>
                    <form className={classes.form} noValidate>
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
                        <Select onChange={onChange} name="result" value={result}>
                            <MenuItem value="Infectious">Infecté</MenuItem>
                            <MenuItem value="Susceptible">Ok tier</MenuItem>
                            <MenuItem value="Removed">Guéri ou mort</MenuItem>
                        </Select>
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
                        <DatePicker
                            selected={date}
                            onChange={handleChangeDate}
                            dateFormat="dd/MM/yyyy"
                        />
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}