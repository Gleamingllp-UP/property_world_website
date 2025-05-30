import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserPropertyThunk } from '../../../features/property/propertySlice';
import { Edit, Eye, Trash } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

function MyPropertyListing() {
  const dispatch = useDispatch();
  const { isLoading, propertyData } = useSelector((store) => store?.property);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUserPropertyThunk());
  }, [dispatch]);

  const totalPages = Math.ceil((propertyData?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = propertyData?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Listing Property</h2>

      {isLoading ? (
        <p>Loading properties...</p>
      ) : currentItems.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <>
          <table className="table table-striped table-bordered table-hover">
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
              {currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.categoryData?.name || 'N/A'}</td>
                  <td>{item.subCategoryData?.name || 'N/A'}</td>
                  <td>{item.subSubCategoryData?.name || 'N/A'}</td>
                  <td>{item.title}</td>
                  <td>{item.bedrooms}</td>
                  <td>{item.bathrooms}</td>
                  <td>{`AED ${item.price}`}</td>
                 <td className="d-flex gap-2">
                     <Edit style={{ width: '20px', height: '20px', color: '#ffc107', cursor: 'pointer' }} />
                 <Eye style={{ width: '20px', height: '20px', color: '#0d6efd', cursor: 'pointer' }} />
                     <Trash style={{ width: '20px', height: '20px', color: '#dc3545', cursor: 'pointer' }} />
                 </td>

                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 && 'active'}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default MyPropertyListing;
