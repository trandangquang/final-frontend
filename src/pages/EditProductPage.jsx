import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import { useUpdateProductMutation } from '../services/appApi';

function EditProductPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const navigate = useNavigate();
  const [updateProduct, { isError, error, isLoading, isSuccess }] =
    useUpdateProductMutation();

  useEffect(() => {
    axios
      .get('/products/' + id)
      .then(({ data }) => {
        const product = data.product;
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setImages(product.pictures);
        setPrice(product.price);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const handleRemoveImage = (imgObj) => {
    setImageToRemove(imgObj.public_id);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return alert('All fields cannot be left blank');
    }
    updateProduct({ id, name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    );
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

  return (
    <div className='px-28 pt-3 grid gap-52 grid-cols-2'>
      <div>
        <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <h1 className='mt-4'>Edit product</h1>
          {isSuccess && (
            <Alert
              message='The product has been updated successfully'
              type='success'
              showIcon
            />
          )}
          {isError && <Alert variant='danger'>{error.data}</Alert>}
          <Form.Group className='mb-3'>
            <Form.Label>Product name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter product name'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Product description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Product description'
              style={{ height: '100px' }}
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='text'
              placeholder='Price'
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
            <Form.Select value={category}>
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
            <Button type='button' onClick={handleUploadImage}>
              Upload Images
            </Button>
          </Form.Group>

          <Form.Group className='text-center'>
            <Button type='submit' disabled={isLoading || isSuccess}>
              Update Product
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

export default EditProductPage;
