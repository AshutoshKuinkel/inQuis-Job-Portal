import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { LuAsterisk } from "react-icons/lu";
import { useController, useFormContext } from "react-hook-form";

interface IProps {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  name: string;
  multiple?: boolean;
}

const ImageInput: React.FC<IProps> = ({
  label,
  id,
  required = false,
  multiple = false,
  placeholder = "Click to upload image",
  name,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const onImageChange = (file: FileList | null) => {
    if (!file) return;
    console.log(file);
    const images = new Array(...file);
    console.log(images);
    onChange(images[0]);
  };

  return (
    <div>
      <div className="flex">
        <div className="flex items-center">
          {/* Label Section */}
          <label className="text-[#2c3e50] mt-3 font-semibold text-sm">
            {label}
          </label>
          {required && <LuAsterisk size={14} className="text-[#2c3e50]" />}
        </div>
      </div>

      {/* Input section */}
      <div
        onClick={() => {
          if (!inputRef) return null;
          inputRef.current?.click();
        }}
        className="border-2 border-dashed border-gray-300 flex items-center justify-center mt-3 rounded-lg h-[8rem] hover:border-[#2c3e50] hover:cursor-pointer"
      >
        <input
          id={id}
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            onImageChange(e.target.files);
          }}
          accept=".pdf,.doc,.docx"
          multiple={multiple}
        />
        <div className="text-[#6C7B7F] flex flex-col items-center gap-1">
          <Upload size={40} />
          <p>{placeholder}</p>
          <p className="text-xs">PDF, DOC, or DOCX (max 5MB).</p>
        </div>
        {/* error message */}
      </div>
      <p className="text-red-500 text-xs h-1 mt-1 ">
        {errors[name as string] ? (errors[name]?.message as string) : ""}
      </p>

      {/* Preview Section */}
      {value && (
        <div className="mt-4  flex gap-2">
          {/* File info */}
          <div>
            <p className="text-sm font-medium text-[#2c3e50]">{value.name}</p>
            <p className="text-xs text-gray-500">
              {(value.size / 1024 / 1024).toFixed(2)} MB •{" "}
              {value.type || "Unknown"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
