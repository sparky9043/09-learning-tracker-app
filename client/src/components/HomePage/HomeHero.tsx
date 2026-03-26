import { useNavigate } from "react-router";
// import { Button } from "../ui/button";

// interface HomeHeroProps {
//   children: string;
// }

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    // <div className="font-geist text-center flex flex-col justify-center items-center gap-4 text-shadow-md mb-auto h-full">
    //   <h1 className="font-bold tracking-wide uppercase text-5xl">{props.children}</h1>
    //   <p className="text-stone-500">keep track of your learning progress</p>
    //   <Button onClick={() => navigate('/login')}>
    //     Start Tracking
    //   </Button>
    // </div>
    <section className="relative min-h-230.25 flex items-center px-8 md:px-20 overflow-hidden">
      <div className="z-10 max-w-4xl">
        <span
          className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold tracking-widest uppercase">
          Focus Redefined
        </span>
        <h1 className="font-headline font-extrabold text-6xl md:text-8xl editorial-text mb-8">
          Curate Your <br />
          <span
            className="bg-clip-text text-transparent bg-linear-to-r from-primary via-tertiary to-primary-dim">Intellectual
            Growth</span>
        </h1>
        <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          A silent partner for your educational journey. Transform digital noise into a high-end editorial
          workspace designed for deep work and mastery.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            className="bg-linear-to-br from-primary to-primary-dim text-on-primary px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(163,166,255,0.2)]"
            onClick={() => navigate('/login')}
          >
            Start Curating Free
          </button>
          {/* Add New Button Later */}
          {/* <button
            className="group flex items-center gap-3 px-8 py-4 text-on-surface font-semibold hover:bg-surface-container-high rounded-xl transition-all">
            View Sample Workflow
            <span
              className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button> */}
        </div>
      </div>
      {/* Abstract Background Visual */}
      <div
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-[120px] pointer-events-none">
      </div>
      <div
        className="absolute right-[5%] bottom-[10%] w-100 h-100 bg-tertiary/5 rounded-full blur-[100px] pointer-events-none">
      </div>
    </section>
  )
}

export default HomeHero;