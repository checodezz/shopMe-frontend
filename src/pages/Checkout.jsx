import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AddressModal from "../components/AddressModal";
import { fetchAddresses } from "../features/address/addressSlice";
import { VscDiffAdded } from "react-icons/vsc";

const Checkout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const addresses = useSelector((state) => state.address.addresses);
  const status = useSelector((state) => state.address.status);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    secondaryMobileNumber: "",
    state: "",
    city: "",
    postalCode: "",
    address: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAddresses());
    }
  }, [dispatch, status]);

  const handleDeliver = async (e) => {
    try {
      const amount = totalPrice * 100;
      const currency = "INR";
      const response = await axios.post(
        "http://localhost:3000/order",
        {
          amount,
          currency,
          // recipt: reciptId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      var options = {
        key: "rzp_test_fusJ47nYJrGOyT", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "Shop.me", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: selectedAddress.name, //your customer's name
          email: "gaurav.kumar@example.com",
          contact: selectedAddress.mobileNumber, //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const total = query.get("total");
    console.log(total);
    if (total) {
      setTotalPrice(parseFloat(total));
    }
  }, [location.search]);

  const handleAddNewAddress = () => {
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
  };

  return (
    <Container className="mt-2">
      <h2 className="text-center mb-5">Checkout</h2>
      <Form>
        <div
          className="text-center mb-3"
          onClick={handleAddNewAddress}
          style={{ cursor: "pointer" }}
        >
          <VscDiffAdded size={28} />
          <p>Add New Address </p>
        </div>
        {addresses.map((address) => (
          <Card
            key={address._id}
            className={`shadow mb-3 ${
              selectedAddress === address._id ? "border-primary" : ""
            }`}
          >
            <Card.Body>
              <div className="d-flex align-items-center">
                <Form.Check
                  type="radio"
                  id={address._id}
                  name="address"
                  value={address._id}
                  checked={selectedAddress === address._id}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="me-2"
                />
                <label htmlFor={address._id} className="mb-0">
                  <strong>{address.name}</strong>, {address.city},{" "}
                  {address.state} - {address.postalCode}
                </label>
              </div>
            </Card.Body>
          </Card>
        ))}
        <div className="text-center mt-4 mb-5 pb-4">
          <Button
            variant="primary"
            onClick={handleDeliver}
            disabled={!selectedAddress}
          >
            Deliver Here
          </Button>
        </div>
      </Form>

      <AddressModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </Container>
  );
};

export default Checkout;
