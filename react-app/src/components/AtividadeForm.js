import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Atividade";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    titulo: '',
    descricao: '',
    data: ''
}

const AtividadeForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({titulo:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('titulo' in fieldValues)
            temp.titulo = fieldValues.titulo ? "" : "This field is required."
        if ('descricao' in fieldValues)
            temp.descricao = fieldValues.descricao ? "" : "This field is required."
        if ('data' in fieldValues)
            temp.data = fieldValues.data ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        //setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createAtividade(values, onSuccess)
            else
                props.updateAtividade(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.AtividadeList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        name="titulo"
                        variant="outlined"
                        label="Título"
                        value={values.titulo}
                        onChange={handleInputChange}
                        {...(errors.titulo && { error: true, helperText: errors.titulo })}
                    />
                    <TextField
                        name="descricao"
                        variant="outlined"
                        label="Descrição"
                        value={values.descricao}
                        onChange={handleInputChange}
                        {...(errors.descricao && { error: true, helperText: errors.descricao })}
                    />
                    <TextField
                        name="data"
                        variant="outlined"
                        value={values.data}
                        onChange={handleInputChange}
                        type="date"
                        {...(errors.data && { error: true, helperText: errors.data })}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Enviar
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Apagar
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6}>

                    {/* <TextField
                        name="descricao"
                        variant="outlined"
                        label="Mobile"
                        value={values.descricao}
                        onChange={handleInputChange}
                        {...(errors.descricao && { error: true, helperText: errors.descricao })}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    /> */}
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    AtividadeList: state.Atividade.list
})

const mapActionToProps = {
    createAtividade: actions.create,
    updateAtividade: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AtividadeForm));