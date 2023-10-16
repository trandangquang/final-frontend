import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate;
  const [createProduct, { isError, error, isSuccess, isLoading }] =
    useCreateProductMutation();

  const showTheWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: '',
        uploadPreset: '',
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
    widget.open()
  };
  return (
    <div className='px-28 pt-3'>
      <Form
        labelCol={{
          span: 4,
        }}
        className='max-w-[750px]'
      >
        <Form.Item label='Name'>
          <Input
            type='text'
            placeholder='Enter product name'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Description'>
          <Input
            className='h-[100px]'
            as='textarea'
            placeholder='Enter product description'
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Price'>
          <Input
            type='number'
            placeholder='Price ($)'
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label='Category'
          onChange={(e) => setCategory(e.target.value)}
        >
          <Select>
            <Select.Option value='718'>718</Select.Option>
            <Select.Option value='911'>911</Select.Option>
            <Select.Option value='Taycay'>Taycay</Select.Option>
            <Select.Option value='Panamera'>Panamera</Select.Option>
            <Select.Option value='Macan'>Macan</Select.Option>
            <Select.Option value='Cayenne'>Cayenne</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className='text-center'>
          <Button onClick={showTheWidget}>Upload Image</Button>
        </Form.Item>
        <Form.Item className='text-center'>
          <Button htmlType='submit' disabled={isLoading || isSuccess}>
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewProduct;
