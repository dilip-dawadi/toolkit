import { styled } from '@mui/material/styles';
import { TextField } from '@material-ui/core';

const CssTextField = styled(TextField)({
    '& label.Mui-focused:after': {
        borderColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'gray',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'gray',
            borderWidth: '1px',
        },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        color: 'white !important',
        margin: '-8px 0px',
    }
});

export default CssTextField;