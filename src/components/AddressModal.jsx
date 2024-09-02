import { Modal, Button, Form } from "react-bootstrap";

const AddressModal = ({ show, handleClose, handleSave }) => {
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
    // Call the handleSave function only if form is valid
    if (event.target.checkValidity()) {
      handleSave();
      handleClose();
    } else {
      // Trigger form validation manually
      event.target.reportValidity();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="formName">
            <Form.Label>Name *</Form.Label>
            <Form.Control type="text" placeholder="Enter Your Name" required />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formMobileNumber">
            <Form.Label>Mobile Number </Form.Label>
            <Form.Control
              type="number"
              placeholder="+91 Enter Your Mobile Number"
              maxLength="12"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formSecondaryMobileNumber">
            <Form.Label>Secondary Mobile Number (Optional)</Form.Label>
            <Form.Control
              type="number"
              maxLength="12"
              placeholder="+91 Enter Your Secondary Mobile Number"
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formState">
            <Form.Label>State *</Form.Label>
            <Form.Control as="select" required>
              <option value="">Choose a state</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formCity">
            <Form.Label>City *</Form.Label>
            <Form.Control type="text" placeholder="Enter City" required />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formPostalCode">
            <Form.Label>Postal Code *</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Postal Code"
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formAddress">
            <Form.Label>Address *</Form.Label>
            <Form.Control as="textarea" rows={3} required />
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
