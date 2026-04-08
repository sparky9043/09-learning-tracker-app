import { useCurrentUserContext } from "@/hooks/useCurrentUserContext";
import entriesService from "@/service/entriesService";
import type { SavedLearningEntry } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { compareAsc, format } from "date-fns";
import EntryItemCard from "./EntryItemCard";
import AddLearningEntryForm from "./AddLearningEntryForm";
import { NavLink } from "react-router";

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

  const sortedDatedDescending = [...entryByUser.data].sort((a, b) => compareAsc(b.created_at, a.created_at));

  return (
    <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="font-headline font-extrabold text-5xl md:text-6xl tracking-tighter mb-4">
            Welcome back, <span className="text-primary">{currentUser.username}</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-body leading-relaxed">
            Your focus is your greatest asset. Use the New Learning Entry below to log your progress.
          </p>
          <div className="text-on-surface-variant text-sm font-body leading-relaxed flex flex-col items-start">
            You can also try our AI Assistant to summarize your learning journey. Click on the button below to try!
            <NavLink
              to="summarize"
              className="px-5 py-2 rounded-xl bg-linear-to-br from-primary to-primary-dim text-on-primary font-bold transition-transform scale-95 active:scale-90 font-label text-sm shadow-lg shadow-primary/10 flex items-center justify-between"
            >
              Summary
            </NavLink>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-5 flex flex-col gap-8">
          <AddLearningEntryForm />
        </section>
        <section className="md:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-headline font-bold text-2xl">Latest Entries</h2>
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
      </div>
    </main>
  )
}

export default Dashboard;