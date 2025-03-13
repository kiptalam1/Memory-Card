export default function ScoreBoard ({score, bestScore, resetScores}) {
    
    return (
        <div className="score-board">
            <div className="score">Score: {score}</div>
            <div className="best-score">Best Score: {bestScore}</div>
            <button type="button" onClick={resetScores}>Reset</button>
        </div>
    );
}