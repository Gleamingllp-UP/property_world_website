import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserPropertyThunk } from "../../../features/property/propertySlice";
import { Edit, Eye, Trash } from "lucide-react";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../router/pageRoutes";
import { getSerialNumber } from "../../../helper/function/getSerialNumber";
import { Modal, Button } from "react-bootstrap";

function MyPropertyListing() {
  const dispatch = useDispatch();
  const { isLoading, propertyData, pagination } = useSelector(
    (store) => store?.property
  );

  const [page, setPage] = useState(1);
  const limit = 5;

  const [showModal, setShowModal] = useState(false);
  const [rejectedItem, setRejectedItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUserPropertyThunk({ page, limit }));
  }, [dispatch, page]);

  const handleEyeClick = (id) => {
    navigate(`${pageRoutes.PROPERTY_DETAILS}?id=${id}`);
  };

  const handleClick = (item) => {
    if (item?.is_verified === 2) {
      setRejectedItem(item);
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="container mt-4 my_listing_table">
        <h4 className="mb-3">Listing Property</h4>

        {isLoading ? (
          <p>Loading properties...</p>
        ) : propertyData?.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <>
            <table className="table table-striped table-hover">
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
                {propertyData?.map((item, index) => (
                  <tr key={item?._id}>
                    <td>{getSerialNumber(index, page, limit)}</td>
                    <td>{item?.categoryData?.name || "N/A"}</td>
                    <td>{item?.subCategoryData?.name || "N/A"}</td>
                    <td>{item?.subSubCategoryData?.name || "N/A"}</td>
                    <td>{item?.title}</td>
                    <td>{item?.bedrooms}</td>
                    <td>{item?.bathrooms}</td>
                    <td>{`AED ${item?.price}`}</td>
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
                    <td>
                      <Edit
                        onClick={() =>
                          navigate(pageRoutes.PROPERTY_UPDATE + `?id=${item?._id}`)
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
                        style={{
                          width: "15px",
                          height: "15px",
                          color: "#dc3545",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Pagination Controls */}
        <CustomPagination
          total={pagination?.total}
          page={page}
          limit={limit}
          onPageChange={(newPage) => setPage(newPage)}
          className="your-optional-custom-class"
        />
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
    </>
  );
}

export default MyPropertyListing;
