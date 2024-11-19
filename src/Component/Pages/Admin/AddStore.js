import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Upload,
  Image,
  Typography,
  Modal,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../css/adminChild.css"; // Import the CSS file
import Lottie from "react-lottie";
import successAnimationData from "../../../image/animation.json";

const { Title } = Typography;

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

const AddStore = () => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageChange = async (info) => {
    const file = info.file;
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        setImagePreview(imageUrl);
        form.setFieldsValue({ product_store_image: imageUrl });
      }
    }
  };

  const handleSubmit = async (values) => {
    console.log("values >>>", values);
    const jsonData = {
      //   product_store_name: values.product_store_name,
      lattitude: values.latitude, // Fixed spelling from 'lattitude' to 'latitude'
      longitude: values.longitude,
      product_store_image: values.product_store_image,
      area_pincode: values.area_pincode,
      street: values.street,
      owner_name: values.owner_name,
      landmark_nearby: values.landmark_nearby,
    };

    try {
      const response = await axios.post(
        "https://qualitytechlab.com/rest-api/createstore.php",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response code:", response.status);
      console.log("respose data >>>>", response.data);
      if (response?.data.message == "Store created successfully") {
        form.resetFields();
        setImagePreview(null);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 10000);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
        <Title level={2}>Add New Store</Title>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="admin-form"
      >
        <Form.Item
          label="Store Name"
          name="product_store_name"
          rules={[{ required: true, message: "Please input the store name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Store Owner Name"
          name="owner_name"
          rules={[
            { required: true, message: "Please input the store owner name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="imgUpContainer">
          <Form.Item
            label="Store Image"
            name="product_store_image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              className="upload-btn"
              name="file"
              showUploadList={false}
              onChange={handleImageChange}
              accept="image/*"
              beforeUpload={() => false} 
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          {imagePreview && (
            <div className="image-preview">
              <Image src={imagePreview} alt="Store Preview" width={200} />
            </div>
          )}
        </div>

        <Form.Item
          label="Store Address"
          name="street"
          rules={[
            {
              required: true,
              message: "Please input the store address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Area Pincode"
          name="area_pincode"
          rules={[
            {
              required: true,
              message: "Please input the area pincode!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nearby Landmark"
          name="landmark_nearby"
          rules={[
            { required: true, message: "Please input the nearby landmark!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
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
          <Col span={12}>
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
            Add Store
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
          <p>Store added successfully!</p>
          <Lottie options={successAnimationOptions} height={100} width={100} />
        </div>
      </Modal>
    </div>
  );
};

export default AddStore;
