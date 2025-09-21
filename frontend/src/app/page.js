import AboutSummaryPage from "../layout/aboutBanner/page";
import AdvancedFieldsBanner from "../layout/advanecfiled/page";
import DailyUpdatesPreview from "../layout/dailyUpdates/page";

import RecentBlogs from "../layout/blog/page";
import HomePage from "../layout/home/page";

export default function Home() {
  return (
    <>
      <HomePage />
      <AboutSummaryPage />
      <AdvancedFieldsBanner />
      <DailyUpdatesPreview />
      <RecentBlogs />
    </>
  );
}
