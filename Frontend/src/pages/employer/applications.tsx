import Sidebar from "../../components/employer/sidebar";
import { withAuth } from "../../hoc/with-auth.hoc";
import { Role } from "../../types/enum.types";
import { Check, X, Mail, Calendar, FileText } from "lucide-react";

const Applications = () => {
  return (
    <div className="">
      <div className="grid grid-cols-8 h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content section */}
        <div className="p-2 col-span-7">
          {/* Employer dashboard header */}
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col gap-1 p-8">
              <h1 className="text-3xl text-[#2c3e50] font-semibold">
                All Applications
              </h1>
              <p className="text-[#6C7B7F]">
                Review and manage all job applications
              </p>
            </div>
          </div>

          {/* Applications cards */}
          <div className="pl-8 flex gap-5 flex-wrap">
            {/* Card 1 */}
            <div className="border p-6 rounded-xl border-[#E9EBED] border-l-8 w-[40vw]">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-3">
                    <h1 className="text-xl text-[#2c3e50] font-bold line-clamp-1">
                      Alice Jhonson
                    </h1>
                    {/* Category Section */}
                    <div className="w-24 text-center bg-gray-200 rounded-lg py-1">
                      <p className={`text-xs text-[#2c3e50] font-bold`}>
                        pending
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 justify-center hover:cursor-pointer hover:bg-gray-200">
                      <button className="hover:cursor-pointer">
                        View Details
                      </button>
                    </div>

                    <div className="border border-[#E9EBED] p-2 rounded-lg text-[#fff] bg-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-[#3a4753]">
                      <Check size={20} />
                      <button className="hover:cursor-pointer">Accept</button>
                    </div>

                    <div className="border border-[#E9EBED] p-2 rounded-lg text-[#fff] bg-[#d4183d] hover:bg-[#cf2346] font-semibold text-sm flex items-center space-x-2 max-w-36 justify-center hover:cursor-pointer">
                      <X size={20} />
                      <button className="hover:cursor-pointer">Reject</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location + Salary Section + Posted Section */}
              <div className="flex flex-col space-x-3 gap-2 text-[#6c7b7f] text-sm mt-2">
                <div className="flex space-x-1 items-center">
                  <Mail size={18} />
                  <p>alice.johnson@email.com</p>
                </div>

                <div className="flex space-x-1 items-center">
                  {/* <DollarSign size={16} /> */}
                  <Calendar size={18} />
                  <p className="">Applied 2025-01-12</p>
                </div>

                <div className="flex space-x-1 items-center">
                  {/* <DollarSign size={16} /> */}
                  <FileText size={18} />
                  <p className="">Senior Frontend Developer</p>
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
                eum dolorum blanditiis, libero vero. Labore adipisci possimus ex
                nobis, reprehenderit temporibus placeat quis sequi, ipsam est
                inventore quas sapiente eligendi minima excepturi, earum nostrum
                porro repellendus et? Dolor, facilis. Eos praesentium quis
                perspiciatis est iste odit blanditiis reprehenderit tempora sit
                provident accusantium deserunt, atque porro, illo quod nam nisi
                quisquam excepturi!
              </div>
            </div>

            {/* Card 2 */}
            <div className="border p-6 rounded-xl border-[#E9EBED] border-l-8 w-[40vw]">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-3">
                    <h1 className="text-xl text-[#2c3e50] font-bold line-clamp-1">
                      Bob Smith
                    </h1>
                    {/* Category Section */}
                    <div className="w-24 text-center bg-[#2c3e50] rounded-lg py-1">
                      <p className={`text-xs text-[#fff] font-bold`}>
                        accepted
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 justify-center hover:cursor-pointer hover:bg-gray-200">
                      <button className="hover:cursor-pointer">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location + Salary Section + Posted Section */}
              <div className="flex flex-col space-x-3 gap-2 text-[#6c7b7f] text-sm mt-2">
                <div className="flex space-x-1 items-center">
                  <Mail size={18} />
                  <p>bobsmith@email.com</p>
                </div>

                <div className="flex space-x-1 items-center">
                  {/* <DollarSign size={16} /> */}
                  <Calendar size={18} />
                  <p className="">Applied 2025-01-11</p>
                </div>

                <div className="flex space-x-1 items-center">
                  {/* <DollarSign size={16} /> */}
                  <FileText size={18} />
                  <p className="">Senior Frontend Developer</p>
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
                eum dolorum blanditiis, libero vero. Labore adipisci possimus ex
                nobis, reprehenderit temporibus placeat quis sequi, ipsam est
                inventore quas sapiente eligendi minima excepturi, earum nostrum
                porro repellendus et? Dolor, facilis. Eos praesentium quis
                perspiciatis est iste odit blanditiis reprehenderit tempora sit
                provident accusantium deserunt, atque porro, illo quod nam nisi
                quisquam excepturi!
              </div>
            </div>

            {/* Card 3 */}
            <div className="border p-6 rounded-xl border-[#E9EBED] border-l-8 w-[40vw]">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-3">
                    <h1 className="text-xl text-[#2c3e50] font-bold line-clamp-1">
                      Carol Davis
                    </h1>
                    {/* Category Section */}
                    <div className="w-24 text-center bg-gray-200 rounded-lg py-1">
                      <p className={`text-xs text-[#2c3e50] font-bold`}>
                        pending
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="border border-[#E9EBED] p-2 rounded-lg text-[#2c3e50] font-semibold text-sm flex items-center space-x-2 justify-center hover:cursor-pointer hover:bg-gray-200">
                      <button className="hover:cursor-pointer">
                        View Details
                      </button>
                    </div>

                    <div className="border border-[#E9EBED] p-2 rounded-lg text-[#fff] bg-[#2c3e50] font-semibold text-sm flex items-center space-x-2 max-w-24 justify-center hover:cursor-pointer hover:bg-[#3a4753]">
                      <Check size={20} />
                      <button className="hover:cursor-pointer">Accept</button>
                    </div>

                    <div className="border border-[#E9EBED] p-2 rounded-lg text-[#fff] bg-[#d4183d] hover:bg-[#cf2346] font-semibold text-sm flex items-center space-x-2 max-w-36 justify-center hover:cursor-pointer">
                      <X size={20} />
                      <button className="hover:cursor-pointer">Reject</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location + Salary Section + Posted Section */}
              <div className="flex flex-col space-x-3 gap-2 text-[#6c7b7f] text-sm mt-2">
                <div className="flex space-x-1 items-center">
                  <Mail size={18} />
                  <p>carol.davis@email.com</p>
                </div>

                <div className="flex space-x-1 items-center">
                  {/* <DollarSign size={16} /> */}
                  <Calendar size={18} />
                  <p className="">Applied 2025-01-10</p>
                </div>

                <div className="flex space-x-1 items-center">
                  {/* <DollarSign size={16} /> */}
                  <FileText size={18} />
                  <p className="">UX Designer</p>
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
                eum dolorum blanditiis, libero vero. Labore adipisci possimus ex
                nobis, reprehenderit temporibus placeat quis sequi, ipsam est
                inventore quas sapiente eligendi minima excepturi, earum nostrum
                porro repellendus et? Dolor, facilis. Eos praesentium quis
                perspiciatis est iste odit blanditiis reprehenderit tempora sit
                provident accusantium deserunt, atque porro, illo quod nam nisi
                quisquam excepturi!
              </div>
            </div>
          </div>

          {/* Stats overview for applications */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#FBFBFC] p-8 rounded-lg w-[84vw] mt-8">
              <div className="flex justify-evenly p-4">
                <div className="flex flex-col items-center">
                  <p className="text-2xl text-[#2c3e50] font-semibold">2</p>
                  <p className="text-gray-500 text-sm">Pending review</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-2xl text-[#2c3e50] font-semibold">1</p>
                  <p className="text-gray-500 text-sm">Accepted</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-2xl text-[#2c3e50] font-semibold">0</p>
                  <p className="text-gray-500 text-sm">Rejected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = withAuth(Applications, [Role.EMPLOYER]);
export default page;
