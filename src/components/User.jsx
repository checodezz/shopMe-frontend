import { useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import AddressModal from "./AddressModal";
import AddressList from "./AddressList";
import { useSelector } from "react-redux";
import styles from "../css/User.module.css"; // Ensure correct path

function User() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    secondaryMobileNumber: "",
    state: "",
    city: "",
    postalCode: "",
    address: "",
  });

  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    address: "123 Main St, Springfield, USA",
    image: "https://via.placeholder.com/150",
  };

  const addresses = useSelector((state) => state.address.addresses);

  const handleEdit = (address) => {
    setFormData(address);
    setShowModal(true);
  };

  return (
    <Container className={styles.container}>
      <h1 className="text-center pb-4">User Profile</h1>
      <Card className={styles.profileCard}>
        <Row className="no-gutters">
          <Col md={3} className={styles.imageCol}>
            <Card.Img
              variant="top"
              src={userProfile.image}
              className={styles.profileImage}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <div className={styles.profileInfo}>
                <p>
                  <strong>Name:</strong> {userProfile.name}
                </p>
                <p>
                  <strong>Email:</strong> {userProfile.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {userProfile.phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {userProfile.address}
                </p>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Button
        variant="outline-primary"
        className={styles.addAddressButton}
        onClick={() => {
          setFormData({
            name: "",
            mobileNumber: "",
            secondaryMobileNumber: "",
            state: "",
            city: "",
            postalCode: "",
            address: "",
          });
          setShowModal(true);
        }}
      >
        Add New Address
      </Button>

      <AddressList addresses={addresses} onEdit={handleEdit} />

      <AddressModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </Container>
  );
}

export default User;
