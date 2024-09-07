import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import AddressModal from "./AddressModal";
import AddressList from "./AddressList";
import { useSelector } from "react-redux";

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

  // Hardcoded dummy user profile data
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    address: "123 Main St, Springfield, USA",
  };

  const addresses = useSelector((state) => state.address.addresses);

  const handleEdit = (address) => {
    setFormData(address);
    setShowModal(true);
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "20px" }}>
      {/* User Profile Section */}
      <h1 className="text-center pb-4">User Profile</h1>
      <Card className="mb-4 p-3 shadow-sm">
        <Card.Body>
          <div style={{ marginBottom: "1rem" }}>
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
      </Card>

      {/* Address Management Section */}
      <Button
        variant="primary"
        className="mb-3"
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
