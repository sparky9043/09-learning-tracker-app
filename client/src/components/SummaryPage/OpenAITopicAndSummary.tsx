import type { OpenaiResponse } from "@/types/types";

interface OpenAITopicAndSummaryProps {
  openaiResponse: OpenaiResponse | null;
}

const OpenAITopicAndSummary = ({ openaiResponse }: OpenAITopicAndSummaryProps) => {
  if (!openaiResponse) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center space-x-4 mb-8">
        <div className="h-px grow bg-outline-variant opacity-20"></div>
        <h2 className="font-headline font-bold text-zinc-500 uppercase tracking-[0.2em] text-xs">Curated Synthesis
        </h2>
        <div className="h-px grow bg-outline-variant opacity-20"></div>
      </div>
      <div className="bg-surface-container p-1 rounded-2xl bg-linear-to-br from-primary/20 to-tertiary/20">
        <div className="bg-surface-container-high rounded-[14px] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <span
                className="bg-secondary-container/30 text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-label">Intellectual Summary</span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6 text-on-surface">{openaiResponse.topic}
            </h3>
            <div className="space-y-4 font-body text-on-surface-variant leading-relaxed">
              <p>{openaiResponse.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default OpenAITopicAndSummary;