import React, { useState} from "react";
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
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../css/adminChild.css"; // Import the CSS file
import Lottie from "react-lottie";
import successAnimationData from "../../../image/animation.json";

const { Title } = Typography;
const { Option } = Select;

const CLOUD_NAME = "dn1raishj";
const UPLOAD_PRESET = "gjlukom4";

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

const AddProduct = ({ storeList }) => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

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

  const handleStoreChange = (storeId) => {
    setSelectedStoreId(storeId);
  };

  const handleSubmit = async (values) => {
    console.log(
      "Entered Store ID:",
      values.product_store_id,
      "Selected Store ID:",
      selectedStoreId
    );

    // Check if the entered store ID matches the selected store ID
    // eslint-disable-next-line no-unused-vars
    if (values.product_store_id !== selectedStoreId) {
      notification.error({
        message: "Store ID Mismatch",
        description:
          "The entered store ID is mismatched. Kindly enter the valid store ID or contact admin.",
      });
      return;
    }

    const jsonData = {
      product_name: values.product_name,
      product_type: values.product_type,
      product_description: values.product_description,
      product_image: values.product_image,
      product_availibility: values.product_availibility,
      product_price: values.product_price,
      product_discounted_price: values.product_discounted_price,
      product_unit: values.product_unit,
      product_store_id: values.product_store_id,
    };

    console.log("Submitting data:", jsonData);

    try {
      const response = await axios.post(
        "https://qualitytechlab.com/rest-api/createproducts.php",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // eslint-disable-next-line no-unused-vars
      console.log("Add product response:", response.data);
      if (response.data.message === "Item was created.") {
        form.resetFields();
        setImagePreview(null);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 10000);
      } else {
        notification.error({
          message: "Something went wrong",
          description: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error submitting product:", error);
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

  return (
    <div className="adminForm">
      <div className="page-title-details">
        <Title level={2}>Add New Product</Title>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
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
            <Option value="Food">Food</Option>
            <Option value="Electronics">Electronic</Option>
            <Option value="Beauty Products">Beauty Products</Option>
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
              beforeUpload={() => false} 
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Product Price"
              name="product_price"
              rules={[
                { required: true, message: "Please input the product price!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Discounted Price"
              name="product_discounted_price"
              rules={[
                {
                  required: true,
                  message: "Please input the discounted price!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Units"
              name="product_unit"
              rules={[
                { required: true, message: "Please select the product unit!" },
              ]}
            >
              <Select placeholder="Select Unit">
                <Option value="Piece">Piece</Option>
                <Option value="Kilo Gram">Kilo Gram</Option>
                <Option value="Gram">Gram</Option>
                <Option value="Liter">Liter</Option>
                <Option value="Mili Liter">Mili Liter</Option>
                <Option value="Meter">Meter</Option>
                <Option value="Kilo Meter">Kilo Meter</Option>
                <Option value="Mili Meter">Mili Meter</Option>
                <Option value="Inch">Inch</Option>
                <Option value="Feet">Feet</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

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
          rules={[{ required: true, message: "Please select the store name!" }]}
        >
          <Select placeholder="Select Store" onChange={handleStoreChange}>
            {storeList.map((store) => (
              <Option
                key={store.product_store_id}
                value={store.product_store_id}
              >
                {store.product_store_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Store ID"
          name="product_store_id"
          rules={[{ required: true, message: "Please input the store ID!" }]}
        >
          <Input />
        </Form.Item>

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

export default AddProduct;
