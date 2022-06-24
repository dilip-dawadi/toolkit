import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFoods, deleteaFood } from '../../toolkit/slice/foodSlice'
import FoodUpload from '../foodUpload/uploadFood'
import Loading from '../../toolkit/slice/loading'
import Allfood from './Allfood';
import { Grid } from '@mui/material'

const UserView = () => {
    const food = useSelector(state => state.food);
    const [currentId, setCurrentId] = React.useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(fetchFoods())
        }
    }, [dispatch])
    return (
        <>
            <FoodUpload currentId={currentId} />
            {food.loading && <Loading />}
            {
                !food.loading && food.FoodData.length ? (
                    <Grid
                        container
                        alignItems="stretch"
                        spacing={2}
                        style={{
                            marginTop: '10px'
                        }}
                    >
                        {food.FoodData.map((foods) => (
                            < Allfood foodData={foods} setCurrentId={setCurrentId} deleteaFood={deleteaFood} key={foods._id} />

                        ))}</Grid>
                ) : null
            }
        </>
    )
}

export default UserView;