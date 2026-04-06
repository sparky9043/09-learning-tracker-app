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
        <PromptForm
          openaiResponse={openaiResponse}
          setOpenaiResponse={setOpenaiResponse}
        />
      </section>
      {/* AI Summary section */}
      {openaiResponse && <OpenAITopicAndSummary openaiResponse={openaiResponse} />}
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