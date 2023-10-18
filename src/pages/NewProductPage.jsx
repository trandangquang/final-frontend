// import { Alert, Button, Form, Input, Select } from 'antd';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../axios';
// import { useCreateProductMutation } from '../services/appApi';

// const NewProductPage = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [images, setImages] = useState([]);
//   const [imgToRemove, setImgToRemove] = useState(null);
//   const navigate = useNavigate;
//   const [createProduct, { isError, error, isSuccess, isLoading }] =
//     useCreateProductMutation();

//   function handleUpload() {
//     const widget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: 'dn1lrr2xl',
//         uploadPreset: 'nusiy6qc',
//       },
//       (error, result) => {
//         if (!error && result.event === 'success') {
//           setImages((prev) => [
//             ...prev,
//             { url: result.info.url, public_id: result.info.public_id },
//           ]);
//         }
//       }
//     );
//     widget.open();
//   }

//   const handleRemoveImage = (imgObj) => {
//     setImgToRemove(imgObj.public_id);
//     axios
//       .delete(`/images/${imgObj.public_id}/`)
//       .then((res) => {
//         setImgToRemove(null);
//         setImages((prev) =>
//           prev.filter((img) => img.public_id !== imgObj.public_id)
//         );
//       })
//       .catch((e) => console.log(e));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !description || !price || !category || !images.length) {
//       return (
//         <Alert
//           message='All fields cannot be left blank'
//           type='warning'
//           showIcon
//         />
//       );
//     }

//     createProduct({ name, description, price, category, images }).then(
//       ({ data }) => {
//         if (data.length > 0) {
//           setTimeout(() => {
//             navigate('/');
//           }, 1500);
//         }
//       }
//     );

//   };
//   return (
//     <div className='px-28 pt-3 grid gap-52 grid-cols-2'>
//       <div>
//         <Form
//           onFinish={handleSubmit}
//           labelCol={{
//             span: 4,
//           }}
//           className='w-[750px]'
//         >
//           <h1 className='text-center pb-6'>Create new product</h1>
//           {isSuccess && (
//             <Alert
//               message='The product has been created successfully'
//               type='success'
//               showIcon
//             />
//           )}
//           {isError && <Alert message={error.data} type='error' showIcon />}
//           <Form.Item label='Name'>
//             <Input
//               type='text'
//               placeholder='Enter product name'
//               value={name}
//               required
//               onChange={(e) => setName(e.target.value)}
//             />
//           </Form.Item>
//           <Form.Item label='Description'>
//             <Input
//               className='h-[100px]'
//               type='text'
//               placeholder='Enter product description'
//               value={description}
//               required
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </Form.Item>
//           <Form.Item label='Price'>
//             <Input
//               type='number'
//               placeholder='Price ($)'
//               value={price}
//               required
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </Form.Item>
//           <Form.Item
//             label='Category'
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <Select>
//               <Select.Option value='718'>718</Select.Option>
//               <Select.Option value='911'>911</Select.Option>
//               <Select.Option value='Taycan'>Taycan</Select.Option>
//               <Select.Option value='Panamera'>Panamera</Select.Option>
//               <Select.Option value='Macan'>Macan</Select.Option>
//               <Select.Option value='Cayenne'>Cayenne</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item className='text-center'>
//             <Button onClick={handleUpload}>Upload Images</Button>
//           </Form.Item>
//           <div className=' h-[400px] w-[700px] relative inline-block'>
//             {images.map((image) => (
//               <div>
//                 <img
//                   src={image.url}
//                   alt=''
//                   className='h-[400px] w-[700px] rounded-xl object-cover'
//                 />
//                 {imgToRemove !== image.public_id && (
//                   <i
//                     className='fa fa-times-circle absolute top-[-12px] left-[-12px] cursor-pointer'
//                     onClick={() => handleRemoveImage(image)}
//                   ></i>
//                 )}
//               </div>
//             ))}
//           </div>
//           <Form.Item className='text-center'>
//             <Button htmlType='submit' disabled={isLoading || isSuccess}>
//               Create Product
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default NewProductPage;

import { Alert } from 'antd';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useCreateProductMutation } from '../services/appApi';

function NewProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  const handleRemoveImage = (imgObj) => {
    imageToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImageToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };

  const handleUploadImage = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dn1lrr2xl',
        uploadPreset: 'nusiy6qc',
      },
      (error, result) => {
        if (!error && result.event === 'success') {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return (
        <Alert
          message='All fields cannot be left blank'
          type='warning'
          showIcon
        />
      );
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    );
  };

  return (
    <div className='px-28 pt-3 grid gap-52 grid-cols-2'>
      <div>
        <Form className='w-full' onSubmit={handleSubmit}>
          <h1 className='mt-4'>Create New Product</h1>
          {isSuccess && (
            <Alert
              message='The product has been created successfully'
              type='success'
              showIcon
            />
          )}
          {isError && <Alert message={error.data} type='error' showIcon />}
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter product name'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Product description'
              className='h-[100px]'
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='text'
              placeholder='Price '
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className='mb-3'
            onChange={(e) => setCategory(e.target.value)}
          >
            <Form.Label>Category</Form.Label>
            <Form.Select>
              <option disabled selected>
                -- Select One Category --
              </option>
              <option value='718'>718</option>
              <option value='911'>911</option>
              <option value='Taycan'>Taycan</option>
              <option value='Panamera'>Panamera</option>
              <option value='Macan'>Macan</option>
              <option value='Cayenne'>Cayenne</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3 text-center'>
            <Button onClick={handleUploadImage}>Upload Images</Button>
          </Form.Group>

          <Form.Group className='text-center'>
            <Button type='submit' disabled={isLoading || isSuccess}>
              Create Product
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div className=' h-[400px] w-[700px] relative inline-block'>
        {images.map((image) => (
          <div>
            <img
              src={image.url}
              alt=''
              className='h-[400px] w-[700px] rounded-xl object-cover'
            />
            {imageToRemove !== image.public_id && (
              <i
                className='fa fa-times-circle absolute top-[-12px] left-[-12px] cursor-pointer'
                onClick={() => handleRemoveImage(image)}
              ></i>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewProductPage;
