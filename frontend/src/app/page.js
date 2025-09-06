import AboutSummaryPage from "../layout/aboutBanner/page";
import RecentBlogs from "../layout/blog/page";
import Footer from "../layout/footer/page";
import HomePage from "../layout/home/page";
import BlogPage from "./blog/page";

export default function Home() {
  return (
    <>
      <HomePage />
      <AboutSummaryPage/>
      <RecentBlogs/>
    </>
  );
}
