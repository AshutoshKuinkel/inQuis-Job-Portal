// Create a new function in backend with pagination limit 3, and send it here to recent application cards.

const RecentApplicationCards = () => {
  return (
    <div>
      <div className="border border-[#E9EBED] rounded-lg mt-6 p-4">
        <h1 className="text-[#2c3e50] text-lg font-semibold">Alice Jhonson</h1>
        <div className="flex justify-between items-baseline">
          <p className="text-[#6C7B7F] text-sm">Senior Frontend Developer</p>
          <div className="w-24 text-center bg-[#ECEEF2] rounded-lg py-1">
            <p className="text-xs text-[#2c3e50] font-bold">pending</p>
          </div>
        </div>
        <p className="text-[#6C7B7F] text-sm">Applied 2025-01-12</p>
      </div>

      {/* <div className="border border-[#E9EBED] rounded-lg mt-6 p-4">
        <h1 className="text-[#2c3e50] text-lg font-semibold">Bob Smith</h1>
        <div className="flex justify-between items-baseline">
          <p className="text-[#6C7B7F] text-sm">Senior Frontend Developer</p>
          <div className="w-24 text-center bg-[#2c3e50] rounded-lg py-1">
            <p className="text-xs text-[#fff] font-bold">accepted</p>
          </div>
        </div>
        <p className="text-[#6C7B7F] text-sm">Applied 2025-01-11</p>
      </div>

      <div className="border border-[#E9EBED] rounded-lg mt-6 p-4">
        <h1 className="text-[#2c3e50] text-lg font-semibold">Carol Davis</h1>
        <div className="flex justify-between items-baseline">
          <p className="text-[#6C7B7F] text-sm">UX Designer</p>
          <div className="w-24 text-center bg-[#ECEEF2] rounded-lg py-1">
            <p className="text-xs text-[#2c3e50] font-bold">pending</p>
          </div>
        </div>
        <p className="text-[#6C7B7F] text-sm">Applied 2025-01-10</p>
      </div> */}
    </div>
  );
};

export default RecentApplicationCards;
