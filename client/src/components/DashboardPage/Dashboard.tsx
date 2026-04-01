// import LearningEntriesList from "./LearningEntriesList";
import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import entriesService from "@/service/entriesService";
import type { SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import LoadingWheel from "../misc/LoadingWheel";
import { compareAsc, format } from "date-fns";
import BarCharts from "./BarCharts";
import type { MonthlyData } from "@/types/types";
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
  const extractDates = entryByUser.data.map(({ created_at, minutes_spent }) => ({ created_at, minutes_spent }));

  const extractedDatesSorted = [...extractDates].sort((a, b) => compareAsc(a.created_at, b.created_at));


  // Convert each entry into month, year, and time spent. Convert month and year to numbers
  const convertToMonth = extractedDatesSorted.map(entry => ({
    month: format(entry.created_at, 'MMM yyyy'),
    year: Number(format(entry.created_at, 'yyyy')),
    minutes_spent: entry.minutes_spent,
  }));

  const monthlyTotal: MonthlyData[] = []

  convertToMonth.forEach(entry => {
    const matchingEntry = monthlyTotal.find(data => data.month === entry.month && data.year === entry.year);

    if (!matchingEntry) {
      monthlyTotal.push({ ...entry })
    } else {
      matchingEntry.minutes_spent += entry.minutes_spent;
    }
  });

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

  return (
    <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="font-headline font-extrabold text-5xl md:text-6xl tracking-tighter mb-4">
            Welcome back, <span className="text-primary">Alex</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-body leading-relaxed">
            Your focus is your greatest asset. You've completed 85% of your weekly goals. Ready to curate today's
            knowledge?
          </p>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-tertiary">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-tertiary">bolt</span>
            <span className="font-headline font-bold text-sm uppercase tracking-widest text-tertiary">Current Streak</span>
          </div>
          <div className="text-4xl font-headline font-extrabold tracking-tighter">14 Days</div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-5 flex flex-col gap-8">
          <div className="bg-surface-container p-8 rounded-xl shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl" style={{ fontVariationSettings: 'FILL 1'}}>add_circle</span>
            </div>
            <h2 className="font-headline font-bold text-2xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">edit_note</span>
              New Focus Task
            </h2>
            <form className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs font-label text-on-surface-variant uppercase tracking-widest mb-2">Task
                  Title</label>
                <input
                  className="w-full bg-surface-container-lowest border-none ring-2 ring-transparent focus:ring-primary rounded-lg p-4 text-on-surface placeholder:text-outline transition-all"
                  placeholder="e.g., Master Tailwind Gradients" type="text" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-label text-on-surface-variant uppercase tracking-widest mb-2">Category</label>
                  <select
                    className="w-full bg-surface-container-lowest border-none ring-2 ring-transparent focus:ring-primary rounded-lg p-4 text-on-surface appearance-none">
                    <option>Development</option>
                    <option>Design</option>
                    <option>Theory</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-xs font-label text-on-surface-variant uppercase tracking-widest mb-2">Priority</label>
                  <select
                    className="w-full bg-surface-container-lowest border-none ring-2 ring-transparent focus:ring-primary rounded-lg p-4 text-on-surface appearance-none">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <button
                className="w-full bg-linear-to-br from-primary to-primary-dim text-on-primary font-extrabold py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(163,166,255,0.3)] active:scale-[0.98]"
                type="button">
                Generate Task
              </button>
            </form>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-on-surface-variant text-sm font-label mb-1">Time Invested Today</div>
              <div className="text-3xl font-headline font-bold">4h 22m</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin-slow">
              </div>
              <span className="material-symbols-outlined text-primary">timer</span>
            </div>
          </div>
        </section>
        <section className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline font-bold text-2xl">Learning Backlog</h2>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">4
              ACTIVE</span>
          </div>
          {/* First Card */}
          <div
            className="bg-surface-container p-6 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL'" }}>architecture</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl text-on-surface">Advanced UI Components</h3>
                  <p className="text-sm text-on-surface-variant font-body">Module 4: Accessible Navigation Patterns</p>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">more_vert</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-label text-on-surface-variant">
                <span>PROGRESS</span>
                <span>72%</span>
              </div>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>
          {/* Second Card */}
          <div
            className="bg-surface-container p-6 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined"
                    style={{ fontVariationSettings: 'FILL 1' }}>data_thresholding</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl text-on-surface">Data Structures &amp; Algos</h3>
                  <p className="text-sm text-on-surface-variant font-body">Heap Sort and Priority Queues</p>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">more_vert</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-label text-on-surface-variant">
                <span>PROGRESS</span>
                <span>15%</span>
              </div>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
          {/* Third Card */}
          <div
            className="bg-surface-container p-6 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-tertiary-dim group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>movie_edit</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl text-on-surface">Motion Design Fundamentals</h3>
                  <p className="text-sm text-on-surface-variant font-body">Timing and Easing Principles</p>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-outline group-hover:text-tertiary-dim transition-colors">more_vert</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-label text-on-surface-variant">
                <span>PROGRESS</span>
                <span>45%</span>
              </div>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
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
        </section>
      </div>
    </main>
  )
}

export default Dashboard;