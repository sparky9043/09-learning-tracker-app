// import useOpenaiResponseContext from "@/hooks/useOpenaiResponseContext";
// import { useNavigate } from "react-router";

const SummaryHeader = () => {
  // const { setOpenaiResponse } = useOpenaiResponseContext();
  // const navigate = useNavigate();

  // const handleBack = () => {
  //   setOpenaiResponse(null);
  //   navigate('/dashboard');
  // };

  return (
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
  )
};

export default SummaryHeader;