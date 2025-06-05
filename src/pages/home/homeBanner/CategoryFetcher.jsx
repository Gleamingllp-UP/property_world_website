// components/CategoryFetcher.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllActiveCategoryThunk ,getAllActiveSubCategoryThunk,getAllActivesubSubCategoryThunk} from "../../../features/activeData/activeDataSlice";


const CategoryFetcher = ({ selectedCategoryId, selectedSubCategoryId }) => {
  const dispatch = useDispatch();

  // Fetch Categories once user is initialized
  useEffect(() => {
    dispatch(getAllActiveCategoryThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCategoryId) return;
    dispatch(getAllActiveSubCategoryThunk({ categoryId: selectedCategoryId }));
  }, [selectedCategoryId, dispatch]);

  useEffect(() => {
    if (!selectedSubCategoryId) return;
    dispatch(getAllActivesubSubCategoryThunk({ subCategoryId: selectedSubCategoryId }));
  }, [selectedSubCategoryId, dispatch]);

  return null;
};

export default CategoryFetcher;
