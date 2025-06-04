import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserPropertyThunk } from "../../../features/property/propertySlice";
import { Edit, Eye, Trash } from "lucide-react";
import { CustomPagination } from "../../../Custom_Components/CustomPagination";

function MyPropertyListing() {
  const dispatch = useDispatch();
  const { isLoading, propertyData, pagination } = useSelector(
    (store) => store?.property
  );

  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    dispatch(getAllUserPropertyThunk({ page, limit }));
  }, [dispatch, page]);

  return (
    <div className="container mt-4 my_listing_table">
      <h4 className="mb-3">Listing Property</h4>

      {isLoading ? (
        <p>Loading properties...</p>
      ) : propertyData?.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <>
          <table className="table table-striped  table-hover">
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {propertyData?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item?.categoryData?.name || "N/A"}</td>
                  <td>{item?.subCategoryData?.name || "N/A"}</td>
                  <td>{item?.subSubCategoryData?.name || "N/A"}</td>
                  <td>{item?.title}</td>
                  <td>{item?.bedrooms}</td>
                  <td>{item?.bathrooms}</td>
                  <td>{`AED ${item?.price}`}</td>
                  <td className="">
                    <Edit
                      style={{
                        width: "15px",
                        height: "15px",
                        color: "#ffc107",
                        cursor: "pointer",
                      }}
                    />
                    <Eye
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

          {/* Pagination Controls */}
        </>
      )}
      <CustomPagination
        total={pagination?.total}
        page={page}
        limit={limit}
        onPageChange={(newPage) => setPage(newPage)}
        className="your-optional-custom-class"
      />
    </div>
  );
}

export default MyPropertyListing;
