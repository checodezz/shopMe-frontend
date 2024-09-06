import { useState } from "react";
import { Button } from "react-bootstrap";
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

  const addresses = useSelector((state) => state.address.addresses);
  console.log(addresses);

  const handleEdit = (address) => {
    setFormData(address);
    setShowModal(true);
  };

  return (
    <div className="container text-center">
      <Button
        variant="secondary"
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
    </div>
  );
}

export default User;
