import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFoods, deleteaFood } from '../../toolkit/slice/foodSlice'
import Upload from '../foodUpload/uploadFile'

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
        <div> <h2>List of Users</h2>
            <Upload currentId={currentId} />
            {food.loading && <div>Loading...</div>}
            {!food.loading && food.error ? <div>Error: {food.error}</div> : null}
            {!food.loading && food.FoodData.length ? (
                <ul>
                    {food.FoodData.map(food => (
                        <li key={food._id}>{food.title}
                            <button onClick={() => dispatch(deleteaFood(food._id))}>Delete</button>
                            <button onClick={() => setCurrentId(food._id)}>Edit</button>
                        </li>
                    ))}
                </ul>
            ) : null
            }
        </div >
    )
}

export default UserView;