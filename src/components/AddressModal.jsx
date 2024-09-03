import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddressModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    secondaryMobileNumber: "",
    state: "",
    city: "",
    postalCode: "",
    address: "",
  });

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      handleSave();
      handleClose();
    } else {
      event.target.reportValidity();
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    let updatedValue = value;
    if (
      id === "mobileNumber" ||
      id === "secondaryMobileNumber" ||
      id === "postalCode"
    ) {
      updatedValue = value ? parseInt(value) : "";
    }
    console.log(id, value);
    setFormData({ ...formData, [id]: updatedValue });
    console.log(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              id="mobileNumber"
              type="number"
              placeholder="+91 Enter Your Mobile Number"
              maxLength="12"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Secondary Mobile Number (Optional)</Form.Label>
            <Form.Control
              id="secondaryMobileNumber"
              type="number"
              maxLength="12"
              placeholder="+91 Enter Your Secondary Mobile Number"
              value={formData.secondaryMobileNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>State *</Form.Label>
            <Form.Control
              id="state"
              as="select"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Choose a state</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>City *</Form.Label>
            <Form.Control
              id="city"
              type="text"
              placeholder="Enter City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Postal Code *</Form.Label>
            <Form.Control
              id="postalCode"
              type="number"
              placeholder="Enter Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              id="address"
              as="textarea"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <p>
            <strong>Fields with (*) are mandatory to fill.</strong>
          </p>

          <Button variant="primary" type="submit">
            Save Address
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddressModal;
