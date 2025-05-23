import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSocialMediaThunk } from "../features/socialMedia/socialMediaSlice";
import { Link } from "react-router-dom";

function SocialIcons({ className }) {
  const page = 1;
  const limit = 10;
  const { socialMedias, isLoading } = useSelector(
    (store) => store?.socialMedia
  );

  const dispatch = useDispatch();

  const getAllSocialMedia = useCallback(async () => {
    await dispatch(getAllSocialMediaThunk({ page, limit }));
  }, [dispatch, page]);

  useEffect(() => {
    getAllSocialMedia();
  }, [getAllSocialMedia]);
  return (
    <>
      {isLoading ? (
        <div className="mt-1">
          <p
            className="placeholder col-4 bg-secondary-subtle rounded"
            style={{ height: "18px" }}
          ></p>
          <div className="d-flex gap-1">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="placeholder bg-secondary-subtle rounded"
                style={{ height: "30px", width: "30px" }}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div className={className}>
          <ul className="d-flex gap-2">
            {socialMedias &&
              socialMedias?.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      href={item?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={item?.className} />
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
}

export default SocialIcons;
