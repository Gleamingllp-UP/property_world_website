export const HomeCategoryPropertySkeleton = () => {
  return Array.from({ length: 6 })?.map((_, i) => {
    return (
      <div className="col-sm-4" key={i}>
        <div className="my_property placeholder-glow ">
          {/* Image Skeleton */}
          <div className="photo_my_photo position-relative">
            <div
              className="placeholder-glow w-100 bg-light mb-2"
              style={{ height: "250px", borderRadius: "8px" }}
            ></div>

            {/* Category Label Skeleton */}
            <span
              className="placeholder bg-danger-subtle text-danger-emphasis d-inline-block rounded position-absolute top-0 start-0 m-2"
              style={{ width: "80px", height: "25px" }}
            ></span>

            {/* Feature Icons Skeleton */}
            <div className="new_listng d-flex justify-content-between px-2">
              <div className="placeholder-glow me-2">
                <span
                  className="placeholder bg-secondary-subtle rounded"
                  style={{ width: "60px", height: "18px" }}
                ></span>
              </div>
              <div
                className="placeholder-glow "
                style={{
                  marginRight: "0px ",
                }}
              >
                <span
                  className="placeholder bg-secondary-subtle rounded"
                  style={{ width: "80px", height: "18px" }}
                ></span>
              </div>
            </div>
          </div>

          {/* Property Info Skeleton */}
          <div className="property_data mt-3">
            {/* Lease Duration */}
            <div className="lease mb-2 placeholder-glow">
              <span
                className="placeholder bg-secondary-subtle rounded d-inline-block"
                style={{ width: "100px", height: "18px" }}
              ></span>
            </div>

            {/* Title */}
            <h4 className="placeholder-glow mb-2">
              <span
                className="placeholder bg-secondary-subtle rounded col-9 d-block"
                style={{ height: "20px" }}
              ></span>
            </h4>

            {/* Short Description */}
            <div className="pro_diss mb-2">
              <span
                className="placeholder bg-secondary-subtle rounded d-block mb-1"
                style={{ height: "14px", width: "90%" }}
              ></span>
              <span
                className="placeholder bg-secondary-subtle rounded d-block"
                style={{ height: "14px", width: "80%" }}
              ></span>
            </div>

            {/* Location Info */}
            <div className="other_data_list d-flex justify-content-start mb-2">
              <div
                className="placeholder bg-secondary-subtle rounded"
                style={{ width: "100px", height: "14px" }}
              ></div>
              <div
                className="placeholder bg-secondary-subtle rounded"
                style={{ width: "120px", height: "14px" }}
              ></div>
            </div>

            {/* Action Section */}
            <div className="action_p d-flex justify-content-between align-items-center">
              <div
                className="placeholder bg-secondary-subtle rounded"
                style={{ width: "120px", height: "25px" }}
              ></div>
              <div
                className="placeholder bg-secondary-subtle rounded"
                style={{ width: "120px", height: "25px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export const PropertyListingCardSkeleton = () => {
  return Array.from({ length: 5 })?.map((_, i) => {
    return (
      <div className="list_box normal_listing mb-4" key={i}>
        <div className="row">
          {/* Left Side Skeleton */}
          <div className="col-lg-5">
            <div className="normal_slider position-relative">
              {/* Agent Tag */}
              <div className="placeholder-glow position-absolute top-0 start-0 ms-2 mt-2">
                <span
                  className="placeholder bg-secondary-subtle rounded px-3 py-1 d-inline-block"
                  style={{ width: "80px", height: "20px" }}
                ></span>
              </div>

              {/* Save Button */}
              <div className="position-absolute top-0 end-0 me-2 mt-2">
                <span
                  className="placeholder bg-secondary-subtle rounded-circle d-inline-block"
                  style={{ width: "30px", height: "30px" }}
                ></span>
              </div>

              {/* Slider with 2 Images */}
              <div className="my-slider">
                <div className="placeholder-glow mb-2">
                  <div
                    className="placeholder bg-light rounded w-100"
                    style={{ height: "160px" }}
                  ></div>
                </div>
                <div className="placeholder-glow">
                  <div
                    className="placeholder bg-light rounded w-100"
                    style={{ height: "160px" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Price + Agent Badge */}
            <div className="price_tt normal d-flex justify-content-between align-items-center mt-2">
              <div className="placeholder-glow">
                <span
                  className="placeholder bg-secondary-subtle rounded d-inline-block"
                  style={{ width: "140px", height: "20px" }}
                ></span>
              </div>
              <div className="placeholder-glow">
                <span
                  className="placeholder bg-secondary-subtle rounded-circle d-inline-block"
                  style={{ width: "30px", height: "30px" }}
                ></span>
              </div>
            </div>
          </div>

          {/* Right Side Skeleton */}
          <div className="col-lg-7">
            <div className="property_data_area mt-3 mt-lg-2">
              {/* Title */}
              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder bg-secondary-subtle rounded col-6 d-block"
                  style={{ height: "20px" }}
                ></span>
              </div>

              {/* Info Section (category, beds, baths, area) */}
              <ul className="p-0 mb-3" style={{ listStyle: "none" }}>
                <li className="mb-2">
                  <div className="placeholder-glow">
                    <span
                      className="placeholder bg-secondary-subtle rounded col-4 d-block"
                      style={{ height: "16px" }}
                    ></span>
                  </div>
                </li>
                <li className="mb-2 d-flex gap-2">
                  <span
                    className="placeholder bg-secondary-subtle rounded d-inline-block"
                    style={{ width: "40px", height: "16px" }}
                  ></span>
                  <span
                    className="placeholder bg-secondary-subtle rounded d-inline-block"
                    style={{ width: "40px", height: "16px" }}
                  ></span>
                </li>
                <li>
                  <span
                    className="placeholder bg-secondary-subtle rounded d-inline-block"
                    style={{ width: "60px", height: "16px" }}
                  ></span>
                </li>
              </ul>

              {/* Key Property Amenities */}
              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder bg-secondary-subtle rounded d-block col-8"
                  style={{ height: "16px" }}
                ></span>
              </div>

              {/* Description */}
              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder bg-secondary-subtle rounded d-block col-10 mb-1"
                  style={{ height: "14px" }}
                ></span>
                <span
                  className="placeholder bg-secondary-subtle rounded d-block col-7"
                  style={{ height: "14px" }}
                ></span>
              </div>

              {/* Location */}
              <div className="placeholder-glow mb-3">
                <span
                  className="placeholder bg-secondary-subtle rounded d-inline-block"
                  style={{ width: "100px", height: "14px" }}
                ></span>
              </div>

              {/* Contact Actions */}
              <div className="d-flex justify-content-between align-items-center">
                <ul className="d-flex gap-2 p-0" style={{ listStyle: "none" }}>
                  {["Call", "Email", "WhatsApp"].map((_, idx) => (
                    <li key={idx}>
                      <span
                        className="placeholder bg-secondary-subtle rounded px-2 py-1 d-inline-block"
                        style={{ width: "60px", height: "30px" }}
                      ></span>
                    </li>
                  ))}
                </ul>

                <div className="placeholder-glow">
                  <span
                    className="placeholder bg-secondary-subtle rounded  px-2 py-1 d-inline-block mb-3 mx-2"
                    style={{ width: "100px", height: "35px" }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export const PropertyImageSkeleton = () => {
  return (
    <div className="row g-3 w-100 m-0">
      {/* Left Large Image */}
      <div className="col-12 col-md-6">
        <div
          className="placeholder-glow w-100 rounded overflow-hidden"
          style={{ height: "400px" }}
        >
          <div className="placeholder bg-secondary-subtle w-100 h-100 rounded"></div>
        </div>
      </div>

      {/* Right 2x2 Grid - Full Height, Equal Gap */}
      <div
        className="col-12 col-md-6 d-flex flex-wrap p-0"
        style={{ height: "400px", gap: "8px" }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="placeholder-glow"
            style={{
              width: "calc(50% - 4px)", // gap: 8px split between two items
              height: "calc(50% - 4px)",
              flexShrink: 0,
            }}
          >
            <div className="placeholder bg-secondary-subtle w-100 h-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PropertyHeaderSkeleton = () => {
  return (
    <div className="w-100">
      {/* Category Badge */}
      <div className="placeholder-glow mb-2 d-flex justify-content-between align-items-center">
        <span
          className="placeholder bg-secondary-subtle rounded d-inline-block"
          style={{ width: "100px", height: "24px" }}
        ></span>
        <div className=" d-flex gap-1 justify-content-between align-items-center">
          <span
            className="placeholder bg-secondary-subtle rounded d-inline-block"
            style={{ width: "35px", height: "24px" }}
          ></span>
          <span
            className="placeholder bg-secondary-subtle rounded d-inline-block"
            style={{ width: "100px", height: "24px" }}
          ></span>
        </div>
      </div>

      {/* Title */}
      <div className="placeholder-glow mb-2">
        <span
          className="placeholder bg-secondary-subtle rounded d-inline-block"
          style={{ width: "75%", height: "28px" }}
        ></span>
      </div>

      {/* Price */}
      <div className="placeholder-glow mb-2">
        <span
          className="placeholder bg-secondary-subtle rounded d-inline-block"
          style={{ width: "120px", height: "24px" }}
        ></span>
      </div>

      {/* Location Row */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <i
          className="ri-map-pin-line text-muted"
          style={{ fontSize: "16px" }}
        ></i>
        <div className="placeholder-glow flex-grow-1">
          <span
            className="placeholder bg-secondary-subtle rounded d-inline-block"
            style={{ width: "200px", height: "16px" }}
          ></span>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4" />
    </div>
  );
};

export const PropertyFeaturesSkeleton = () => {
  return (
    <div>
      <p className="text-uppercase fw-semibold text-dark mb-3">
        Key Property Features
      </p>

      <ul className="d-flex align-items-center gap-3 placeholder-glow mb-3 list-unstyled">
        {[1, 2, 3].map((_, index) => (
          <li key={index}>
            <span
              className="placeholder bg-secondary-subtle rounded d-inline-block"
              style={{ width: "128px", height: "18px" }}
            ></span>
          </li>
        ))}
      </ul>

      <hr className="my-4" />
    </div>
  );
};

export const PropertyDetailsTableSkeleton = () => {
  return (
    <table className="table">
      <tbody className="placeholder-glow">
        {[...Array(7)].map((_, index) => (
          <tr key={index}>
            <td>
              <span
                className="placeholder bg-secondary-subtle rounded d-inline-block"
                style={{ width: "100px", height: "14px" }}
              ></span>
            </td>
            <td>
              <span
                className="placeholder bg-secondary-subtle rounded d-inline-block"
                style={{ width: "150px", height: "14px" }}
              ></span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const PropertyBuildingInfoSkeleton = () => {
  return (
    <ul className="list-unstyled d-flex gap-2 mb-4 placeholder-glow">
      <li className="border border-secondary-subtle rounded px-3 py-2 d-flex align-items-center gap-2">
        <span
          className="placeholder bg-secondary-subtle rounded d-inline-block"
          style={{ width: "16px", height: "16px" }}
        ></span>
        <span
          className="placeholder bg-secondary-subtle rounded d-inline-block"
          style={{ width: "140px", height: "14px" }}
        ></span>
      </li>
      <li className="border border-secondary-subtle rounded px-3 py-2 d-flex align-items-center gap-2">
        <span
          className="placeholder bg-secondary-subtle rounded d-inline-block"
          style={{ width: "16px", height: "16px" }}
        ></span>
        <span
          className="placeholder bg-secondary-subtle rounded d-inline-block"
          style={{ width: "100px", height: "14px" }}
        ></span>
      </li>
    </ul>
  );
};

export const FeaturesSkeleton = () => {
  return (
    <div className="d-flex flex-wrap gap-2 placeholder-glow mb-3">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`amenity-skeleton-${index}`}
          className="bg-secondary-subtle placeholder placeholder-glow text-center rounded d-flex flex-column justify-content-center align-items-center"
          style={{
            width: "15%",
            height: "80px",
            padding: "12px 13px",
          }}
        >
          <span
            className="placeholder bg-secondary-subtle rounded d-block mb-2"
            style={{ width: "31px", height: "26px" }}
          ></span>
          <span
            className="placeholder bg-secondary-subtle rounded d-block"
            style={{ width: "60%", height: "12px" }}
          ></span>
        </div>
      ))}
    </div>
  );
};

export const VirtualTourSkeleton = () => {
  return (
    <div
      className="w-100 rounded  placeholder-glow"
      style={{
        height: "415px",
      }}
    >
      <span className="placeholder bg-secondary-subtle h-100 w-100 rounded d-block mb-2"></span>
    </div>
  );
};

export const FloorPlanSkeleton = () => {
  return (
    <ul className="list-unstyled d-flex gap-1 placeholder-glow">
      {Array.from({ length: 2 }).map((_, index) => (
        <li
          key={`skeleton-${index}`}
          className="flex-grow-1"
          style={{ flex: "0 0 32%", height: "200px" }}
        >
          <div className="placeholder bg-secondary-subtle w-100 h-100 rounded"></div>
        </li>
      ))}
    </ul>
  );
};

export const PropertyInfoSkeleton = () => (
  <ul className="list-unstyled d-flex align-items-center gap-2 mb-4 placeholder-glow">
    {[1, 2].map((_, index) => (
      <li
        key={index}
        className="border border-secondary-subtle rounded px-3 py-2 d-flex align-items-center gap-2"
        style={{ width: "fit-content" }}
      >
        <span
          className="placeholder rounded-circle bg-secondary-subtle"
          style={{ width: "16px", height: "16px" }}
        ></span>

        <div className="d-flex align-items-center gap-1">
          <span
            className="placeholder bg-secondary-subtle rounded"
            style={{ width: "96px", height: "14px" }}
          ></span>
          <span
            className="placeholder bg-secondary-subtle rounded"
            style={{ width: "144px", height: "14px" }}
          ></span>
        </div>
      </li>
    ))}
  </ul>
);

export const SimilarPropertyCardSkeleton = () => (
  <div className="row">
    {[1, 2, 3, 4].map((_, index) => (
      <div className="col-lg-6 mb-4" key={index}>
        <div className="pop_search bg-white border placeholder-glow">
          {/* Image Skeleton */}
          <div className="pop_photo">
            <div
              className="placeholder bg-secondary-subtle rounded w-100"
              style={{ height: "200px" }}
            ></div>
          </div>

          <div className="pop_data">
            {/* Title */}
            <h3>
              <span
                className="placeholder bg-secondary-subtle rounded d-inline-block"
                style={{ width: "60%", height: "20px" }}
              ></span>
            </h3>

            {/* Price */}
            <p>
              <span
                className="placeholder bg-secondary-subtle rounded d-inline-block"
                style={{ width: "40%", height: "16px" }}
              ></span>
            </p>

            {/* Info Icons Row */}
            <div className="p_info2 mb-2">
              <ul className="d-flex gap-1 p-0 list-unstyled">
                {[1, 2, 3].map((item) => (
                  <li key={item}>
                    <span
                      className="placeholder bg-secondary-subtle rounded "
                      style={{ width: "50px", height: "16px" }}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="loc mb-2">
              <span
                className="placeholder bg-secondary-subtle rounded d-inline-block"
                style={{ width: "50%", height: "14px" }}
              ></span>
            </div>

            {/* Explore Link */}
            <div>
              <span
                className="placeholder bg-secondary-subtle rounded d-inline-block"
                style={{ width: "40%", height: "14px" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const PropertyMapSkeleton = () => (
  <>
    {/* Static map container */}
    <div className="placeholder-glow">
      <div
        style={{
          height: "350px",
          width: "100%",
        }}
        className="mb-3 placeholder bg-secondary-subtle rounded"
      ></div>
    </div>

    <p className="mt-3">Nearby Places</p>

    <ul className="list-unstyled d-flex flex-wrap align-items-stretch gap-2 mb-4 placeholder-glow">
      {[...Array(4)].map((_, index) => (
        <li
          key={index}
          className="border border-secondary-subtle rounded px-3 py-2 d-flex align-items-center gap-2"
          style={{
            flex: "1 1 250px",
            minWidth: "220px",
            maxWidth: "250px",
          }}
        >
          <span
            className="placeholder rounded-circle bg-secondary-subtle"
            style={{ width: "18px", height: "22px" }}
          ></span>

          <div className="d-flex flex-column flex-grow-1 gap-1">
            <span
              className="placeholder bg-secondary-subtle rounded"
              style={{ width: "100%", height: "10px" }}
            ></span>
            <span
              className="placeholder bg-secondary-subtle rounded"
              style={{ width: "60%", height: "10px" }}
            ></span>
          </div>
        </li>
      ))}
    </ul>
  </>
);

export const ContactSidebarSkeleton = () => {
  return (
    <div className="col-lg-3">
      <div className="w-100" style={{ maxWidth: "320px" }}>
        {/* Sidebar Card */}
        <div className="agent bg-white text-center p-3">
          {/* Logo */}
          <div className="placeholder-glow mb-2">
            <span
              className="placeholder bg-secondary-subtle d-block mx-auto rounded"
              style={{ width: "120px", height: "40px" }}
            ></span>
          </div>

          {/* Company Name */}
          <div className="placeholder-glow mb-2">
            <span
              className="placeholder bg-secondary-subtle d-block mx-auto rounded"
              style={{ width: "80%", height: "14px" }}
            ></span>
          </div>

          <hr className="my-2" />

          {/* Profile Image */}
          <div
            className="rounded-circle border border-dark p-1 mx-auto mb-3"
            style={{ width: "96px", height: "96px", overflow: "hidden" }}
          >
            <span className="placeholder bg-secondary-subtle d-block w-100 h-100 rounded-circle"></span>
          </div>

          {/* Agent Name */}
          <div className="placeholder-glow mb-1">
            <span
              className="placeholder bg-secondary-subtle d-block mx-auto rounded"
              style={{ width: "60%", height: "14px" }}
            ></span>
          </div>

          {/* User Type + Company */}
          <div className="placeholder-glow mb-2">
            <span
              className="placeholder bg-secondary-subtle d-block mx-auto rounded"
              style={{ width: "80%", height: "14px" }}
            ></span>
          </div>

          {/* Bio */}
          <div className="placeholder-glow mb-2">
            <span
              className="placeholder bg-secondary-subtle d-block mx-auto rounded"
              style={{ width: "90%", height: "48px" }}
            ></span>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="mt-4 text-center d-flex flex-column align-items-center gap-2">
          <div className="placeholder-glow w-100">
            <span
              className="placeholder bg-secondary-subtle d-block mx-auto rounded"
              style={{ width: "80%", height: "14px" }}
            ></span>
          </div>

          {[1, 2, 3].map((_, i) => (
            <span
              key={i}
              className="placeholder bg-secondary-subtle d-block rounded"
              style={{ width: "100%", height: "40px" }}
            ></span>
          ))}
        </div>

        {Array.from({ length: 2 })?.map((_, i) => {
          return (
            <div className="recommended_s bg-white p-3 my-4" key={i}>
              <h5 className="mb-3">
                <span
                  className="d-inline-block rounded bg-secondary-subtle placeholder-glow"
                  style={{ width: "40%", height: "20px" }}
                ></span>
              </h5>
              <hr />

              <ul className="list-unstyled mb-0">
                {[90, 70, 80, 60].map((width, index) => (
                  <li key={index} className="mb-2">
                    <span
                      className="d-inline-block rounded bg-secondary-subtle placeholder-glow"
                      style={{ width: `${width}%`, height: "16px" }}
                    ></span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* Ads */}
        <div className="my-4">
          <span
            className="placeholder bg-secondary-subtle d-block w-100 rounded"
            style={{ height: "100px" }}
          ></span>
        </div>
        <div className="my-4">
          <span
            className="placeholder bg-secondary-subtle d-block w-100 rounded"
            style={{ height: "300px" }}
          ></span>
        </div>
      </div>
    </div>
  );
};
