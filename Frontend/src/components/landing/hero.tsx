import HeroCard from "./hero-card-section.tsx/card-section";


const Hero = () => {
  return (
    <div className="flex flex-col bg-[#F9F9FA] justify-center items-center pb-10">
      {/* Ttile + Slogan section */}
      <div className="text-[#2c3e50] mt-20 text-center flex flex-col gap-6">
        <h1 className="font-bold text-5xl">Find Your Dream Job</h1>
        <p className="text-lg max-w-2xl text-[#6C7B7F]">
          Discover thousands of job opportunities from top companies. Your next
          career move is just a search away.
        </p>
      </div>

      {/* Card Section */}
      <HeroCard/>

      {/* Stats section */}
      <div className="flex gap-6 sm:gap-10 justify-center">
        <div className="text-[#2c3e50] mt-18 flex flex-col items-baseline justify-center">
          <h1 className="font-bold text-2xl sm:text-3xl">50K+</h1>
          <p className="text-sm sm:text-lg max-w-2xl text-[#6C7B7F]">Active Jobs</p>
        </div>

        <div className="text-[#2c3e50] mt-18 flex flex-col items-baseline justify-center">
          <h1 className="font-bold text-2xl sm:text-3xl">25K+</h1>
          <p className="text-sm sm:text-lg max-w-2xl text-[#6C7B7F]">Companies</p>
        </div>

        <div className="text-[#2c3e50] mt-18 flex flex-col items-baseline justify-center">
          <h1 className="font-bold text-2xl sm:text-3xl">100K+</h1>
          <p className="text-sm sm:text-lg max-w-2xl text-[#6C7B7F]">Job Seekers</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
