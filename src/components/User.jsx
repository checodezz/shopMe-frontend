import { useState } from "react";
import { Button } from "react-bootstrap";
import AddressModal from "./AddressModal";

function User() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveAddress = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <Button variant="primary" onClick={handleShowModal}>
        Add New Address
      </Button>

      <AddressModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveAddress}
      />
    </div>
  );
}

export default User;
