interface StarsProps {
  difficulty: number;
  onChange?: (arg: number) => void;
}

const Stars = ({ difficulty, onChange }: StarsProps) => {
  const MAX_STARS = 5;

  const difficultyArray = () => Array
    .from({ length: MAX_STARS },
        (_, i) => <span
          key={i}
          className="material-symbols-outlined text-sm! hover:cursor-pointer"
          style={{ fontVariationSettings: `'FILL' ${i < difficulty ? 1 : 0}` }}
          onClick={onChange ? () => onChange(i + 1) : undefined}
          >
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
    <div className="flex items-center gap-1"><span className="text-tertiary font-bold mr-1 w-15 text-right">{convertDifficultyToText(difficulty)}</span>
      <div className="flex text-tertiary">
        {difficultyArray()}
      </div>
    </div>
  )
};

export default Stars;