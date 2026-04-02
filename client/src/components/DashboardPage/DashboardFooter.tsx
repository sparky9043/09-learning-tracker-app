const DashboardFooter = () => {
  return (
    <footer className="bg-[#0a0a0a] w-full py-12 border-t border-outline-variant/15">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-6 w-full">
        <div className="text-sm text-on-surface-variant font-body">
          © 2024 The Focused Curator. All rights reserved.
        </div>
        <div className="flex gap-8">
          <a className="text-on-surface-variant hover:text-[#a3a6ff] underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100 text-sm font-body"
            href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-[#a3a6ff] underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100 text-sm font-body"
            href="#">Terms of Service</a>
          <a className="text-on-surface-variant hover:text-[#a3a6ff] underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100 text-sm font-body"
            href="#">Support</a>
          <a className="text-on-surface-variant hover:text-[#a3a6ff] underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100 text-sm font-body"
            href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
};

export default DashboardFooter;