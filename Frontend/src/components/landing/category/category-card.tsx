import {
  Code,
  Palette,
  ChartColumn,
  Users,
  Smartphone,
  Shield,
  Heart,
  Wrench,
} from "lucide-react";
import React from "react";
import { ICategory } from "../../../types/category.types";

interface IProps{
  category:ICategory
}

const CategoryIcons = {
  Technology: Code,
  Design: Palette,
  Marketing: ChartColumn,
  Sales: Users,
  Mobile: Smartphone,
  Security: Shield,
  Healthcare: Heart,
  Engineering: Wrench,
}

const CategoryIconColoring = {
  Technology: 'bg-blue-500',
  Design: 'bg-purple-500',
  Marketing: 'bg-green-500',
  Sales: 'bg-orange-500',
  Mobile: 'bg-pink-500',
  Security: 'bg-red-500',
  Healthcare: 'bg-teal-500',
  Engineering: 'bg-indigo-500',
}

const CategoryCard:React.FC<IProps> = ({category}) => {
  const Icon = CategoryIcons[category.name as keyof typeof CategoryIcons];
  const IconBG = CategoryIconColoring[category.name as keyof typeof CategoryIcons];

  return (
    // <div className="grid grid-cols-4 mt-12 gap-y-4 justify-items-center">
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-white border border-[#E9EBED] rounded-lg w-xs py-5 hover:scale-105 hover:shadow-xl hover:cursor-pointer transition-all duration-300">
        {Icon && <Icon size={56} className={`${IconBG} text-white p-3 rounded-2xl`} />}
        <p className="text-sm mt-4">{category.name}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
