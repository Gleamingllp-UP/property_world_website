import { ChevronLeft, ChevronRight } from "lucide-react";
import "../assets/css/arrow.css";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <ChevronRight strokeWidth={2} size={15} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <ChevronLeft strokeWidth={2} size={15} />
  </div>
);

const AgencyNextArrow = ({ onClick }) => (
  <div className="custom_arrow_agency next" onClick={onClick}>
    <ChevronRight strokeWidth={1} size={40} />
  </div>
);

const AgecyPrevArrow = ({ onClick }) => (
  <div className="custom_arrow_agency prev" onClick={onClick}>
    <ChevronLeft strokeWidth={1} size={40} />
  </div>
);

export { NextArrow, PrevArrow, AgecyPrevArrow, AgencyNextArrow };
