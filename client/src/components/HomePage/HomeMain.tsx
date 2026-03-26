interface HomeMainProps {
  children: React.ReactNode
}

const HomeMain = ({ children }: HomeMainProps) => {
  return (
    <main className="pt-16">
      {children}
    </main>
  )
}

export default HomeMain;