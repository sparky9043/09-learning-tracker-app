import PromptForm from "./PromptForm";
// import type { OpenaiResponse } from "../../types/types";
import AddAiSummaryForm from "./AddAiSummaryForm";
import Togglelable from "../misc/Toggleable";
import useOpenaiResponseContext from "../../hooks/useOpenaiResponseContext";
import SummaryHeader from "./SummaryHeader";
import OpenAITopicAndSummary from "./OpenAITopicAndSummary";

const Summary = () => {
  const { openaiResponse, setOpenaiResponse } = useOpenaiResponseContext();

  console.log(openaiResponse);

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-12">
      <SummaryHeader />
      <section className="mb-16">
        <PromptForm
          openaiResponse={openaiResponse}
          setOpenaiResponse={setOpenaiResponse}
        />
      </section>
      {/* AI Summary section */}
      {openaiResponse
        ?
        <>
          <OpenAITopicAndSummary openaiResponse={openaiResponse} />
          <section>
            <div className="bg-surface-container-low p-8 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label
                    className="block font-label text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Project
                    Title</label>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary font-body"
                    type="text" />
                </div>
                <div>
                  <label
                    className="block font-label text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Category</label>
                  <select
                    className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary font-body appearance-none cursor-pointer">
                    <option>Machine Learning</option>
                    <option>Philosophy</option>
                    <option>Linguistics</option>
                    <option>Personal Growth</option>
                  </select>
                </div>
              </div>
              <div
                className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-outline-variant/10">
                <p className="text-on-surface-variant font-label text-sm flex items-center space-x-2">
                  <span className="material-symbols-outlined text-lg" data-icon="info">info</span>
                  <span>Click the retry button if you want to generate another summary</span>
                </p>
                <button
                  className="w-full sm:w-auto px-10 py-4 bg-surface-container-highest hover:bg-surface-bright text-primary font-headline font-bold rounded-xl transition-all active:scale-95">
                  Save to History
                </button>
              </div>
            </div>
          </section>
        </>
        : null
      }

    </main>
  )

  // return (
  //   <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
  //     <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
  //       <div className="flex flex-col w-1/2 p-8 border-2 border-stone-200 shadow-xl rounded-md h-3/4">
  //         <SummaryHeader />
  //         <PromptForm
  //           openaiResponse={openaiResponse}
  //           setOpenaiResponse={setOpenaiResponse}
  //         />
  //         <OpenAITopicAndSummary openaiResponse={openaiResponse} />
  //         {
  //           openaiResponse
  //             ?
  //             <div>
  //               <p>
  //                 To use the AI summary, click the button below
  //               </p>
  //               <Togglelable text="show response form">
  //                 <AddAiSummaryForm />
  //               </Togglelable>
  //             </div>
  //             : null
  //         }
  //       </div>
  //     </header>
  //   </main>
  // )
};

export default Summary;