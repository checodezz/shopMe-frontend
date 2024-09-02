// AddressModal.js
import { Modal, Button, Form } from "react-bootstrap";

const AddressModal = ({ show, handleClose, handleSave }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAddress1">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control type="text" placeholder="Enter Address Line 1" />
          </Form.Group>

          <Form.Group controlId="formAddress2">
            <Form.Label>Add 3 Line 2</Form.Label>
            <Form.Control type="text" placeholder="Enter Address Line 2" />
          </Form.Group>

          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" />
          </Form.Group>

          <Form.Group controlId="formPostalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" placeholder="Enter Postal Code" />
          </Form.Group>

          <Form.Group controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Enter Country" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Address
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressModal;
