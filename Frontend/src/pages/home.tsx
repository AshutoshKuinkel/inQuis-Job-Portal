import Category from "../components/landing/category";
import FeaturedSection from "../components/landing/featured jobs section/featured-section";
import Hero from "../components/landing/hero";


const HomePage = () => {
  return (
    <main>
      <div className="min-h-screen">
        {/* Hero section */}
          <Hero/>

        {/* Browse by category section */}
          <Category/>

        {/* Featured job section. Create dynamic page next for this and category to display the job detail page and jobs by category page. */}
        <FeaturedSection/>
      </div>
    </main>
  );
};

export default HomePage;
