import Category from "../components/landing/category";
import Hero from "../components/landing/hero";


const HomePage = () => {
  return (
    <main>
      <div className="min-h-screen">
        {/* Hero section */}
          <Hero/>

        {/* Browse by category section */}
          <Category/>

        {/* Featured job section */}
      </div>
    </main>
  );
};

export default HomePage;
