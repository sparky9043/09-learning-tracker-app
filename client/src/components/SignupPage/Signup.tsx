import { Link } from "react-router"
import SignupForm from "./SignupForm"

const Signup = () => {

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface selection:bg-primary/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-tertiary/5 blur-[120px] rounded-full"></div>
      </div>
      <main className="relative z-10 w-full max-w-105">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-background mb-3">
            Welcome
          </h1>
          <p className="text-on-surface-variant font-body text-sm tracking-wide">
            Start your journey into the focused deep work.
          </p>
        </div>
        <div className="glass-card p-8 rounded-xl border-outline-variant/10 shadow-2xl">
          {/* Forms here */}
          <SignupForm />
          <div className="mt-8 pt-6 border-t border-outline-variant/10 text-center">
            <Link className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
              to="/login"
            >
              Already have an account? <span className="font-semibold text-primary">Log in</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signup