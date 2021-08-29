
import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import uploadApi from 'api/uploadApi';
import axiosClient from 'api/axiosClient';
const Upload = ()=>{
  const imgsrc=process.env.REACT_APP_API_URL;
  const imgsrc1 = imgsrc.split('/');
  imgsrc1.pop();
  const imgsrc3 = imgsrc1.join('/'); 

  const [data, setData] = useState([]);
  const [imgPerview, setImgpreview] = useState('');
useEffect(()=>{
  const fecthFile = async()=>{
    const getdata = await uploadApi.getAll();
    setData(getdata);
  }
  fecthFile();
},[])
const handleSubmit = async (e)=>{
  e.preventDefault();
  let formData = new FormData();
  formData.append('filePath', imgPerview);
  await uploadApi.postFile( formData);
}
return (
  <div>
    {
      data.map((i,idx)=>(<img key = {idx} src={imgsrc3+ i.filePath}/>))
    }
    <Form onSubmit={handleSubmit}>
<FormGroup>
        <Label for="exampleFile">File</Label>
        <Input onChange={(e)=>setImgpreview(e.target.files[0])} type="file" name="filePath" id="exampleFile" />
      </FormGroup>
      <img src={imgPerview}/>
      <Button type="submit">Upload</Button>
    </Form>
  </div>
    )
}

export default Upload;