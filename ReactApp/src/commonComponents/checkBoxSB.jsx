
import React from 'react';
import { Checkbox } from "@material-ui/core"

export const CheckboxSB = (props) => {
    return (
        <Checkbox
            id={props.id}
            checked={props.checked}
            onChange={props.onChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    )
};