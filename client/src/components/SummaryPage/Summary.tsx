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
      <PromptForm
        openaiResponse={openaiResponse}
        setOpenaiResponse={setOpenaiResponse}
      />
      {/* AI Summary section */}
      {openaiResponse
        ?
        <>
          <OpenAITopicAndSummary openaiResponse={openaiResponse} />
          <AddAiSummaryForm openaiResponse={openaiResponse} />
          {/* <section>
            <div className="mb-4">
              <h2 className="font-headline font-bold text-zinc-500 uppercase tracking-widest text-xs ml-2 mb-2">use ai
                summary</h2>
              <div className="bg-[#050505] border border-white/5 rounded-xl p-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
                  <div className="flex flex-col">
                    <label className="font-label text-xs text-zinc-500 uppercase tracking-wider mb-2">topic</label>
                    <div className="text-on-surface font-body text-sm leading-relaxed">Mastery of Neural
                      Topographies</div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label text-xs text-zinc-500 uppercase tracking-wider mb-2">note</label>
                    <div className="text-on-surface-variant font-body text-sm leading-relaxed line-clamp-3">
                      Explored neural shifts from static weights to dynamic attention. Transformer efficiency
                      in high-dim spaces. Key concepts: RNN bottlenecks, attention spans.
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="font-label text-xs text-zinc-500 uppercase tracking-wider mb-2">difficulty</label>
                    <div className="flex items-center space-x-1 text-primary">
                      <span className="material-symbols-outlined text-sm" data-icon="star"
                        style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                      <span className="material-symbols-outlined text-sm" data-icon="star"
                        style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                      <span className="material-symbols-outlined text-sm" data-icon="star"
                        style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                      <span className="material-symbols-outlined text-sm" data-icon="star"
                        style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                      <span className="material-symbols-outlined text-sm" data-icon="star"
                        style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label text-xs text-zinc-500 uppercase tracking-wider mb-2">minutes
                      spent</label>
                    <input
                      className="bg-transparent border-b border-white/10 focus:border-primary transition-colors text-sm py-1 outline-none text-on-surface font-body w-full"
                      placeholder="e.g. 45" type="text" />
                  </div>
                </div>
                <div
                  className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 mt-6 border-t border-white/5">
                  <p className="text-zinc-500 font-label text-xs flex items-center space-x-2 italic">
                    <span className="material-symbols-outlined text-sm" data-icon="info">info</span>
                    <span>This will be added to your 'Insights' timeline.</span>
                  </p>
                  <button
                    className="w-full sm:w-auto px-10 py-3.5 bg-surface-container-highest hover:bg-zinc-800 text-primary font-headline font-bold rounded-xl transition-all active:scale-95 border border-white/5">
                    Save to History
                  </button>
                </div>
              </div>
            </div>
          </section> */}
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