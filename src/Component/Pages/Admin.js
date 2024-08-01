import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Image,
  Typography,
  Modal,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../css/admin.css"; // Import the CSS file
import Lottie from "react-lottie";
import successAnimationData from "../../image/animation.json";

const { Title } = Typography;
const { Option } = Select;

// Replace with your Cloudinary credentials
const CLOUD_NAME = "dn1raishj";
const UPLOAD_PRESET = "gjlukom4"; // Ensure this is an unsigned upload preset

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

const Admin = () => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageChange = async (info) => {
    const file = info.file;
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        setImagePreview(imageUrl);
        form.setFieldsValue({ product_image: imageUrl });
      }
    }
  };

  const handleSubmit = async (values) => {
    // try {
    //   const response = await axios.post(
    //     "https://qualitytechlab.com/rest-api/create.php",
    //     values
    //   );
    //   console.log(response.data);
    //   form.resetFields();
    //   setImagePreview(null);
    //   setModalVisible(true);
    // } catch (error) {
    //   console.error(error);
    // }
    form.resetFields();
    setImagePreview(null);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 10000);
  };

  const successAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        form.setFieldsValue({
          latitude,
          longitude,
        });
      });
    } else {
      window.open("https://gps-coordinates.org/", "_blank");
    }
  };

  return (
    <div className="adminForm">
      <div className="page-title-details">
        <Title level={2}>Add New Product</Title>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          handleSubmit(values);
        }}
        className="admin-form"
      >
        <Form.Item
          label="Product Name"
          name="product_name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Type"
          name="product_type"
          rules={[
            { required: true, message: "Please select the product type!" },
          ]}
        >
          <Select placeholder="Select Type">
            <Option value="Grocery">Grocery</Option>
            <Option value="Electronics">Electronic</Option>
            <Option value="Beauty Products">Beautiproducts</Option>
            <Option value="Garments">Garments</Option>
            <Option value="House Utility">House Utility</Option>
          </Select>
        </Form.Item>

        <div className="imgUpContainer">
          <Form.Item
            label="Product Image"
            name="product_image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              className="upload-btn"
              name="file"
              showUploadList={false}
              onChange={handleImageChange}
              accept="image/*"
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          {imagePreview && (
            <div className="image-preview">
              <Image src={imagePreview} alt="Product Preview" width={200} />
            </div>
          )}
        </div>

        <Form.Item
          label="Product Availability"
          name="product_availibility"
          rules={[
            {
              required: true,
              message: "Please input the product availability!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="product_price"
          rules={[
            { required: true, message: "Please input the product price!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="product_description"
          rules={[
            {
              required: true,
              message: "Please input the product description!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Store Name"
          name="product_store_name"
          rules={[{ required: true, message: "Please input the store name!" }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={14}>
            <Form.Item
              label="Store Address"
              name="product_store_address"
              rules={[
                {
                  required: true,
                  message: "Please input the store address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Latitude"
              name="latitude"
              rules={[
                {
                  required: true,
                  message: "Please input the latitude!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Longitude"
              name="longitude"
              rules={[
                {
                  required: true,
                  message: "Please input the longitude!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div className="lat_long">
          <Form.Item className="lat_long_btn">
            <Button
              className="lat_long_btn"
              type="link"
              onClick={() => handleGetCurrentLocation()}
            >
              Click here to know your lat and long
            </Button>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => setModalVisible(false)}
          >
            Ok
          </Button>,
        ]}
      >
        <div style={{ textAlign: "center" }}>
          <p>Product added successfully!</p>
          <Lottie options={successAnimationOptions} height={100} width={100} />
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
