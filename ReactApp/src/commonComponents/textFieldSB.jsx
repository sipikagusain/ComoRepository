import React from "react";
import { TextField } from "@material-ui/core"

export const TextFieldSB = (props) => {
    return <>
        <TextField
            disabled={props.disabled}
            id={props.id}
            label={props.label}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onClick={props.onClick}
        />
    </>
};

