import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"

const SelectProps = {
    id: '',
    label: '',
    color: '',
    name: '',
    variant: '',
    defaultText: '',
    options: [],
    value: null,
    onChange: null,
    className: '',
    noDefaultOption: false
}
export const SelectBox = (props = SelectProps) => {
    return <>

        <FormControl style={{ minWidth: '200px' }}>
            <InputLabel shrink={true}>{props.label}</InputLabel>
            <Select
                disabled={false}
                labelId={props.id}
                id={props.id}
                value={props.value}
                onChange={(props.onChange) || null}
            >
                {
                    !props.noDefaultOption && <MenuItem value="">
                        <em>{props.defaultText || 'Select'}</em>
                    </MenuItem>
                }
                {
                    props.options && props.options.map((x, index) => {
                        return <MenuItem key={index} value={x.value}>{x.key}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    </>
};

