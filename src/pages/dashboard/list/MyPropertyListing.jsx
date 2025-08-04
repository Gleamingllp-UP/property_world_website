import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePropertyThunk,
  getAllUserPropertyThunk,
} from "../../../features/property/propertySlice";
import { Edit, Eye, Trash } from "lucide-react";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { getSerialNumber } from "../../../helper/function/getSerialNumber";
import { Modal, Button } from "react-bootstrap";
import { showToast } from "../../../utils/toast/toast";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { debounce } from "lodash";
import { formatPrice } from "../../../helper/function/formatPrice";

function MyPropertyListing() {
  const dispatch = useDispatch();

  const { isLoading, propertyData, pagination } = useSelector(
    (store) => store?.property
  );

  const [page, setPage] = useState(1);
  const limit = 5;

  const [status, setStatus] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [rejectedItem, setRejectedItem] = useState(null);

  const navigate = useNavigate();

  const debouncedFetch = useCallback(
    debounce((page, limit, status) => {
      const searchFilters = {
        ...(status !== null && status !== undefined && { is_verified: status }),
      };
      dispatch(getAllUserPropertyThunk({ page, limit, searchFilters }));
    }, 400),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetch(page, limit, status);

    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, page, limit, status]);

  const handleEyeClick = (id) => {
    navigate(`${pageRoutes.PROPERTY_DETAILS}?id=${id}`);
  };

  //Delete Property
  const handleDeleteclick = (id) => {
    setShowModalDelete(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deletePropertyThunk(deleteId));
      if (deletePropertyThunk.fulfilled.match(resultAction)) {
        showToast("Property Deleted Successfull!", "success");
        setTimeout(() => {
          dispatch(getAllUserPropertyThunk({ page, limit }));
          setShowModalDelete(false);
        }, 500);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to delete property.", "error");
    }
  };

  const handleClick = (item) => {
    if (item?.is_verified === 2) {
      setRejectedItem(item);
      setShowModal(true);
    }
  };

  const handleTabSelect = (selectedKey) => {
    const selectedStatus = selectedKey;
    setStatus(selectedStatus);
  };

  return (
    <>
      <div className="container mt-4 my_listing_table">
        <>
          <Tabs activeKey={status} onSelect={handleTabSelect} className="mb-3">
            <Tab eventKey="" title="All"></Tab>

            <Tab eventKey="0" title="Pending"></Tab>

            <Tab eventKey="1" title="Approved"></Tab>

            <Tab eventKey="2" title="Rejected"></Tab>
          </Tabs>

          {isLoading ? (
            <div className="placeholder-glow my-4">
              <span
                className="placeholder bg-secondary-subtle rounded col-3"
                style={{ height: "30px" }}
              ></span>
            </div>
          ) : (
            <h4 className="my-4">
              {status === "0"
                ? "Pending"
                : status === "1"
                ? "Approved"
                : status === "2"
                ? "Rejected"
                : "All"}{" "}
              Property Listings
            </h4>
          )}

          <table className="table table-striped table-hover shadow rounded align-middle">
            <thead className="thead-dark">
              <tr>
                <th>S NO</th>
                <th>Purpose</th>
                <th>Category</th>
                <th>Property Type</th>
                <th>Title</th>
                <th>Bedroom</th>
                <th>Bathroom</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    {Array(10)
                      .fill()
                      .map((_, i) => (
                        <td key={i}>
                          <div className="placeholder-glow">
                            <span
                              className="placeholder bg-secondary-subtle rounded col-12"
                              style={{ height: "18px", display: "block" }}
                            ></span>
                          </div>
                        </td>
                      ))}
                  </tr>
                ))
              ) : propertyData?.length === 0 ? (
                <div className="col-12">
                  <div className="text-center border border-light-subtle rounded py-2 bg-light text-muted fw-medium">
                    No properties found.
                  </div>
                </div>
              ) : (
                propertyData &&
                propertyData?.map((item, index) => (
                  <tr key={item?._id}>
                    <td>{getSerialNumber(index, page, limit)}</td>
                    <td>{item?.categoryData?.name || "N/A"}</td>
                    <td>{item?.subCategoryData?.name || "N/A"}</td>
                    <td>{item?.subSubCategoryData?.name || "N/A"}</td>
                    <td>{item?.title}</td>
                    <td>{item?.bedrooms || "N/A"}</td>
                    <td>{item?.bathrooms || "N/A"}</td>
                    <td>{formatPrice(item?.price)}</td>
                    <td
                      onClick={() => handleClick(item)}
                      style={{
                        color:
                          item?.is_verified === 1
                            ? "green"
                            : item?.is_verified === 2
                            ? "red"
                            : "orange",
                        cursor: item?.is_verified === 2 ? "pointer" : "default",
                      }}
                    >
                      {item?.is_verified === 1
                        ? "Approved"
                        : item?.is_verified === 2
                        ? "Rejected"
                        : "Pending"}
                    </td>
                    <td
                      style={{
                        width: "150px",
                      }}
                    >
                      <Edit
                        onClick={() =>
                          navigate(
                            pageRoutes.PROPERTY_UPDATE + `?id=${item?._id}`
                          )
                        }
                        style={{
                          width: "15px",
                          height: "15px",
                          color: "#ffc107",
                          cursor: "pointer",
                        }}
                      />
                      <Eye
                        onClick={() => handleEyeClick(item?._id)}
                        className="mx-2"
                        style={{
                          width: "15px",
                          height: "15px",
                          color: "#0d6efd",
                          cursor: "pointer",
                        }}
                      />
                      <Trash
                        onClick={() => handleDeleteclick(item?._id)}
                        style={{
                          width: "15px",
                          height: "15px",
                          color: "#dc3545",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>

        {/* Pagination Controls */}
        {!isLoading && (
          <CustomPagination
            total={pagination?.total}
            page={page}
            limit={limit}
            onPageChange={(newPage) => setPage(newPage)}
            className="your-optional-custom-class"
          />
        )}
      </div>

      {/* Rejection Reason Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rejection Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rejectedItem?.rejection_info?.reason
            ? rejectedItem.rejection_info?.reason
            : "This property was rejected. Please contact admin for more details."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete  Modal */}
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do You Want To Delete This Property.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
            No
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyPropertyListing;
