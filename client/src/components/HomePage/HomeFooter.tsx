const HomeFooter = () => {
  return (
    <footer className="bg-[#0a0a0a] w-full py-12 border-t border-outline-variant/15">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-6 w-full">
        <div className="text-on-surface-variant text-sm font-body">
          © Learning Tracker by <a>@sparky9043</a>
        </div>
        <div className="flex gap-8">
          <a className="text-on-surface-variant hover:text-[#a3a6ff] transition-colors underline-offset-4 hover:underline text-sm font-label opacity-80 hover:opacity-100"
            href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-[#a3a6ff] transition-colors underline-offset-4 hover:underline text-sm font-label opacity-80 hover:opacity-100"
            href="#">Terms of Service</a>
          <a className="text-on-surface-variant hover:text-[#a3a6ff] transition-colors underline-offset-4 hover:underline text-sm font-label opacity-80 hover:opacity-100"
            href="#">Support</a>
          <a className="text-on-surface-variant hover:text-[#a3a6ff] transition-colors underline-offset-4 hover:underline text-sm font-label opacity-80 hover:opacity-100"
            href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
};

export default HomeFooter;