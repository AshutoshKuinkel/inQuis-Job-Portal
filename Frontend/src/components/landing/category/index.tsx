import { useQuery } from "@tanstack/react-query";
import { ICategory } from "../../../types/category.types";
import CategoryCard from "./category-card";
import { getCategories } from "../../../api/category.api";


const Category = () => {
  const { data, isLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ["get_all_categories"],
  });

  return (
    <div className="bg-[#FCFDFD] pb-10">
      <div className="text-[#2c3e50] pt-12 bg-[#FCFDFD] text-center flex flex-col gap-3 items-center">
        <h1 className="font-bold text-2xl">Browse by Categories</h1>
        <p className="text-sm max-w-2xl text-[#6C7B7F]">
          Explore jobs by searching with relevant categories and find the
          perfect match for your skills and interests.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center gap-y-5 sm:px-64 mt-12">
        {isLoading ? (
          <div className="flex justify-center items-center col-span-4 h-[300px]">
            <h1 className="font-bold text-2xl text-[#2c3e50] text-center">Loading...</h1>
          </div>
        )
        
        :(data?.data.map((category: ICategory) => (
          <CategoryCard category={category} key={category.name}/>
        )))
        }
        
        
      </div>
    </div>
  );
};

export default Category;
