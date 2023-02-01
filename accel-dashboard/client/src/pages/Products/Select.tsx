import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { maxWidth } from '@mui/system';

interface IProps {
    sortBy: string;
    changeSort: React.Dispatch<React.SetStateAction<string>>;
}
const SortSelect:React.FC<IProps> = (props) => {
  const [active, setActive] = React.useState(props.sortBy);

  const handleChange = (event: SelectChangeEvent) => {
    setActive(prev => {
        let next = event.target.value as string
        props.changeSort(next)
        return next as string
    
    })

  };

  return (
    <Box sx={{ maxWidth: 120, marginBottom: '20px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          variant="standard"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={active}
          label="Active"
          onChange={handleChange}
        >
          <MenuItem value={'price'}>Price</MenuItem>
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'rating'}>Rating</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortSelect