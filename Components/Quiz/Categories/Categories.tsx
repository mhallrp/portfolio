import { useEffect, useState } from "react";
import { getCategories } from "../../../Model/dataOutcalls";

interface CategoriesProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Categories: React.FC<CategoriesProps> = ({ setSelectedCategory, setScore }) => {
  const [categories, setCategories] = useState([{ id: 0, name: "" }]);

  useEffect(() => {
    const initializeCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    initializeCategories();
  }, []);

  return (
    <div className="flex  w-full items-center bg-white">
      <p className="m-6 flex-shrink-0 text-2xl font-bold text-greydark">Quiz Topic</p>
      <select
        className="ml-auto mr-6 mt-1 h-8 w-full rounded border border-greylight bg-white pl-2 text-greytext"
        onChange={(e) => {
          setSelectedCategory(Number(e.target.value));
          setScore(0);
        }}
        defaultValue=""
      >
        <option disabled value="">
          Select a category
        </option>
        {categories.map((category, index) => (
          <option key={index} value={index}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
