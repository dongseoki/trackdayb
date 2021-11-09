import React, { useState } from "react";
import axios from "axios";
// import axiosInstance from "../axiosConfig";
import "./ImageUploadForm.css";
import ProgressBar from "./ProgressBar";

function ImageUploadForm() {
    const defaultFileName = "이미지 파일을 업로드해주세요."
    const [ file, setFile ] = useState(null);
    const [ fileName, setFileName ] = useState(defaultFileName)
    //이미지 미리보기(소스)
    const [imgSrc, setImgSrc] = useState(null);
    //업로드 현황 퍼센트관리
    const [ percent, setPercent ] = useState(0);

    const imageSelectHandler = (event) => {
        const imageFile = event.target.files[0]
        setFile(imageFile);
        setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (evt) => setImgSrc(evt.target.result)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", file)
        try {
            const result = await axios.post("/upload", formData, {
                headers: {"Content-Type" : "multipart/form-data"},
                onUploadProgress : (e) => {
                    setPercent(Math.round((100 * e.loaded) / e.total));
                }
            });
            alert("success")
            console.log({result})
            setTimeout(()=>{
                setPercent(0);
                setFileName(defaultFileName);
                setImgSrc(null);
            }, 3000);
        } catch(error){
            alert("fail")
            console.error(error.message)
            setPercent(0)
            setFileName(defaultFileName)
            setImgSrc(null);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <img src={imgSrc} alt="hellow" className={`image-preview ${imgSrc && "image-preview-show"}`} />
            <ProgressBar percent={percent}/>
            <div className="file-dropper">
                {fileName}
                <input id="image" type="file" accept="image/*" onChange={imageSelectHandler}/>
            </div>
        <button type="submit" className="submitBtn">제출</button>
      </form>
    )
}

export default ImageUploadForm;