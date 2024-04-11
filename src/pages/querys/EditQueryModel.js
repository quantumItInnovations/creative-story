import React, { useEffect, useReducer, useContext, useState } from "react";
import { Store } from "../../states/store";
import { getError } from "../../utils/error.js";
import { reducer } from "../../states/reducers";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Container, Modal, Form, Spinner } from "react-bootstrap";

import axiosInstance from "../../utils/axiosUtil.js";

import { Cropper, LoadingBox } from "../../components";

export default function EditBannersModel(props) {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { token, query } = state;
  const { id } = useParams(); // category/:id
  const [load, setLoad] = useState(false);

  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [querys, setQuerys] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (query.name) {
      setName(query?.name ? query.name : "");
      setEmail(query?.email ? query.email : "");
      setQuerys(query?.query ? query.query : "");
      setStatus(query?.status ? query.status : "");
    }
  }, [query]);

  const resetForm = () => {
    // setClientName("");
    // setNavigationLink("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name && !email && !querys && !status) {
      toast.warning("Please fill atleast one fieled");
      return;
    }
    try {
      //   dispatch({ type: "UPDATE_REQUEST" });
      setLoad(true);

      const { data } = await axiosInstance.put(
        `/api/query/update-query/${id}`,
        { email, name, query: querys, status },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data);
      if (data.success) {
        toast.success("Query Updated Succesfully.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        resetForm();
        setLoad(false);
        setTimeout(() => {
          navigate("/admin/querys");
          //   dispatch({ type: "UPDATE_SUCCESS" });
        }, 1200);
      } else {
        toast.error(data.error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      setLoad(false);
      //   dispatch({ type: "UPDATE_FAIL" });
      toast.error(getError(err), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Edit Query</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Container className="small-container">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Query</Form.Label>
              <Form.Control
                value={querys}
                onChange={(e) => setQuerys(e.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={"Pending"}>Pending</option>
                <option value={"Resolved"}>Resolved</option>
              </Form.Select>
            </Form.Group>

            <ToastContainer />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {load ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>
          {loadingUpdate && <LoadingBox></LoadingBox>}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
