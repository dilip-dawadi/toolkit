import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import UploadImage from './imageUpload';
import { createaFood, updateaFood } from '../../toolkit/slice/foodSlice'
const Upload = ({ currentId }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState({ selectedFile: '' });

    const { FoodData } = useSelector((state) => state.food);
    const UpdateHomPage = FoodData.filter(updateHomeData => updateHomeData._id === currentId)[0];
    React.useEffect(() => {
        if (UpdateHomPage) {
            setFormData(UpdateHomPage);
            setImageUrl(UpdateHomPage.selectedFile);
        };
    }, [UpdateHomPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            const homeUpdate = {
                currentId,
                formData: { ...formData, selectedFile: imageUrl }
            }
            dispatch(updateaFood(homeUpdate));
        } else {
            dispatch(createaFood({ ...formData, selectedFile: imageUrl }));
        }
    };
    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <input name='title' type='text' placeholder='Title' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <input name='description' type='text' placeholder='Description' value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            {progress ?
                <div style={{ padding: '7px 0', width: '98%', margin: '20px auto', textAlign: 'center' }}>
                    <p variant="body1">{progress}</p>
                </div> :
                <div><input style={{ padding: '20px 0px', marginLeft: "50px" }} type="file" id='selectedFile' name='selectedFile' onChange={(e) => setImageUrl({ ...imageUrl, selectedFile: e.target.files[0] })} />
                    <button variant="contained" size="small" onClick={() => UploadImage(imageUrl, setProgress, setImageUrl)}>Upload</button></div>}
            <button type="submit">Submit</button>
        </form>
    )
}

export default Upload