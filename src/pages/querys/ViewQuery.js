import React, { useEffect, useReducer, useContext, useState } from "react";
import { Store } from "../../states/store";
// import { getError } from "../../utils/error.js";
import { reducer } from "../../states/reducers";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Card, Col, Container, Row } from "react-bootstrap";
import EditQueryModel from "./EditQueryModel.js";
// import axiosInstance from "../../utils/axiosUtil.js";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { MessageBox } from "../../components";

import { getQuery } from "../../states/actions.js";

const ViewQuery = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { token, query } = state;
  const { id } = useParams(); // category/:id
  // const navigate = useNavigate();
  // console.log("in this room")
  const [modalShow, setModalShow] = useState(false);
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    getQuery(ctxDispatch, dispatch, token, id);
  }, [id]);

  const getDateTime = (dt) => {
    const dT = dt.split(".")[0].split("T");
    return `${dT[0]} ${dT[1]}`;
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ x: "100%" }}
    >
      <Container fluid className="py-3">
        {error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <Card>
              <Card.Header>
                <Card.Title>
                  {loading ? <Skeleton /> : "Query Details"}
                </Card.Title>

                <div className="card-tools">
                  <FaEdit
                    style={{ color: "blue" }}
                    onClick={() => setModalShow(true)}
                  />
                </div>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={12}>
                    <Row>
                      <Col md={3}>
                        <p className="mb-0">
                          <strong>Query</strong>
                        </p>
                        <p>
                          {loading ? (
                            <Skeleton />
                          ) : (
                            query.query
                          )}
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="mb-0">
                          <strong>User Name</strong>
                        </p>
                        <p>{loading ? <Skeleton /> : query.name}</p>
                      </Col>
                      <Col md={3}>
                        <p className="mb-0">
                          <strong>User Email</strong>
                        </p>
                        <p>{loading ? <Skeleton /> : query.email}</p>
                      </Col>
                      
                      <Col md={3}>
                        <p className="mb-0">
                          <strong>Status</strong>
                        </p>
                        <p>{loading ? <Skeleton /> : query.status}</p>
                      </Col>
                      <Col md={3}>
                        <p className="mb-0">
                          <strong>Created At</strong>
                        </p>
                        <p>
                          {loading ? (
                            <Skeleton />
                          ) : (
                            getDateTime(query.createdAt)
                          )}
                        </p>
                      </Col>
                      <Col md={3}>
                        <p className="mb-0">
                          <strong>Last Update</strong>
                        </p>
                        <p>
                          {loading ? (
                            <Skeleton />
                          ) : (
                            getDateTime(query.updatedAt)
                          )}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <EditQueryModel
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

            {!modalShow && <ToastContainer />}
          </>
        )}
      </Container>
    </motion.div>
  );
};

export default ViewQuery;
