import React, { useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../../states/reducers";
import axiosInstance from "../../utils/axiosUtil";
import { Store } from "../../states/store";
import { motion } from "framer-motion";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { getError } from "../../utils/error";

export default function ContactUs() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { token, privacyPolicy } = state;
  //   console.log(privacyPolicy);
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const { data } = await axiosInstance.get("/api/admin/privacy_policy");

  //       if (data.success) {
  //         ctxDispatch({ type: "FETCH_PRIVACY_POLICY", payload: data.data });
  //       }
  //     };
  //     fetchData();
  //   }, [token, modalShow]);
  //   const [{ loading, error }, dispatch] = useReducer(reducer, {
  //     loading: false,
  //     error: "",
  //   });

  const resetForm = () => {
    setEmail("");
    setName("");
    setQuery("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !query) {
      toast.warning("All Fieleds are Required");
      return;
    }
    try {
      const { data } = await axiosInstance.post("/api/query/create-query", {
        name,
        email,
        query,
      });
      if (data.success) {
        resetForm();
        toast.success("Query Created Successfully.");
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ x: "100%" }}
    >
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Submit Your Quey here</Card.Title>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Enter Name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Your Query</Form.Label>
                    <Form.Control
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      as="textarea"
                      placeholder="Enter Query"
                    />
                  </Form.Group>
                  <Button
                    onClick={submitHandler}
                    variant="primary"
                    type="submit"
                  >
                    Submit Query
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
      {/* <Container>
        {!modalShow&&<div>
          <div className="d-flex mt-2 justify-content-between">
            <div>
              <h5>Privacy Policy Content</h5>
            </div>
            {token&&<div className="card-tools">
              <FaEdit
                style={{ color: "blue" }}
                size={20}
                onClick={() => setModalShow(true)}
              />
            </div>}
          </div>
          <div dangerouslySetInnerHTML={{ __html: privacyPolicy }} />
        </div>}
        
      </Container> */}
    </motion.div>
  );
}
