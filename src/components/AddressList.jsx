import { useDispatch } from "react-redux";
import { deleteAddress } from "../features/address/addressSlice";
import { Card, Button, Container } from "react-bootstrap";
import styles from "../css/AddressList.module.css"; // Importing CSS module for custom styling

const AddressList = ({ addresses, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <Container className={styles.container}>
      <h1 className="display-5 text-center pb-4">Addresses</h1>
      {addresses.map((address) => (
        <Card className={`${styles.card} mb-4 shadow-sm`} key={address._id}>
          {/* Card Header for Name */}
          <Card.Header className={styles.cardHeader}>
            <h3>{address.name}</h3>
          </Card.Header>

          <Card.Body>
            <Card.Text>
              <strong>Mobile Number:</strong> {address.mobileNumber}
            </Card.Text>
            <Card.Text>
              <strong>Secondary Mobile Number:</strong>{" "}
              {address.secondaryMobileNumber || "N/A"}
            </Card.Text>
            <Card.Text>
              <strong>State:</strong> {address.state}
            </Card.Text>
            <Card.Text>
              <strong>City:</strong> {address.city}
            </Card.Text>
            <Card.Text>
              <strong>Postal Code:</strong> {address.postalCode}
            </Card.Text>
            <Card.Text>
              <strong>Address:</strong> {address.address}
            </Card.Text>
            {/* Buttons for Edit and Delete */}
            <div
              className={`d-flex justify-content-between ${styles.buttonGroup}`}
            >
              <Button
                variant="outline-primary"
                onClick={() => onEdit(address)}
                className={styles.button}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => dispatch(deleteAddress(address._id))}
                className={styles.button}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default AddressList;
