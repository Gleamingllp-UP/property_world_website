import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUserTypes,
  setSelectedUserType,
} from "../../../features/userTypes/userTypesSlice";
import { sign_up } from "../../../assets/images";
import SignUpContent from "./SignUpContent";

function SignUpTabs({ innerRef }) {
  const [activeId, setActiveId] = useState(null);
  const [activeUserTypeName, setActiveUserTypeName] = useState(null);
  const { userTypes, isLoading } = useSelector((store) => store?.usersType);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUserTypes());
  }, [dispatch]);

  useEffect(() => {
    if (userTypes?.length > 0 && !activeId) {
      setActiveId(userTypes?.[0]._id);
      setActiveUserTypeName(userTypes?.[0].name);
      handleSelectedUserType(userTypes?.[0])
    }
  }, [userTypes, activeId]);

  const handleSelectedUserType = (userType) => {
    dispatch(setSelectedUserType(userType));
  };
  return (
    <>
      <section className="content_area" id="down" ref={innerRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="sign_image">
                <img src={sign_up} className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="my_form">
                <div className="you_are">
                  <b>You are</b>
                  <div className="all_cta1">
                    <ul>
                      {isLoading
                        ? [...Array(3)].map((_, i) => (
                            <li key={i}>
                              <div
                                className="placeholder-glow"
                                style={{ width: "100px", height: "38px" }}
                              >
                                <span
                                  className="placeholder col-12 rounded-pill"
                                  style={{
                                    height: "30px",
                                  }}
                                >
                                  &nbsp;
                                </span>
                              </div>
                            </li>
                          ))
                        : userTypes?.map((type) => (
                            <li key={type?._id}>
                              <input
                                type="radio"
                                id={`tab_${type?._id}`}
                                className="radio-input"
                                name="user-type"
                                checked={activeId === type?._id}
                                onChange={() => {
                                  setActiveId(type?._id);
                                  handleSelectedUserType(type);
                                  setActiveUserTypeName(type?.name);
                                }}
                              />
                              <label
                                htmlFor={`tab_${type?._id}`}
                                className="radio-label"
                              >
                                <span className="radio-border">
                                  {type?.name}
                                </span>
                              </label>
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <SignUpContent
                    user_type_id={activeId}
                    name={activeUserTypeName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default React.memo(SignUpTabs);
