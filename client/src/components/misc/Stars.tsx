interface StarsProps {
  difficulty: number;
}

const Stars = ({ difficulty }: StarsProps) => {
  const MAX_STARS = 5;

  const difficultyArray = () => Array
    .from({ length: MAX_STARS },
        (_, i) => <span
          key={i}
          className="material-symbols-outlined text-sm!"
          style={{ fontVariationSettings: `'FILL' ${i < difficulty ? 1 : 0}` }}>
            star
        </span>
    )
  
  const convertDifficultyToText = (difficulty: number): string => {
    if (difficulty < 3) {
      return "Easy"
    } else if (difficulty == 3) {
      return "Medium"
    } else if (difficulty > 3) {
      return "Hard"
    } else {
      return 'invalid'
    }
  }

  return (
    <div className="flex items-center gap-1"><span className="text-tertiary font-bold mr-1">{convertDifficultyToText(difficulty)}</span>
      <div className="flex text-tertiary">
        {difficultyArray()}
      </div>
    </div>
  )
};

export default Stars;