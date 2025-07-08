import { useEffect } from "react";
import Features from "./Features";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helper/formateDate/formatedDate";
import PropertySide from "./PropertySide";
import SimlarProperty from "./SimlarProperty";

import PropertySocial from "./PropertySocial";
import MediaWithLoader from "../../../Custom_Components/MediaWithLoader";
import ImageWithLoader from "../../../Custom_Components/ImageWithLoader";

import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import { formatPrice } from "../../../helper/function/formatPrice";
import Propertymap from "./Propertymap";
import {
  FloorPlanSkeleton,
  PropertyBuildingInfoSkeleton,
  PropertyDetailsTableSkeleton,
  PropertyFeaturesSkeleton,
  PropertyHeaderSkeleton,
  PropertyInfoSkeleton,
  VirtualTourSkeleton,
} from "../../../Custom_Components/Skeleton/PropertySkeleton";
function PropertyAllInfo() {
  const { propertyDetails, isLoading } = useSelector(
    (store) => store?.property
  );

  useEffect(() => {
    const lightbox2 = GLightbox({
      selector: ".lightbox",
    });

    return () => {
      lightbox2.destroy();
    };
  }, [propertyDetails?.floor_plan]);

  return (
    <section className="property_all_info">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="left_area">
              {isLoading ? (
                <PropertyHeaderSkeleton />
              ) : (
                <>
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="tag">
                        For {propertyDetails?.categoryData?.name || "N/A"}
                      </div>
                      <h2 className="the_comm">
                        {propertyDetails?.title || "N/A"}
                      </h2>
                      <div className="price_d">
                        {formatPrice(propertyDetails?.price)}
                      </div>
                    </div>
                    <PropertySocial />
                  </div>

                  <p>
                    <i className="ri-map-pin-line" /> Location :{" "}
                    {propertyDetails?.address ||
                      propertyDetails?.locationData?.name}
                  </p>
                  <hr />
                </>
              )}
              <div className="key_feature">
                <p>Property DESCRIPTION</p>

                <span className="d-block mb-2">
                  {propertyDetails?.short_description}
                </span>

                <span className="d-block">
                  {propertyDetails?.full_description}
                </span>
              </div>

              <hr />

              {isLoading ? (
                <PropertyFeaturesSkeleton />
              ) : (
                (propertyDetails?.bedrooms != null ||
                  propertyDetails?.bathrooms != null ||
                  propertyDetails?.area > 0) && (
                  <>
                    <div className="key_feature">
                      <p>Key Property Features</p>
                      <ul>
                        {propertyDetails?.bedrooms != null && (
                          <li>
                            <i className="ri-hotel-bed-line" /> Bedrooms:{" "}
                            {propertyDetails?.bedrooms}
                          </li>
                        )}
                        {propertyDetails?.bathrooms != null && (
                          <li>
                            <i className="fa fa-bath" aria-hidden="true" />{" "}
                            Bathrooms: {propertyDetails?.bathrooms}
                          </li>
                        )}
                        {propertyDetails?.area > 0 && (
                          <li>
                            <i className="ri-ruler-line" /> Size:{" "}
                            {propertyDetails?.area} sqft
                          </li>
                        )}
                      </ul>
                    </div>
                    <hr />
                  </>
                )
              )}

              <div className="key_feature">
                <p>Property Information </p>
                <div className="pro_info">
                  {isLoading ? (
                    <PropertyDetailsTableSkeleton />
                  ) : (
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Type</td>
                          <td>
                            {propertyDetails?.subSubCategoryData?.name || ""}
                          </td>
                        </tr>
                        <tr>
                          <td>Purpose</td>
                          <td>
                            For {propertyDetails?.categoryData?.name || ""}
                          </td>
                        </tr>
                        <tr>
                          <td>Reference</td>
                          <td>
                            Ref -{" "}
                            {propertyDetails?.reference_number ??
                              "105235-Fc3aqd"}
                          </td>
                        </tr>
                        <tr>
                          <td>Added on</td>
                          <td>
                            <i className="ri-calendar-2-line" />{" "}
                            {formatDate(propertyDetails?.createdAt, "date")}
                          </td>
                        </tr>
                        <tr>
                          <td>Ownership</td>
                          <td>
                            <i className="ri-verified-badge-fill verified" />{" "}
                            {propertyDetails?.ownership_status || ""}
                          </td>
                        </tr>
                        <tr>
                          <td>Built-up Area </td>
                          <td>
                            <i className="ri-ruler-line" />{" "}
                            {propertyDetails?.area || 0} sqft
                          </td>
                        </tr>
                        <tr>
                          <td>Usage</td>
                          <td>
                            {propertyDetails?.subCategoryData?.name || ""}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <hr />
              <div className="building_info key_feature">
                <p>Building Information</p>
                {isLoading ? (
                  <PropertyBuildingInfoSkeleton />
                ) : (
                  <ul>
                    <li>
                      <i className="ri-building-line" /> Building Name:{" "}
                      {propertyDetails?.building_name || "Al Matter"} Building
                    </li>
                    <li>
                      <i className="ri-building-4-line" /> Total Floors:{" "}
                      {propertyDetails?.total_floors || 0}
                    </li>
                  </ul>
                )}
              </div>

              <Features />

              <Propertymap
                {...(propertyDetails?.lat && propertyDetails?.lng
                  ? {
                      lat: Number(propertyDetails?.lat),
                      lng: Number(propertyDetails?.lng),
                    }
                  : {
                      address: `${propertyDetails?.building_name || ""} ${
                        propertyDetails?.address || ""
                      }`,
                    })}
              />

              <hr />

              {isLoading ? (
                <VirtualTourSkeleton />
              ) : propertyDetails?.virtual_tour ? (
                <div className="key_feature">
                  <p>Virtual Tour </p>
                  <MediaWithLoader
                    src={propertyDetails?.virtual_tour}
                    height={415}
                    className="rounded"
                    fallbackText="Virtual tour not uploaded"
                  />
                  <hr />
                </div>
              ) : null}

              {isLoading ? (
                <FloorPlanSkeleton />
              ) : propertyDetails?.floor_plan?.length > 0 ? (
                <div className="key_feature">
                  <p>Floor Plan</p>
                  <div className="floor_pll">
                    <ul className="row gx-3 gy-4">
                      {propertyDetails.floor_plan.map((floor, index) => (
                        <li key={index} className="col-12 col-sm-6 col-lg-4">
                          <div className="border rounded shadow-sm overflow-hidden h-100">
                            <a
                              href={floor}
                              className="d-block lightbox"
                              data-glightbox="type: image"
                            >
                              <ImageWithLoader
                                src={floor}
                                className="img-fluid w-100"
                                alt={`Floor Plan ${index + 1}`}
                              />
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              <SimlarProperty />

              <div className="key_feature regulatory">
                <p>Regulatory Information</p>
                {isLoading ? (
                  <PropertyInfoSkeleton />
                ) : (
                  <ul>
                    <li>
                      <i className="ri-file-list-3-line" />{" "}
                      <span>RERA Permit No.</span>{" "}
                      {propertyDetails?.permit_number || "N/A"}
                    </li>
                    <li>
                      <i className="ri-user-line" /> <span>Listed by:</span>{" "}
                      {/* {propertyDetails?.userData?.first_name ||
                    propertyDetails?.userData?.last_name
                      ? `${propertyDetails?.userData?.first_name || ""} ${
                          propertyDetails?.userData?.last_name || ""
                        }`.trim()
                      : "Property Finders Real Estate"} */}
                      Property Finders Real Estate
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <PropertySide />
        </div>
      </div>
    </section>
  );
}

export default PropertyAllInfo;
