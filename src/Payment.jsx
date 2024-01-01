import { useState, useEffect } from "react";
import axios from "axios";

const ProductDisplay = () => (
  <section
    style={{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    }}
  >
    <div className="product">
      <img
        src="https://cdn.orbitalplatforms.com/blog/sd-media/2023-04/image_643d07716cef38_24000388.jpg?ooMediaId=10863"
        alt="The cover of Stubborn Attachments"
        width={800}
      />
      <div
        style={{ width: "100", textAlign: "center" }}
        className="description"
      >
        <h2>Marina Residence</h2>
        <h3>MYR 1000.00</h3>
      </div>
      <form action="http://localhost:3000/stripe/checkout" method="POST">
        <button
          type="submit"
          style={{
            display: "block",
            margin: "0 auto",
            fontSize: "20px",
            padding: "10px 20px",
          }}
        >
          Checkout
        </button>
      </form>
    </div>
  </section>
);

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Payment() {

  const sendSessionIDToServer = async (sessionID) => {
    // send session id to server, use axios:
    await axios.post("http://localhost:3000/stripe/process-payment", {
      sessionID: sessionID,
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });

  }
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionID = query.get("session_id");

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");

      // Send the session ID to your server for further processing
      sendSessionIDToServer(sessionID);
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
