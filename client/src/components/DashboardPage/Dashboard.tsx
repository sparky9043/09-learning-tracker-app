// import LearningEntriesList from "./LearningEntriesList";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import entriesService from "@/service/entriesService";
import type { SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
// import LoadingWheel from "../misc/LoadingWheel";
import { compareAsc, format } from "date-fns";
// import BarCharts from "./BarCharts";
// import type { MonthlyData } from "@/types/types";
import EntryItemCard from "./EntryItemCard";
import AddLearningEntryForm from "./AddLearningEntryForm";
// import AddLearningEntryForm from "./AddLearningEntryForm";
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

  const isDataLoaded = Array.isArray(entryByUser.data);

  if (entryByUser.isError || !entryByUser.data || !isDataLoaded) {
    return (
      <div>
        There wasn an error loading data
      </div>
    )
  }

  // Extract timestamp and time spent from entries
  // const extractDates = entryByUser.data.map(({ created_at, minutes_spent }) => ({ created_at, minutes_spent }));

  // const extractedDatesSorted = [...extractDates].sort((a, b) => compareAsc(a.created_at, b.created_at));


  // // Convert each entry into month, year, and time spent. Convert month and year to numbers
  // const convertToMonth = extractedDatesSorted.map(entry => ({
  //   month: format(entry.created_at, 'MMM yyyy'),
  //   year: Number(format(entry.created_at, 'yyyy')),
  //   minutes_spent: entry.minutes_spent,
  // }));

  // const monthlyTotal: MonthlyData[] = []

  // convertToMonth.forEach(entry => {
  //   const matchingEntry = monthlyTotal.find(data => data.month === entry.month && data.year === entry.year);

  //   if (!matchingEntry) {
  //     monthlyTotal.push({ ...entry })
  //   } else {
  //     matchingEntry.minutes_spent += entry.minutes_spent;
  //   }
  // });

  // return (
  //   <div className="flex flex-col min-h-dvh w-full p-4">
  //     {/* <LearningEntriesList /> */}
  //     <h1 className="uppercase font-bold text-shadow-xs text-shadow-stone-200 text-2xl mb-4">Dashboard</h1>
  //     {entryByUser.isLoading && <div>
  //         <LoadingWheel />
  //       </div>
  //     }
  //     {/* <BarCharts dates={monthlyTotal} /> */}
  //   </div>
  // )

  const sortedDatedDescending = [...entryByUser.data].sort((a, b) => compareAsc(b.created_at, a.created_at));

  return (
    <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="font-headline font-extrabold text-5xl md:text-6xl tracking-tighter mb-4">
            Welcome back, <span className="text-primary">{currentUser.username}</span>
          </h1>
          {/* <p className="text-on-surface-variant text-lg font-body leading-relaxed">
            Your focus is your greatest asset. You've completed 85% of your weekly goals. Ready to curate today's
            knowledge?
          </p> */}
        </div>
        {/* Streak Card */}
        {/* <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-tertiary">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-tertiary">bolt</span>
            <span className="font-headline font-bold text-sm uppercase tracking-widest text-tertiary">Current Streak</span>
          </div>
          <div className="text-4xl font-headline font-extrabold tracking-tighter">14 Days</div>
        </div> */}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-5 flex flex-col gap-8">
          <AddLearningEntryForm />
          {/* Time Invested Card */}
          {/* <div className="bg-surface-container-low p-8 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-on-surface-variant text-sm font-label mb-1">Time Invested Today</div>
              <div className="text-3xl font-headline font-bold">4h 22m</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin-slow">
              </div>
              <span className="material-symbols-outlined text-primary">timer</span>
            </div>
          </div> */}
        </section>
        <section className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline font-bold text-2xl">Latest Entry</h2>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">
              Today: {format(new Date(), "MMM do yyyy")}
            </span>
          </div>
          {
            sortedDatedDescending
              .slice(0, 4)
              .map(entry =>
                <EntryItemCard
                  key={entry.id}
                  entry={entry}
                />)
          }
        </section>
        {/* <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline font-bold text-2xl">Learning Backlog</h2>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">4
              ACTIVE</span>
          </div> */}
        {/* First Card */}
        {/* <PreviewEntryItem /> */}
        {/* Second Card */}
        {/* <PreviewEntryItem /> */}
        {/* Third Card */}
        {/* <PreviewEntryItem /> */}
        {/* <div className="mt-8 rounded-xl overflow-hidden relative h-48 group shadow-2xl">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              data-alt="Abstract 3D digital art featuring smooth floating dark glass spheres and iridescent liquid textures with deep indigo backlighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQNOGV5I7zEqmtiZ06NLTs4IKeShcgkx3ohDSfWYFLl-LMKKZMHxQln1MPMoQKkvzMGKUb-QTZk6DZb-_ouJ2GWrfZ_ABsqyKF813dItSHpiRfHzk_JdqZfSMBikNtqZwV_ApCDuHaWA8XRqus9kClA1EPD_ShTVqetj1g5KnTAjUw3IltgqOnTA11e4Ol8i47aVdKsHPnl4Y3-O748JxW2IHVSALD-3uvAE6LH9dU9lZegXR2VtQN0STr48GHvhQ-3EEoQU2WbRw" />
            <div
              className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent flex items-end p-8">
              <div>
                <span className="text-xs font-label text-primary font-bold tracking-[0.2em] uppercase mb-1 block">Curated
                  Content</span>
                <h4 className="font-headline font-bold text-2xl">The Psychology of Focus</h4>
              </div>
            </div>
          </div> */}
      </div>
    </main>
  )
}

export default Dashboard;