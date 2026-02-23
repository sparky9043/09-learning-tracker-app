interface LearningStats {
  totalTimeSpent: number;
}

const LearningStats = (props: LearningStats) => {
  const totalHours = Math.floor(props.totalTimeSpent / 60);
  const totalMinutes = props.totalTimeSpent % 60;  

  return (
    <div>
      <h2>Total Time Spent: {totalHours} hours {totalMinutes} minutes</h2>
    </div>
  )
}

export default LearningStats;