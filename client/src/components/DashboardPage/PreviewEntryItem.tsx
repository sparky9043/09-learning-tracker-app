const PreviewEntryItem = () => {
  return (
    <div
      className="bg-surface-container p-6 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div
            className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL'" }}>architecture</span>
          </div>
          <div>
            <h3 className="font-headline font-bold text-xl text-on-surface">Advanced UI Components</h3>
            <p className="text-sm text-on-surface-variant font-body">Module 4: Accessible Navigation Patterns</p>
          </div>
        </div>
        <span
          className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">more_vert</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-label text-on-surface-variant">
          <span>PROGRESS</span>
          <span>72%</span>
        </div>
        <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-tertiary" style={{ width: '72%' }}></div>
        </div>
      </div>
    </div>
  )
};

export default PreviewEntryItem;