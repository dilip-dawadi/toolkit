import * as React from 'react';
import {
    Paper, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Grid, IconButton
} from '@material-ui/core';
import { red } from '@mui/material/colors'
import { Favorite, Share, Delete, MoreVert } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
export default function RecipeReviewCard({ foodData, setCurrentId, deleteaFood }) {
    const dispatch = useDispatch();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper style={{ borderRadius: "15px", padding: "5px 0px 5px 0px" }} elevation={3}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={() => setCurrentId(foodData._id)} >
                            <MoreVert />
                        </IconButton>
                    }
                    title={foodData.title}
                    subheader={foodData.createdAt.split("T")[0]}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={foodData?.selectedFile}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2">
                        {foodData.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <Favorite />
                    </IconButton>
                    <IconButton aria-label="share">
                        <Share />
                    </IconButton>
                    <Delete style={{
                        marginLeft: 'auto',
                        cursor: 'pointer'
                    }} onClick={() => dispatch(deleteaFood(foodData._id))} />
                </CardActions>
            </Paper>
        </Grid>
    );
}
