import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "./imageUpload";
import { createaFood, updateaFood } from "../../toolkit/slice/foodSlice";
import { Grid, Paper, Button } from "@mui/material";
import CssTextField from "./textField";
import BackupIcon from '@mui/icons-material/Backup';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});
const Upload = ({ currentId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    tags: "",
  });
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState({ selectedFile: "" });
  console.log(imageUrl);
  const { FoodData } = useSelector((state) => state.food);
  const UpdateHomPage = FoodData.filter(
    (updateHomeData) => updateHomeData._id === currentId)[0];
  React.useEffect(() => {
    if (UpdateHomPage) {
      setFormData(UpdateHomPage);
      setImageUrl(UpdateHomPage.selectedFile);
    }
  }, [UpdateHomPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      const homeUpdate = {
        currentId,
        formData: { ...formData, selectedFile: imageUrl },
      };
      dispatch(updateaFood(homeUpdate));
    } else {
      dispatch(createaFood({ ...formData, selectedFile: imageUrl }));
    }
  };
  const moreClasses = {
    label: { style: { color: "blue" } },
    input: {
      style: {
        color: "black",
        background: "white",
        margin: '5px auto',
        borderRadius: "5px",
        border: "1px solid white !important",
      },
    },
  };
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}>
      <Paper elevation={3} style={{
        padding: '20px 10px',
        width: '60%',
        margin: 'auto',
        borderRadius: '10px'
      }}>
        <Grid container alignItems="stretch" spacing={2}>
          <Grid item sm={6} md={6}>
            <CssTextField
              name="title"
              type="text"
              placeholder="title"
              variant="outlined"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              InputProps={moreClasses.input}
              fullWidth
            />
            <CssTextField
              name="description"
              type="text"
              variant="outlined"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              InputProps={moreClasses.input}
              fullWidth
            />
            <CssTextField
              name="tags"
              type="text"
              variant="outlined"
              placeholder="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              InputProps={moreClasses.input}
              fullWidth
            />
          </Grid>
          <Grid item sm={6} md={6}>
            <CssTextField
              name="price"
              type="text"
              variant="outlined"
              placeholder="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              InputProps={moreClasses.input}
              fullWidth
            />
            <CssTextField
              name="quantity"
              type="text"
              variant="outlined"
              placeholder="quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              InputProps={moreClasses.input}
              fullWidth
            />
            {progress ? (
              <div
                style={{
                  padding: "7px 0",
                  width: "98%",
                  margin: "20px auto",
                  textAlign: "center",
                }}
              >
                <p variant="body1">{progress}</p>
              </div>
            ) : (
              <div>
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" type="file" id="contained-button-file" onChange={(e) =>
                    setImageUrl({ ...imageUrl, selectedFile: e.target.files[0] })
                  } />
                  <Button variant="contained" component="span" startIcon={imageUrl.selectedFile && <BackupIcon />} onClick={() => UploadImage(imageUrl, setProgress, setImageUrl)} style={imageUrl.selectedFile ? { backgroundColor: '#424242', margin: '8px auto', display: 'block', width: '60%', textAlign: 'center', padding: '10px 0px' } : { backgroundColor: 'rgb(32 51 85)', margin: '8px auto', display: 'block', width: '60%', textAlign: 'center', padding: '10px 0px' }}>
                    {imageUrl.selectedFile ? 'Upload' : 'Choose a Image'}
                  </Button>
                </label>
              </div>
            )}
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" style={{
          textAlign: 'center',
          margin: '10px auto',
          width: '100px',
          letterSpacing: '3px',
          display: 'block',
          backgroundColor: 'rgb(32 51 85)',
          fontWidth: 600
        }}>Submit</Button>
      </Paper>
    </form >

  );
};

export default Upload;
