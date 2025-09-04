import DetailCard from "./detail-card";
import JobCard from "./job-main-card";

const JobDisplay = () => {
  //initalise react query here.
  return (
    <div className="flex justify-center mt-16">
      <div className="grid grid-cols-3 gap-3">
        {/* Cards */}
        <div className="col-span-1">
          <div className="flex flex-col gap-3">
            <JobCard/>
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>

        {/* Detail Section */}
        <div className="col-span-2 border max-w-4xl h-screen sticky top-0">
          <div className="h-full overflow-hidden hover:overflow-auto"
           style={{ scrollbarGutter: "stable" }}
          >
            <DetailCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDisplay;
