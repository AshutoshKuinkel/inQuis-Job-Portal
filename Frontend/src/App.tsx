import "./App.css";
import LoginCard from "./pages/auth/login-page";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignupCard from "./pages/auth/signup-page";
import HomePage from "./pages/home";
import AboutPage from "./pages/About";
import PageNotFound from "./pages/page-not-found";
import JobPage from "./pages/job-page";
import PostJob from "./pages/employer/PostJob";
import ClientLayout from "./layouts/client.layout";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./providers/scroll-to-top";
import CategoryJobsDisplay from "./components/landing/category/DisplayCategoryJobs";

const App = () => {
  return (
    <main className="h-full tracking-wider">
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path="/login" element={<LoginCard />} />
          <Route path="/signup" element={<SignupCard />} />

          <Route path={'/'} element={<ClientLayout/>}>
            <Route path="" element={<HomePage />} />

            <Route path="/about" element={<AboutPage />} />

            <Route path="/jobs" element={<JobPage />} />
            <Route path="/jobs/:id" element={<JobPage />} />
            <Route path="/jobs/category" element={<CategoryJobsDisplay/>} />

            <Route path="/employer/createJob" element={<PostJob />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster reverseOrder={true}/>
    </main>
  );
};

export default App;
