import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const Upload = (imageUrl, setProgress, setImageUrl) => {
    if (!imageUrl.selectedFile) return;
    const sotrageRef = ref(storage, `toolKit/${imageUrl.selectedFile.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, imageUrl.selectedFile);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress("Upload is " + progress + "% done");
            // eslint-disable-next-line default-case
            switch (snapshot.state) {
                case "paused": // or 'paused'
                    setProgress("Upload is paused");
                    break;
                case "running": // or 'running'
                    setProgress("Upload is " + progress + "% done");
                    break;
            }
        },
        (error) => console.log(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUrl(downloadURL);
            });
        });
}

export default Upload