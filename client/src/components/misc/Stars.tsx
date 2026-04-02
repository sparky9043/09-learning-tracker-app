interface StarsProps {
  difficulty: number;
}

const Stars = ({ difficulty }: StarsProps) => {
  return (
            <div className="flex items-center gap-1"><span className="text-tertiary font-bold mr-1">{difficulty}/5</span>
              <div className="flex text-tertiary"><span className="material-symbols-outlined text-sm!"
                 style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span
                  className="material-symbols-outlined text-sm!"
                  style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span
                    className="material-symbols-outlined text-sm!"
                    style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span
                      className="material-symbols-outlined text-sm!"
                      style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span
                        className="material-symbols-outlined text-sm!" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
  )
};

export default Stars;