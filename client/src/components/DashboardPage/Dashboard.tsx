// import LearningEntriesList from "./LearningEntriesList";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import entriesService from "@/service/entriesService";
import type { SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import LoadingWheel from "../misc/LoadingWheel";
import { compareAsc, format } from "date-fns";
import BarCharts from "./BarCharts";
// import Welcome from "./Welcome";
// import Togglelable from "../misc/Toggleable";

interface MonthlyData {
  month: number;
  year: number;
  minutes_spent: number;
};

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

  const isDataLoaded = Array.isArray(entryByUser.data);

  if (entryByUser.isError || !entryByUser.data || !isDataLoaded) {
    return (
      <div>
        There wasn an error loading data
      </div>
    )
  }

  // Extract timestamp and time spent from entries
  const extractDates = entryByUser.data.map(({ created_at, minutes_spent }) => ({ created_at, minutes_spent }));

  const extractedDatesSorted = [...extractDates].sort((a, b) => compareAsc(a.created_at, b.created_at));


  // Convert each entry into month, year, and time spent. Convert month and year to numbers
  const convertToMonth = extractedDatesSorted.map(entry => ({
    month: Number(format(entry.created_at, 'MM')),
    year: Number(format(entry.created_at, 'yyyy')),
    minutes_spent: entry.minutes_spent,
  }));

  console.log(convertToMonth);

  const monthlyTotal: MonthlyData[] = []

  convertToMonth.forEach(entry => {
    const matchingEntry = monthlyTotal.find(data => data.month === entry.month && data.year === entry.year);

    if (!matchingEntry) {
      monthlyTotal.push({...entry})
    } else {
      matchingEntry.minutes_spent += entry.minutes_spent;
    }

  });

  console.log(monthlyTotal);

  return (
    <div className="flex flex-col min-h-dvh w-full">
      {/* <LearningEntriesList /> */}
      <p>Main Menu</p>
      {entryByUser.isLoading && <div>
          <LoadingWheel />
        </div>
      }
      <BarCharts />
    </div>
  )
}

export default Dashboard;