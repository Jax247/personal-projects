import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
  MenuItem,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Header } from "../../components/";
// import { tokens } from "../../theme";
import { z } from "zod";
import { useFormik } from "formik";

interface FormData {}
const initialValues = {
  name: "",
  registrarId: "",
  email: "",
  age: "",
  phone: "",
  address: "",
};
const validation = {
  schema: z.object({
    name: z.string().max(25),
    email: z.string().email(),
    age: z.number().max(100),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    zipCode: z.string(),
    registrarId: z.number(),
  }),
  phoneRegex: `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`,
  emailRegex: `[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+`,
};

const handleSubmit = (params: any) => {
  console.log(params);
};

const AddContact = () => {
  const isNonMobile = useMediaQuery("(min-width: 700px)");
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation.schema,
    onSubmit: handleSubmit,
  });

  return (
    <Box p={3}>
      <Header title="Add Contact" subtitle="Add Contact to list" />
      <Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "200px" },
          }}
          noValidate
          autoComplete="on"
          onSubmit={handleSubmit}
        >
          <Box
            className="form-grid"
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: "" },
              "& label": {
                // color: `${colors.grey[100]}!important`,
              },
            }}
          >
            <TextField
              required
              id="FirstName"
              label="Fisrt Name"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name}
              sx={{GridColumn: 'span 2'}}
            />
            <TextField
              required
              id="Email"
              label="Email"
              variant="filled"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              required
              id="Age"
              label="Age"
              variant="filled"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age}
            />
            <TextField
              required
              id="Phone"
              label="Phone"
              variant="filled"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone}
            />
            <TextField
              required
              id="Address"
              label="Address"
              variant="filled"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address}
            />
            
            <TextField
              required
              id="zipcode"
              label="Zip Code"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name}
            />
            <TextField
              required
              id="registrarId"
              label="Registrar ID"
              variant="filled"
              value={formik.values.registrarId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.registrarId && Boolean(formik.errors.registrarId)}
              helperText={formik.touched.registrarId}
            />
          </Box>
        </Box>

        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddContact;
