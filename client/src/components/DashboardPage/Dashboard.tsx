// import LearningEntriesList from "./LearningEntriesList";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import entriesService from "@/service/entriesService";
import type { SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import LoadingWheel from "../misc/LoadingWheel";
// import Welcome from "./Welcome";
// import Togglelable from "../misc/Toggleable";

const Dashboard = () => {
  const { currentUser } = useCurrentUserContext();
  const entryByUser = useQuery<SavedLearningEntry[]>({
    queryKey: ['entriesByUser'],
    queryFn: entriesService.getAllEntriesByUser,
  });

  if (!currentUser) {
    return (
      <div>
        Please login to view this page
      </div>
    )
  }

  // const isDataLoaded = Array.isArray(entryByUser.data);

  if (entryByUser.isError || !entryByUser.data) {
    return (
      <div>
        There wasn an error loading data
      </div>
    )
  }

  const extractDates = entryByUser.data.map(({ created_at, minutes_spent }) => ({ created_at, minutes_spent }));

  console.log(extractDates)

  return (
    <div className="flex flex-col min-h-dvh w-full">
      {/* <LearningEntriesList /> */}
      <p>Main Menu</p>
      {entryByUser.isLoading && <div>
          <LoadingWheel />
        </div>
      }
    </div>
  )
}

export default Dashboard;