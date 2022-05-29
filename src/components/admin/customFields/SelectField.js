import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'react-bootstrap';
import Select from 'react-select';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
}
SelectField.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    options: [],
}
function SelectField(props) {
    // console.log(props, 'props')

    const { field, options, form, placeholder, disabled } = props;
    const { name, value } = field;
    const selectedOption = options.find(options => options.value === value)
    const { errors, touched } = form;
    const ShowError = errors[name] && touched[name];
    const handleSelectOptionChange = (selectedOption) => {
        console.log(selectedOption, 'option')
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;
        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent)
    }
    return (
        <div>
            {/* <input if="maND" className="auth-input form-control" {...field} placeholder={placeholder }/> */}
            <FormGroup className="input-field">
                <Select
                    id={name}
                    {...field}
                    value={selectedOption}
                    onChange={handleSelectOptionChange}
                    placeholder={placeholder}
                    isDisable={disabled}
                    options={options}
                    isMulti
                />
                {ShowError && <p className="p-field">{errors[name]}</p>}
            </FormGroup>
        </div>
    )
}

export default SelectField;
