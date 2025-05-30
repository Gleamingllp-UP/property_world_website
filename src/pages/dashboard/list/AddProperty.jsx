import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllActiveCategoryThunk,
  getAllActiveSubCategoryThunk,
  getAllActivesubSubCategoryThunk,
  getAllActiveLocationThunk,
} from "../../../features/activeData/activeDataSlice";
import {
  amenitiesList,
  featuresList,
} from "../../../utils/requiredFormFields/requiredproparty";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "../../../Custom_Components/ErrorMessage";
import { getValidationRules } from "../../../helper/function/getValidationRules";
import { generateHandoverOptions } from "../../../helper/function/generateHandoverOptions";
import { formatRange } from "../../../helper/function/formatRange";
import ButtonWithSpin from "../../../Custom_Components/ButtonWithSpin";
import { creatPropertyThunk } from "../../../features/property/propertySlice";
import { getUserData } from "../../../features/user/userSlice";
import { showToast } from "../../../utils/toast/toast";
import { pageRoutes } from "../../../router/pageRoutes";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { categories, subCategories, subSubCategories, location } = useSelector(
    (store) => store?.activeData
  );
  const { loading } = useSelector((store) => store?.property);
  const { userData } = useSelector((store) => store?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bedRoom, setBedRoom] = useState([]);
  const [bathRoom, setBathRoom] = useState([]);
  const [isDropDownOpen2, setIsDropDownOpen2] = useState(false);

  const selectedPurpose = watch("category");
  const selectedSubCategory = watch("subCategory");

  const thumbnailImage = watch("thumbnail_img");
  const imagesArray = watch("gallery");
  const constructionStatus = watch("construction_status");

  const selectedCategoryName = categories?.find(
    (cat) => cat._id === selectedPurpose
  )?.name;

  const selectedSubCategoryName = subCategories?.find(
    (scat) => scat._id === selectedSubCategory
  )?.name;

  const galleryImage = Array.isArray(imagesArray)
    ? imagesArray
    : Array.from(imagesArray || []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(getAllActiveCategoryThunk()).unwrap();
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    dispatch(getAllActiveLocationThunk());
    dispatch(getUserData());

    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    if (!selectedPurpose) return;

    const fetchSubCategories = async () => {
      try {
        await dispatch(
          getAllActiveSubCategoryThunk({ categoryId: selectedPurpose })
        ).unwrap();
      } catch (err) {
        console.error("Error fetching subcategories", err);
      }
    };
    fetchSubCategories();
  }, [selectedPurpose, dispatch]);

  useEffect(() => {
    if (!selectedSubCategory) return;

    dispatch(
      getAllActivesubSubCategoryThunk({
        subCategoryId: selectedSubCategory,
      })
    );
  }, [selectedSubCategory, dispatch]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      setError("gallery", {
        type: "manual",
        message: "Please select at least one image.",
      });
      setValue("gallery", []);
    } else if (files.length > 5) {
      setError("gallery", {
        type: "manual",
        message: "You can select a maximum of 5 images.",
      });
      setValue("gallery", []);
    } else {
      clearErrors("gallery");
      setValue("gallery", files);
    }
  };
  const removeImage = (idx) => {
    const updated = galleryImage?.filter((_, i) => i !== idx);
    setValue("gallery", updated);

    if (updated.length === 0) {
      setError("gallery", {
        type: "manual",
        message: "Please select at least one image.",
      });
    } else {
      clearErrors("gallery");
    }
  };

  const handleCheckboxChangeBedroom = (e, value) => {
    const checked = e.target.checked;
    setBedRoom((prev) => {
      const updated = checked
        ? [...prev, value]
        : prev.filter((v) => v !== value);
      const uniqueSorted = [...new Set(updated)].sort((a, b) => a - b);

      setValue("bedrooms", uniqueSorted, { shouldValidate: true });

      return uniqueSorted;
    });
  };

  const handleCheckboxChangeBathroom = (e, value) => {
    const checked = e.target.checked;
    setBathRoom((prev) => {
      const updated = checked
        ? [...prev, value]
        : prev.filter((v) => v !== value);

      const uniqueSorted = [...new Set(updated)].sort((a, b) => a - b);

      setValue("bathrooms", uniqueSorted, { shouldValidate: true });

      return uniqueSorted;
    });
  };

  const renderSelectedBedsAndBaths = () => {
    const bedText = formatRange(bedRoom, "Bed", true);
    const bathText = formatRange(bathRoom, "Bath");
    return `${bedText} | ${bathText}`;
  };

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    const maxBedroom = data?.bedrooms?.length
      ? Math.max(...data.bedrooms)
      : null;
    const maxBathRoom = data?.bathrooms?.length
      ? Math.max(...data.bathrooms)
      : null;

    formData.append("title", data?.title || "");
    formData.append("short_description", data?.short_description || "");
    formData.append("full_description", data?.full_description || "");
    formData.append("category", data?.category || "");
    formData.append("subCategory", data?.subCategory || "");
    formData.append("subSubCategory", data?.subSubCategory || "");
    formData.append("duration", data?.duration || "");
    formData.append("bedrooms", maxBedroom || "");
    formData.append("bathrooms", maxBathRoom || "");
    formData.append("price", data?.price || "");
    formData.append("area", data?.area || "");
    formData.append("handover_by", data?.handover_by || "");
    formData.append("unit_number", data?.unit_number || "");
    formData.append("permit_number", data?.permit_number || "");
    formData.append(
      "parking_spaces",
      data?.parking_spaces?.toLowerCase() === "yes" ? true : false
    );
    formData.append("ownership_status", data?.ownership_status || "");
    formData.append("construction_status", data?.construction_status || "");
    formData.append("location", data?.location || "");
    formData.append("address", data?.address || "");
    formData.append("user", userData?._id || "");
    formData.append("product_status", data?.product_status || "");

    if (data?.features?.length) {
      formData.append("features", JSON.stringify(data?.features));
    }

    if (data?.building_facilities?.length) {
      formData.append(
        "building_facilities",
        JSON.stringify(data?.building_facilities)
      );
    }

    if (data?.tour_types?.length) {
      formData.append("tour_types", JSON.stringify(data?.tour_types));
    }

    if (data?.thumbnail_img?.[0] instanceof File) {
      formData.append("thumbnail_img", data?.thumbnail_img?.[0]);
    }

    if (data?.gallery?.length) {
      Array.from(data?.gallery)?.forEach((file) => {
        formData.append("gallery", file);
      });
    }

    try {
      const resultAction = await dispatch(creatPropertyThunk(formData));
      if (creatPropertyThunk.fulfilled.match(resultAction)) {
        showToast("Property Created Successfull!", "success");
        setTimeout(() => {
          navigate(pageRoutes.USER_PROPERTY_LISTING);
        }, 500);
      } else {
        throw new Error(resultAction?.error?.message);
      }
    } catch (error) {
      showToast(error?.message || "Failed to create property.", "error");
    }
  };

  return (
    <div className="container py-4">
      <h2>Property Details Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Purpose, Category, Property Type in one row */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Purpose</label>
            <select
              className="form-select"
              {...register("category", {
                required: "Purpose is required",
              })}
              onChange={(e) => {
                const value = e.target.value;
                // Call RHF's internal onChange handler
                const event = { target: { name: "category", value } };
                register("category").onChange(event);

                setValue("construction_status", "", { shouldValidate: true });
                setValue("subCategory", "", { shouldValidate: true });
                setValue("subSubCategory", "", { shouldValidate: true });
                setValue("handover_by", "", { shouldValidate: true });
              }}
            >
              <option value="">-- Select --</option>
              {categories.map((cat) => (
                <option value={cat?._id} key={cat?._id}>
                  {cat?.name}
                </option>
              ))}
            </select>
            {errors?.category && (
              <ErrorMessage message={errors?.category?.message} />
            )}
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              disabled={!selectedPurpose}
              {...register("subCategory", {
                required: "Category is required",
              })}
              onChange={(e) => {
                const value = e.target.value;
                const event = { target: { name: "subCategory", value } };
                register("subCategory").onChange(event);

                setValue("bedrooms", "", { shouldValidate: true });
                setValue("bathrooms", "", { shouldValidate: true });
                setValue("area", "", { shouldValidate: true });
              }}
            >
              <option value="">-- Select --</option>
              {subCategories.map((subcat) => (
                <option value={subcat?._id} key={subcat?._id}>
                  {subcat?.name}
                </option>
              ))}
            </select>
            {errors?.subCategory && (
              <ErrorMessage message={errors?.subCategory?.message} />
            )}
          </div>

          {/* Property Type */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Property Type</label>
            <select
              className="form-select"
              disabled={!selectedSubCategory}
              {...register("subSubCategory", {
                required: "Property Type is required",
              })}
            >
              <option value="">-- Select --</option>
              {subSubCategories.map((subsubcat) => (
                <option value={subsubcat?._id} key={subsubcat?._id}>
                  {subsubcat?.name}
                </option>
              ))}
            </select>
            {errors?.subSubCategory && (
              <ErrorMessage message={errors?.subSubCategory?.message} />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">City</label>
            <select
              className="form-select"
              name="city"
              {...register("location", {
                required: "Location is required",
              })}
            >
              <option value="">-- Select --</option>
              {location &&
                location?.map((cat, index) => {
                  return (
                    <option value={cat?._id} key={index}>
                      {cat?.name}
                    </option>
                  );
                })}
            </select>
            {errors?.location && (
              <ErrorMessage message={errors?.location?.message} />
            )}
          </div>

          {/*Construction Status */}
          {selectedCategoryName === "Buy" && (
            <div className="col-md-4 mb-3">
              <label className="form-label">Construction Status</label>
              <select
                className="form-select"
                name="construction_status"
                {...register("construction_status", {
                  required: "Construction Status is required",
                })}
                onChange={(e) => {
                  const value = e.target.value;
                  const event = {
                    target: { name: "construction_status", value },
                  };
                  register("construction_status").onChange(event);

                  setValue("bedrooms", "", { shouldValidate: true });
                  setValue("bathrooms", "", { shouldValidate: true });
                  setValue("handover_by", "", { shouldValidate: true });
                  setValue("area", "", { shouldValidate: true });
                }}
              >
                <option value="">-- Select --</option>
                {["Ready", "Off-plan"]?.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
              {errors?.construction_status && (
                <ErrorMessage message={errors?.construction_status?.message} />
              )}
            </div>
          )}

          {/*Handover By */}
          {selectedCategoryName === "Buy" &&
            constructionStatus === "Off-plan" && (
              <div className="col-md-4 mb-3">
                <label className="form-label">Handover By</label>
                <select
                  className="form-select"
                  name="handover_by"
                  {...register("handover_by", {
                    validate: (value) =>
                      constructionStatus === "Off-plan" && !value
                        ? "Handover By is required for Off-plan"
                        : true,
                  })}
                >
                  <option value="">-- Select --</option>
                  {generateHandoverOptions() &&
                    generateHandoverOptions()?.map((option, index) => {
                      return (
                        <>
                          <option key={index} value={option?.value}>
                            {option?.label}
                          </option>
                        </>
                      );
                    })}
                </select>
                {errors?.handover_by && (
                  <ErrorMessage message={errors?.handover_by?.message} />
                )}
              </div>
            )}

          {/* Thumbnail Upload + Preview */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Thumbnail Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              {...register("thumbnail_img", {
                required: "Thumbnail image is required",
              })}
            />
            {errors?.thumbnail_img && (
              <ErrorMessage message={errors?.thumbnail_img?.message} />
            )}
            {thumbnailImage?.[0] && (
              <div
                className="mt-2 position-relative d-inline-block"
                style={{
                  height: "100px",
                  width: "100px",
                }}
              >
                <img
                  src={URL.createObjectURL(thumbnailImage?.[0])}
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
                  onClick={() => {
                    setValue("thumbnail_img", null);
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Gallery Images</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              placeholder="select files"
              onChange={handleFileChange}
              {...register("gallery", {
                validate: (files) => {
                  if (!files || files.length === 0) {
                    return "Please select at least one image.";
                  }
                  if (files.length > 5) {
                    return "You can select a maximum of 5 images.";
                  }
                  return true;
                },
              })}
            />
            {errors?.gallery && (
              <ErrorMessage message={errors?.gallery?.message} />
            )}

            <div className="d-flex flex-wrap gap-2 mt-2">
              {galleryImage?.length > 0 &&
                galleryImage?.map((img, idx) => (
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
                      onClick={() => removeImage(idx)}
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
              name="address"
              {...register(
                "address",
                getValidationRules({ label: "Address", type: "title" })
              )}
            />
            {errors?.address && (
              <ErrorMessage message={errors?.address?.message} />
            )}
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Unit Number</label>
            <input
              type="text"
              className="form-control"
              name="unitNumber"
              {...register(
                "unit_number",
                getValidationRules({ label: "Unit Number", type: "number" })
              )}
            />
            {errors?.unit_number && (
              <ErrorMessage message={errors?.unit_number?.message} />
            )}
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Permit Number</label>
            <input
              type="text"
              className="form-control"
              name="permitNumber"
              {...register(
                "permit_number",
                getValidationRules({ label: "Permit Number", type: "number" })
              )}
            />
            {errors?.permit_number && (
              <ErrorMessage message={errors?.permit_number?.message} />
            )}
          </div>
        </div>

        {/* Size / Price / Rent Paid /*/}
        <div className="row">
          {constructionStatus !== "Off-plan" &&
            (selectedSubCategoryName === "Commercial" ? (
              <div className="col-md-4 mb-3">
                <label className="form-label">Ares Size (sqft)</label>
                <input
                  type="number"
                  className="form-control"
                  name="size"
                  {...register(
                    "area",
                    getValidationRules({ label: "Area", type: "number" })
                  )}
                />
                {errors?.area && (
                  <ErrorMessage message={errors?.area?.message} />
                )}
              </div>
            ) : (
              <div className="col-md-4">
                <label className="form-label">Bedrooms & Bathroom</label>

                {/* Main select-like box */}
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  name="price"
                  onClick={() => {
                    setIsDropDownOpen2(!isDropDownOpen2);
                  }}
                  placeholder={
                    bedRoom.length > 0 || bathRoom.length > 0
                      ? renderSelectedBedsAndBaths()
                      : "Beds & Baths"
                  }
                />
                {errors?.bedrooms ? (
                  <ErrorMessage message={errors?.bedrooms?.message} />
                ) : errors?.bathrooms ? (
                  <ErrorMessage message={errors?.bathrooms?.message} />
                ) : null}

                {/* Hidden content with checkboxes */}
                <div
                  className={
                    isDropDownOpen2
                      ? "content-wrapper d-block"
                      : "content-wrapper"
                  }
                  id="roomOptions"
                >
                  <div className="room-section" id="bedroomSection">
                    <div className="room-title">Bedroom</div>
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="studio"
                        value={0}
                        checked={bedRoom?.includes(0)}
                        onChange={(e) => handleCheckboxChangeBedroom(e, 0)}
                      />
                      <label htmlFor="studio">Studio</label>

                      {[...Array(8)].map((_, i) => {
                        const value = i + 1;
                        const labelText = value === 8 ? "7+" : value;

                        return (
                          <React.Fragment key={i}>
                            <input
                              type="checkbox"
                              id={`bedroom-${value}`}
                              value={value}
                              checked={bedRoom?.includes(value)}
                              onChange={(e) =>
                                handleCheckboxChangeBedroom(e, value)
                              }
                            />
                            <label htmlFor={`bedroom-${value}`}>
                              {labelText}
                            </label>
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Hidden field for RHF validation */}
                    <input
                      type="hidden"
                      {...register("bedrooms", {
                        required:
                          "Please select at least one bedroom or studio",
                      })}
                    />
                  </div>
                  <div className="room-section" id="bathroomSection">
                    <div className="room-title">Bathroom</div>
                    <div className="checkbox-group">
                      {[...Array(8)].map((_, i) => {
                        const value = i + 1;
                        const labelText = value === 8 ? "7+" : value;

                        return (
                          <React.Fragment key={i}>
                            <input
                              type="checkbox"
                              id={`bathRoom-${value}`}
                              value={value}
                              checked={bathRoom?.includes(value)}
                              onChange={(e) =>
                                handleCheckboxChangeBathroom(e, value)
                              }
                            />
                            <label htmlFor={`bathRoom-${value}`}>
                              {labelText}
                            </label>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    {/* Hidden field for RHF validation */}
                    <input
                      type="hidden"
                      {...register("bathrooms", {
                        required: "Please select at least one bathroom",
                      })}
                    />
                  </div>
                </div>
              </div>
            ))}

          <div className="col-md-4 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              {...register(
                "price",
                getValidationRules({ label: "Price", type: "number" })
              )}
            />
            {errors?.price && <ErrorMessage message={errors?.price?.message} />}
          </div>

          {selectedCategoryName === "Rent" && (
            <div className="col-md-4 mb-3">
              <label className="form-label">Rent is Paid</label>
              <select
                className="form-select"
                name="rentPaid"
                {...register("duration", {
                  validate: (value) =>
                    selectedCategoryName === "Rent" && !value
                      ? "Duration is required for Rent"
                      : true,
                })}
              >
                <option value="">-- Select --</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Weekly">Weekly</option>
                <option value="Daily">Daily</option>
              </select>
              {errors?.duration && (
                <ErrorMessage message={errors?.duration?.message} />
              )}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-3">
          <label className="form-label">Features</label>
          <br />
          {featuresList?.map((feature) => (
            <div key={feature} className="form-check form-check-inline">
              <label className="form-check-label">{feature}</label>
              <input
                className="form-check-input"
                type="checkbox"
                value={feature}
                name="features"
                {...register("features", {
                  validate: (value) =>
                    value?.length > 0 || "Please select at least one feature",
                })}
              />
            </div>
          ))}
          {errors?.features && (
            <ErrorMessage message={errors?.features?.message} />
          )}
        </div>

        {/* Parking / Title / Ownership */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Parking Spaces</label>
            <select
              className="form-select"
              name="parking_spaces"
              {...register(
                "parking_spaces",
                getValidationRules({ label: "parking Spaces" })
              )}
            >
              <option value="">-- Select --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors?.parking_spaces && (
              <ErrorMessage message={errors?.parking_spaces?.message} />
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              {...register(
                "title",
                getValidationRules({ label: "Title", type: "title" })
              )}
            />
            {errors?.title && <ErrorMessage message={errors?.title?.message} />}
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Ownership Status</label>
            <select
              className="form-select"
              name="ownershipStatus"
              {...register(
                "ownership_status",
                getValidationRules({ label: "Ownership Status" })
              )}
            >
              <option value="">-- Select --</option>
              <option value="Freehold">Freehold</option>
              <option value="Leasehold">Leasehold</option>
            </select>
            {errors?.ownership_status && (
              <ErrorMessage message={errors?.ownership_status?.message} />
            )}
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
              {...register(
                "short_description",
                getValidationRules({
                  label: "Short Description",
                  type: "title",
                })
              )}
            ></textarea>
            {errors?.short_description && (
              <ErrorMessage message={errors?.short_description?.message} />
            )}
          </div>

          {/* Full Description */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              name="fullDescription"
              {...register(
                "full_description",
                getValidationRules({
                  label: "Full Description",
                  type: "title",
                })
              )}
            ></textarea>
            {errors?.full_description && (
              <ErrorMessage message={errors?.full_description?.message} />
            )}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-3">
          <label className="form-label">Building Amenities / Facilities</label>
          <div className="row">
            <div className="col-md-6">
              <Controller
                name="building_facilities"
                control={control}
                rules={{
                  validate: (value) =>
                    value && value.length > 0
                      ? true
                      : "Please select at least one amenity",
                }}
                render={({ field }) => (
                  <Select
                    isMulti
                    options={amenitiesList?.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    onChange={(selectedOptions) =>
                      field.onChange(
                        selectedOptions.map((option) => option.value)
                      )
                    }
                    placeholder="-- Select Amenities --"
                  />
                )}
              />

              {errors?.building_facilities && (
                <ErrorMessage message={errors.building_facilities.message} />
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <ButtonWithSpin />
        ) : (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProperty;
