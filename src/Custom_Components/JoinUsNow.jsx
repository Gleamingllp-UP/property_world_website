import React from "react";

const JoinUsNow = () => {
  return (
    <>
      <section className="looking_to">
        <div className="container">
          <div className="list_u">
            <h2>
              List Your Properties On <br />
              Property World, Join Us Now!
            </h2>
            <a href="list-your-property.php" className="action_btn ">
              List your property with us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(JoinUsNow);
