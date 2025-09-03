import JobDisplay from "../components/list jobs page/job cards";
import ListJobsNav from "../components/list jobs page/nav";


const JobPage = () => {
  return (
    <div className="min-h-screen">
      {/* Nav Section */}
      <ListJobsNav/>

      {/* list job cards */}
      <JobDisplay/>

      {/* Detail Section {include button that says like AI resume builder tailored for this job.} */}
    </div>
  );
};

export default JobPage;
