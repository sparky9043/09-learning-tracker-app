import PromptForm from "./PromptForm";
// import type { OpenaiResponse } from "../../types/types";
import AddAiSummaryForm from "./AddAiSummaryForm";
import Togglelable from "../misc/Toggleable";
import useOpenaiResponseContext from "../../hooks/useOpenaiResponseContext";
import SummaryHeader from "./SummaryHeader";
import OpenAITopicAndSummary from "./OpenAITopicAndSummary";

const Summary = () => {
  const { openaiResponse, setOpenaiResponse } = useOpenaiResponseContext();

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-12">
      <header className="mb-12">
        <h1
          className="font-headline text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary to-tertiary">
          Generate AI Summary
        </h1>
        <p className="text-on-surface-variant font-body text-lg max-w-2xl leading-relaxed">
          Transform your raw notes and chaotic thoughts into a structured intellectual blueprint. Our AI curator
          distills your daily learning into actionable insights.
        </p>
      </header>
      <section className="mb-16">
        <div
          className="bg-surface-container-low p-8 rounded-xl shadow-2xl transition-all hover:bg-surface-container duration-500">
          <label className="block font-headline font-bold text-sm uppercase tracking-widest text-primary mb-4"
            htmlFor="learning-input">Intellectual Input</label>
          <div className="relative group">
            <textarea
              className="w-full h-64 bg-surface-container-lowest text-on-surface font-body p-6 rounded-xl border-none focus:ring-2 focus:ring-primary transition-all resize-none placeholder:text-zinc-600"
              id="learning-input"
              placeholder="Enter what you learned today... Use bullet points, half-baked ideas, or full paragraphs." />
            <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-zinc-600 text-xs font-label">
              <span className="material-symbols-outlined text-sm" data-icon="edit_note">edit_note</span>
              {/* <span>Autosaving to local cache</span> */}
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              className="flex items-center space-x-3 px-8 py-4 bg-linear-to-br from-primary to-primary-dim text-on-primary font-headline font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(163,166,255,0.08)]">
              <span className="material-symbols-outlined" data-icon="auto_awesome"
                style={{ fontVariationSettings: 'FILL 1' }}>auto_awesome</span>
              <span>Generate Summary</span>
            </button>
          </div>
        </div>
      </section>
      {/* AI Summary section */}
      {openaiResponse && <section className="mb-16">
        <div className="flex items-center space-x-4 mb-8">
          <div className="h-px grow bg-outline-variant opacity-20"></div>
          <h2 className="font-headline font-bold text-zinc-500 uppercase tracking-[0.2em] text-xs">Curated Synthesis
          </h2>
          <div className="h-px grow bg-outline-variant opacity-20"></div>
        </div>
        <div className="bg-surface-container p-1 rounded-2xl bg-linear-to-br from-primary/20 to-tertiary/20">
          <div className="bg-surface-container-high rounded-[14px] p-8 md:p-12 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <img alt="abstract network nodes" className="w-full h-full object-contain"
                data-alt="minimalist abstract geometric pattern of interconnected neural nodes and soft glowing lines on dark background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTgt3UjlcFCxzcICtTkxS4twwGLSSDaYMb7HToFJCU-fULzrxScdQrh8BHrqlRdhY1LT39l-1UmcPnlkfdszNJD2rK_9eSWCkrWcqV__JNAKe0LSuEgpvxKoslTakmQNxTtNBdkdOYNz_wS0vGR7ThPcOJ71FDyMjlE2P2D2w9GitTjqT35ow9UwVStbOWRvnyxgnDDFtRaPogyTPHq_FIEhhakpKKHYT0os1Gdwg6iJ4wQZWsRKpWXZtnhje9zqr6C7deggrXnoE" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span
                  className="bg-secondary-container/30 text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-label">Draft
                  Concept</span>
                <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined" data-icon="content_copy">content_copy</span>
                </button>
              </div>
              <h3 className="font-headline text-3xl font-bold mb-6 text-on-surface">Mastery of Neural Topographies
              </h3>
              <div className="space-y-4 font-body text-on-surface-variant leading-relaxed">
                <p>You explored the fundamental shifts in neural network architecture, specifically focusing
                  on the transition from static weights to dynamic attention mechanisms. The core insight
                  captured involves the efficiency of transformer models in high-dimensional semantic
                  spaces.</p>
                <ul className="space-y-3 list-none">
                  <li className="flex items-start space-x-3">
                    <span className="material-symbols-outlined text-primary text-lg"
                      data-icon="check_circle">check_circle</span>
                    <span>Identified the bottleneck in traditional RNN sequence processing.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="material-symbols-outlined text-primary text-lg"
                      data-icon="check_circle">check_circle</span>
                    <span>Distinguished between global and local attention spans.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="material-symbols-outlined text-primary text-lg"
                      data-icon="check_circle">check_circle</span>
                    <span>Drafted a mental model for multi-head self-attention layers.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>}
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