import AboutSummaryPage from "../layout/aboutBanner/page";
import AdvancedFieldsBanner from "../layout/advanecfiled/page";
import DailyUpdatesPreview from "../layout/dailyUpdates/page";
import TeamPreview from "../layout/team/page";

import RecentBlogs from "../layout/blog/page";
import HomePage from "../layout/home/page";

export default function Home() {
  return (
    <>
      <HomePage />
      <TeamPreview />
      <AboutSummaryPage />
      <AdvancedFieldsBanner />
      <DailyUpdatesPreview />
      <RecentBlogs />
    </>
  );
}
