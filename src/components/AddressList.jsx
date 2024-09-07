import { useDispatch } from "react-redux";
import { deleteAddress } from "../features/address/addressSlice";
const AddressList = ({ addresses, onEdit }) => {
  const dispatch = useDispatch();
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const cardStyle = {
    width: "800px", // Fixed width for consistency
    height: "280px", // Fixed height for consistency
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden", // Ensure content does not overflow the card
  };

  const buttonStyle = {
    padding: "5px 10px",
    fontSize: "12px",
    margin: "2px",
    backgroundColor: "#007aff",
    borderRadius: "0",
    color: "light",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
  };

  const addressDetailStyle = {
    marginBottom: "5px",
    overflow: "hidden", // Ensure long text does not overflow
    textOverflow: "ellipsis", // Add ellipsis if text overflows
    whiteSpace: "nowrap", // Prevent line breaks
  };

  return (
    <div style={containerStyle}>
      <h1 className="display-5 pb-4">Addresses </h1>
      {addresses.map((address, index) => (
        <div key={index} style={cardStyle}>
          <div style={addressDetailStyle}>
            <strong>Name:</strong> {address.name}
          </div>
          <div style={addressDetailStyle}>
            <strong>Mobile Number:</strong> {address.mobileNumber}
          </div>
          <div style={addressDetailStyle}>
            <strong>Secondary Mobile Number:</strong>{" "}
            {address.secondaryMobileNumber}
          </div>
          <div style={addressDetailStyle}>
            <strong>State:</strong> {address.state}
          </div>
          <div style={addressDetailStyle}>
            <strong>City:</strong> {address.city}
          </div>
          <div style={addressDetailStyle}>
            <strong>Postal Code:</strong> {address.postalCode}
          </div>
          <div style={addressDetailStyle}>
            <strong>Address:</strong> {address.address}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <button
              style={buttonStyle}
              className="btn "
              onClick={() => onEdit(address)}
            >
              Edit
            </button>
            <button
              style={deleteButtonStyle}
              onClick={() => dispatch(deleteAddress(address._id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
