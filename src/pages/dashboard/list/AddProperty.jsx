import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActiveCategoryThunk,
  getAllActiveSubCategoryThunk,
  getAllActivesubSubCategoryThunk,
  getAllActiveLocationThunk,
  resetActiveData,
} from "../../../features/activeData/activeDataSlice";
import { amenitiesList, featuresList } from "../../../utils/requiredFormFields/requiredproparty";
const AddProperty = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
 

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectlocation, setSelectedLocationId] = useState(null);
  const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] =
    useState(null);
  const { categories, subCategories, subSubCategories, loading, location } = useSelector(
    (store) => store?.activeData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await dispatch(getAllActiveCategoryThunk()).unwrap();

      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    dispatch(getAllActiveLocationThunk());

    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchSubCategories = async () => {
      try {
        const res = await dispatch(
          getAllActiveSubCategoryThunk({ categoryId: selectedCategoryId })
        ).unwrap();
   
      } catch (err) {
        console.error("Error fetching subcategories", err);
      }
    };
    fetchSubCategories();
  }, [selectedCategoryId, dispatch]);

  useEffect(() => {
    if (!selectedSubCategoryId) return;

    dispatch(
      getAllActivesubSubCategoryThunk({
        subCategoryId: selectedSubCategoryId,
      })
    );
  }, [selectedSubCategoryId, dispatch]);

  const [formData, setFormData] = useState({
    propertyPurpose: "",
    propertyCategory: "",
    propertyType: "",
    location: "",
    unitNumber: "",
    permitNumber: "",
    size: "",
    price: "",
    rentPaid: "",
    features: [],
    parkingSpaces: "",
    title: "",
    ownershipStatus: "",
    description: "",
    amenities: [],
    propertyCity: "",
    thumbnailImage: null,
    galleryImages: [],
  });

 



  const formattedAmenities = amenitiesList.map((amenity) => ({
    value: amenity,
    label: amenity,
  }));
  const handleSelectChange = (selectedOptions) => {
    const selectedAmenities = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({
      ...formData,
      amenities: selectedAmenities,
    });
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const values = formData[name];
      setFormData({
        ...formData,
        [name]: checked
          ? [...values, value]
          : values.filter((v) => v !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        ...(name === "propertyCategory" ? { propertyType: "" } : {}),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const getFilteredPropertyTypes = () => {
    if (formData.propertyCategory === "Residential") return residentialTypes;
    if (formData.propertyCategory === "Commercial") return commercialTypes;
    return [];
  };

  return (
    <div className="container py-4">
      <h2>Property Details Form</h2>
      <form onSubmit={handleSubmit} >
        {/* Purpose, Category, Property Type in one row */}
        <div className="row">
          {/* Purpose: Sale / Rent */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Purpose</label>
            <select
              className="form-select"
              name="propertyPurpose"
              value={selectedCategoryId}
              onChange={(e)=>setSelectedCategoryId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {categories && categories?.map((cat, index) => {
                return (
                 <option value={cat?._id} key={index}>{cat?.name}</option>
                )
              })}
              
              
            </select>
          </div>

          {/* Category: Residential / Commercial */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Category</label>
             <select
              className="form-select"
              name="propertyPurpose"
              value={selectedSubCategoryId}
              onChange={(e)=>setSelectedSubCategoryId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {subCategories && subCategories?.map((subcat, index) => {
                return (
                 <option value={subcat?._id} key={index}>{subcat?.name}</option>
                )
              })}
              
              
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Property Type</label>
            <select
              className="form-select"
              name="propertyPurpose"
              value={selectedSubSubCategoryId}
              onChange={(e)=>setSelectedSubSubCategoryId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {subSubCategories && subSubCategories?.map((subsubcat, index) => {
                return (
                 <option value={subsubcat?._id} key={index}>{subsubcat?.name}</option>
                )
              })}
              
              
            </select>
          </div>
        </div>

        <div className="row">
          {/* City Dropdown */}
          <div className="col-md-4 mb-3">
            <label className="form-label">City</label>
            <select
              className="form-select"
              name="propertyPurpose"
              value={selectlocation}
              onChange={(e)=>setSelectedLocationId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {location && location?.map((cat, index) => {
                return (
                 <option value={cat?._id} key={index}>{cat?.name}</option>
                )
              })}
              
              
            </select>
          </div>

          {/* Thumbnail Upload + Preview */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Thumbnail Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, thumbnailImage: e.target.files[0] })
              }
            />
            {formData.thumbnailImage && (
              <div
                className="mt-2 position-relative d-inline-block"
                style={{
                  height: "100px",
                  width: "100px",
                }}
              >
                <img
                  src={URL.createObjectURL(formData.thumbnailImage)}
                  alt="Thumbnail Preview"
                  className="border"
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-danger position-absolute top-0 start-100 translate-middle"
                  style={{
                    fontSize: "12px",
                    padding: "2px 6px",
                    lineHeight: "1",
                  }}
                  onClick={() =>
                    setFormData({ ...formData, thumbnailImage: null })
                  }
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* Gallery Upload + Previews */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Gallery Images</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={(e) =>
                setFormData({
                  ...formData,
                  galleryImages: Array.from(e.target.files),
                })
              }
            />
            <div className="d-flex flex-wrap gap-2 mt-2">
              {formData.galleryImages.map((img, idx) => (
                <div key={idx} className="position-relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Gallery ${idx}`}
                    width="80"
                    height="70"
                    className="border"
                  />
                  <button
                    type="button"
                    className="btn btn-danger position-absolute top-0 start-100 translate-middle"
                    style={{
                      fontSize: "12px",
                      padding: "2px 6px",
                      lineHeight: "1",
                    }}
                    onClick={() => {
                      const updatedImages = formData.galleryImages.filter(
                        (_, i) => i !== idx
                      );
                      setFormData({
                        ...formData,
                        galleryImages: updatedImages,
                      });
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Unit Number</label>
            <input
              type="text"
              className="form-control"
              name="unitNumber"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Permit Number</label>
            <input
              type="text"
              className="form-control"
              name="permitNumber"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Size / Price / Rent Paid */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Size (sqft)</label>
            <input
              type="number"
              className="form-control"
              name="size"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Rent is Paid</label>
            <select
              className="form-select"
              name="rentPaid"
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </select>
          </div>
        </div>

        {/* Features */}
        <div className="mb-3">
          <label className="form-label">Features</label>
          <br />
          {featuresList?.map((feature) => (
            <div key={feature} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value={feature}
                name="features"
                onChange={handleChange}
              />
              <label className="form-check-label">{feature}</label>
            </div>
          ))}
        </div>

        {/* Parking / Title / Ownership */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Parking Spaces</label>
            <input
              type="number"
              className="form-control"
              name="parkingSpaces"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Ownership Status</label>
            <select
              className="form-select"
              name="ownershipStatus"
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              <option value="Freehold">Freehold</option>
              <option value="Leasehold">Leasehold</option>
            </select>
          </div>
        </div>

        <div className="row">
          {/* Short Description */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Short Description</label>
            <textarea
              className="form-control"
              rows="4"
              name="shortDescription"
              onChange={handleChange}
              value={formData.shortDescription || ""}
            ></textarea>
          </div>

          {/* Full Description */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              name="description"
              onChange={handleChange}
              value={formData.description || ""}
            ></textarea>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-3">
          <label className="form-label">Building Amenities / Facilities</label>
          <div className="row">
            <div className="col-md-6">
              <Select
                className=""
                options={amenitiesList?.map((item)=>{
                 return(
                  {
                     label:item,
                     value:item
                  }
                 )
                })}
                onChange={handleSelectChange}
                name="amenities"
                isMulti
                placeholder="-- Select Amenities --"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
