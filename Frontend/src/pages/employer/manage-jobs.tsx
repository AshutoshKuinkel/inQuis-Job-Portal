import { IoLocationOutline, IoTrashOutline } from "react-icons/io5";
import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { GoPlus } from "react-icons/go";
import { DollarSign } from "lucide-react";
import { AiOutlineEye } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";

const ManageJobs = () => {
  return (
    <div className="h-screen">
      <div className="grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-2 col-span-7">
          {/* Employer dashboard header */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col gap-1 p-8">
              <h1 className="text-3xl text-[#2c3e50] font-semibold">
                Manage Jobs
              </h1>
              <p className="text-[#6C7B7F]">
                View, edit, and delete your job postings
              </p>
            </div>
            <button className="border bg-[#2c3e50] text-white font-bold py-2 px-3 rounded-md hover:bg-[#3a4753] hover:cursor-pointer">
              <div className="flex items-center gap-3">
                <GoPlus size={22} />
                <p>Create New Job</p>
              </div>
            </button>
          </div>

          {/* Job Cards section */}
          <div className="pl-8 pr-8">
            <div className="flex flex-col gap-6">
              {/* Card 1 */}
              <div className="border p-6 rounded-xl border-[#E9EBED] border-l-8">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-3">
                      <h1 className="text-xl text-[#2c3e50] font-bold line-clamp-1">
                        Senior Frontend Developer
                      </h1>
                      {/* Category Section */}
                      <div className="w-24 text-center bg-[#2c3e50] rounded-lg py-1">
                        <p className={`text-xs text-[#fff] font-semibold`}>
                          active
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <AiOutlineEye size={20} />
                        <button className="hover:cursor-pointer">
                          View Applications (12)
                        </button>
                      </div>

                      <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <LiaEdit size={20} />
                        <button className="hover:cursor-pointer">Edit</button>
                      </div>

                      <div className="border border-[#E9EBED] p-2 rounded-lg text-red-500 font-semibold text-sm flex items-center space-x-2 max-w-36 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <IoTrashOutline size={20} />
                        <button className="hover:cursor-pointer">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location + Salary Section + Posted Section */}
                <div className="flex space-x-3 items-center text-[#6c7b7f] text-sm mt-2">
                  <div className="flex space-x-1 items-center">
                    <IoLocationOutline />
                    <p>San Francisco, CA</p>
                  </div>

                  <div className="flex space-x-1 items-center">
                    <DollarSign size={16} />
                    <p className="">$120000-150000</p>
                  </div>
                </div>

                {/* Posted & Full time section */}
                <div className="text-[#6c7b7f] text-md mt-2">
                  <p>Posted 2025-01-10</p>
                  <div className="flex items-baseline gap-1 mt-1 font-semibold">
                    <p>●</p>
                    <p>Full Time</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 line-clamp-2 text-[#6c7b7f]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam exercitationem sint sunt sit, mollitia dolore aliquam
                  facere accusamus tempora dolor laborum corrupti fugit maxime
                  dignissimos eveniet cupiditate ut quaerat officia nihil
                  laboriosam aut fugiat? Harum aliquam ullam autem molestiae non
                  amet esse asperiores aspernatur saepe temporibus cum assumenda
                  eum dolorum blanditiis, libero vero. Labore adipisci possimus
                  ex nobis, reprehenderit temporibus placeat quis sequi, ipsam
                  est inventore quas sapiente eligendi minima excepturi, earum
                  nostrum porro repellendus et? Dolor, facilis. Eos praesentium
                  quis perspiciatis est iste odit blanditiis reprehenderit
                  tempora sit provident accusantium deserunt, atque porro, illo
                  quod nam nisi quisquam excepturi!
                </div>

                {/* Number of Applications */}
                <div className="mt-6 text-[#6c7b7f]">
                  <p>12 applications</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border p-6 rounded-xl border-[#E9EBED] border-l-8">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-3">
                      <h1 className="text-xl text-[#2c3e50] font-bold line-clamp-1">
                        UX Designer
                      </h1>
                      {/* Category Section */}
                      <div className="w-24 text-center bg-[#2c3e50] rounded-lg py-1">
                        <p className={`text-xs text-[#fff] font-semibold`}>
                          active
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <AiOutlineEye size={20} />
                        <button className="hover:cursor-pointer">
                          View Applications (8)
                        </button>
                      </div>

                      <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <LiaEdit size={20} />
                        <button className="hover:cursor-pointer">Edit</button>
                      </div>

                      <div className="border border-[#E9EBED] p-2 rounded-lg text-red-500 font-semibold text-sm flex items-center space-x-2 max-w-36 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <IoTrashOutline size={20} />
                        <button className="hover:cursor-pointer">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location + Salary Section + Posted Section */}
                <div className="flex space-x-3 items-center text-[#6c7b7f] text-sm mt-2">
                  <div className="flex space-x-1 items-center">
                    <IoLocationOutline />
                    <p>Remote</p>
                  </div>

                  <div className="flex space-x-1 items-center">
                    <DollarSign size={16} />
                    <p className="">$90000-120000</p>
                  </div>
                </div>

                {/* Posted & Full time section */}
                <div className="text-[#6c7b7f] text-md mt-2">
                  <p>Posted 2025-01-08</p>
                  <div className="flex items-baseline gap-1 mt-1 font-semibold">
                    <p>●</p>
                    <p>Full Time</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 line-clamp-2 text-[#6c7b7f]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam exercitationem sint sunt sit, mollitia dolore aliquam
                  facere accusamus tempora dolor laborum corrupti fugit maxime
                  dignissimos eveniet cupiditate ut quaerat officia nihil
                  laboriosam aut fugiat? Harum aliquam ullam autem molestiae non
                  amet esse asperiores aspernatur saepe temporibus cum assumenda
                  eum dolorum blanditiis, libero vero. Labore adipisci possimus
                  ex nobis, reprehenderit temporibus placeat quis sequi, ipsam
                  est inventore quas sapiente eligendi minima excepturi, earum
                  nostrum porro repellendus et? Dolor, facilis. Eos praesentium
                  quis perspiciatis est iste odit blanditiis reprehenderit
                  tempora sit provident accusantium deserunt, atque porro, illo
                  quod nam nisi quisquam excepturi!
                </div>

                {/* Number of Applications */}
                <div className="mt-6 text-[#6c7b7f]">
                  <p>8 applications</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="border p-6 rounded-xl border-[#E9EBED] border-l-8">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-3">
                      <h1 className="text-xl text-[#2c3e50] font-bold line-clamp-1">
                        Marketing Manager
                      </h1>
                      {/* Category Section */}
                      <div className="w-24 text-center bg-[#d4183d] rounded-lg py-1">
                        <p className={`text-xs text-[#fff] font-semibold`}>
                          closed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <AiOutlineEye size={20} />
                        <button className="hover:cursor-pointer">
                          View Applications (15)
                        </button>
                      </div>

                      <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <LiaEdit size={20} />
                        <button className="hover:cursor-pointer">Edit</button>
                      </div>

                      <div className="border border-[#E9EBED] p-2 rounded-lg text-red-500 font-semibold text-sm flex items-center space-x-2 max-w-36 justify-center hover:cursor-pointer hover:bg-gray-200">
                        <IoTrashOutline size={20} />
                        <button className="hover:cursor-pointer">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location + Salary Section + Posted Section */}
                <div className="flex space-x-3 items-center text-[#6c7b7f] text-sm mt-2">
                  <div className="flex space-x-1 items-center">
                    <IoLocationOutline />
                    <p>New York, NY</p>
                  </div>

                  <div className="flex space-x-1 items-center">
                    <DollarSign size={16} />
                    <p className="">$80000-100000</p>
                  </div>
                </div>

                {/* Posted & Full time section */}
                <div className="text-[#6c7b7f] text-md mt-2">
                  <p>Posted 2025-01-10</p>
                  <div className="flex items-baseline gap-1 mt-1 font-semibold">
                    <p>●</p>
                    <p>Full Time</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 line-clamp-2 text-[#6c7b7f]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam exercitationem sint sunt sit, mollitia dolore aliquam
                  facere accusamus tempora dolor laborum corrupti fugit maxime
                  dignissimos eveniet cupiditate ut quaerat officia nihil
                  laboriosam aut fugiat? Harum aliquam ullam autem molestiae non
                  amet esse asperiores aspernatur saepe temporibus cum assumenda
                  eum dolorum blanditiis, libero vero. Labore adipisci possimus
                  ex nobis, reprehenderit temporibus placeat quis sequi, ipsam
                  est inventore quas sapiente eligendi minima excepturi, earum
                  nostrum porro repellendus et? Dolor, facilis. Eos praesentium
                  quis perspiciatis est iste odit blanditiis reprehenderit
                  tempora sit provident accusantium deserunt, atque porro, illo
                  quod nam nisi quisquam excepturi!
                </div>

                {/* Number of Applications */}
                <div className="mt-6 text-[#6c7b7f]">
                  <p>15 applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = withAuth(ManageJobs, [Role.EMPLOYER]);
export default page;
