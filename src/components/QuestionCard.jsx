import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Delete } from "lucide-react";
import { validateAnswer } from "../utils/gameEngine";

export default function QuestionCard({
  question,
  onAnswerSubmit,
  answeredState, // { isAnswered: bool, isCorrect: bool, selectedAnswer: any, timeTaken: num }
  onNextQuestion,
  isLastQuestion
}) {
  // Local state for interactive widgets
  const [unscrambleSelected, setUnscrambleSelected] = useState([]);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [arrangedWords, setArrangedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);

  // Reset widget states when question changes
  useEffect(() => {
    setTypedAnswer("");
    if (question.type === "unscramble") {
      setUnscrambleSelected([]);
    } else if (question.type === "word_arrange") {
      const wordsList = question.words || [];
      // Shuffle the available words slightly so they don't appear in the right order initially
      setAvailableWords(
        wordsList.map((w, idx) => ({ id: `${w}-${idx}`, text: w }))
      );
      setArrangedWords([]);
    }
  }, [question.id]);

  // Handle Multiple Choice selection
  const handleSelectOption = (option) => {
    if (answeredState.isAnswered) return;
    const isCorrect = validateAnswer(question, option);
    onAnswerSubmit(option, isCorrect);
  };

  // Unscramble letter tap
  const handleLetterTap = (letter, originalIndex) => {
    if (answeredState.isAnswered) return;
    if (unscrambleSelected.some((item) => item.index === originalIndex)) return;
    const next = [...unscrambleSelected, { letter, index: originalIndex }];
    setUnscrambleSelected(next);
  };

  const handleRemoveLetter = (indexToRemove) => {
    if (answeredState.isAnswered) return;
    setUnscrambleSelected(unscrambleSelected.filter((_, idx) => idx !== indexToRemove));
  };

  const handleUnscrambleSubmit = (e) => {
    if (e) e.preventDefault();
    if (answeredState.isAnswered) return;
    const finalWord = typedAnswer.trim()
      ? typedAnswer.trim()
      : unscrambleSelected.map((i) => i.letter).join("");
    if (!finalWord) return;
    const isCorrect = validateAnswer(question, finalWord);
    onAnswerSubmit(finalWord, isCorrect);
  };

  // Word arrange chip tap
  const handleWordAdd = (wordObj) => {
    if (answeredState.isAnswered) return;
    setArrangedWords([...arrangedWords, wordObj]);
    setAvailableWords(availableWords.filter((w) => w.id !== wordObj.id));
  };

  const handleWordRemove = (wordObj) => {
    if (answeredState.isAnswered) return;
    setAvailableWords([...availableWords, wordObj]);
    setArrangedWords(arrangedWords.filter((w) => w.id !== wordObj.id));
  };

  const handleWordArrangeSubmit = () => {
    if (answeredState.isAnswered) return;
    const assembled = arrangedWords.map((w) => w.text).join(" ");
    if (!assembled) return;
    const isCorrect = validateAnswer(question, assembled);
    onAnswerSubmit(assembled, isCorrect);
  };

  // Numeric input submit
  const handleNumericSubmit = (e) => {
    if (e) e.preventDefault();
    if (answeredState.isAnswered || !typedAnswer.trim()) return;
    const isCorrect = validateAnswer(question, typedAnswer.trim());
    onAnswerSubmit(typedAnswer.trim(), isCorrect);
  };

  // Keyboard shortcut listener: Enter advances to next question when answered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && answeredState.isAnswered) {
        onNextQuestion();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [answeredState.isAnswered, onNextQuestion]);

  const rawLetters = question.scrambled
    ? question.scrambled.replace(/\s+/g, "").split("")
    : [];

  return (
    <div className={`question-card glass-card ${answeredState.isAnswered ? (answeredState.isCorrect ? "anim-pop" : "anim-shake") : "anim-slide-up"}`}>
      {/* Question Metadata */}
      <div className="question-meta">
        <div className="meta-badges">
          <span className={`pill-subject ${question.subject || "English"}`}>
            {question.subject || "English"}
          </span>
          <span className={`pill-diff ${question.difficulty}`}>
            {question.difficulty}
          </span>
          <span
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              fontWeight: 600
            }}
          >
            • {question.category}
          </span>
        </div>
      </div>

      {/* Question Title / Prompt */}
      <h3 className="question-title">{question.question}</h3>

      {/* 1. Unscramble Widget */}
      {question.type === "unscramble" && (
        <div style={{ textAlign: "center" }}>
          {/* Constructed word slot */}
          <div className="word-slot-box">
            {unscrambleSelected.length === 0 && !typedAnswer ? (
              <span style={{ color: "var(--text-subtle)", fontSize: "0.9rem" }}>
                Tap the letter tiles below or type your answer...
              </span>
            ) : (
              unscrambleSelected.map((item, idx) => (
                <button
                  key={idx}
                  className="word-chip"
                  onClick={() => handleRemoveLetter(idx)}
                  disabled={answeredState.isAnswered}
                  title="Click to remove"
                >
                  {item.letter}
                </button>
              ))
            )}
          </div>

          {/* Letter Tiles */}
          {!answeredState.isAnswered && (
            <div className="letters-bank">
              {rawLetters.map((char, idx) => {
                const isUsed = unscrambleSelected.some((item) => item.index === idx);
                return (
                  <button
                    key={idx}
                    className={`letter-tile ${isUsed ? "selected" : ""}`}
                    onClick={() => handleLetterTap(char, idx)}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          )}

          {/* Optional typing input + actions */}
          {!answeredState.isAnswered && (
            <form onSubmit={handleUnscrambleSubmit} style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", maxWidth: "340px", margin: "0 auto" }}>
                <input
                  type="text"
                  placeholder="Or type word here..."
                  className="num-input"
                  style={{ fontSize: "1rem", textTransform: "uppercase" }}
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value.toUpperCase())}
                />
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setUnscrambleSelected([]);
                    setTypedAnswer("");
                  }}
                  title="Reset letters"
                >
                  <RotateCcw size={16} />
                </button>
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* 2. Word Arrange Widget */}
      {question.type === "word_arrange" && (
        <div>
          {/* Assembled sentence area */}
          <div className="word-slot-box" style={{ minHeight: "70px" }}>
            {arrangedWords.length === 0 ? (
              <span style={{ color: "var(--text-subtle)", fontSize: "0.9rem" }}>
                Tap the words below in the correct order to construct the sentence
              </span>
            ) : (
              arrangedWords.map((w) => (
                <button
                  key={w.id}
                  className="word-chip"
                  onClick={() => handleWordRemove(w)}
                  disabled={answeredState.isAnswered}
                  title="Click to put back"
                >
                  {w.text}
                </button>
              ))
            )}
          </div>

          {/* Available Words */}
          {!answeredState.isAnswered && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                justifyContent: "center",
                margin: "1rem 0 1.5rem"
              }}
            >
              {availableWords.map((w) => (
                <button
                  key={w.id}
                  className="btn-secondary"
                  style={{ padding: "0.5rem 0.9rem" }}
                  onClick={() => handleWordAdd(w)}
                >
                  {w.text}
                </button>
              ))}
            </div>
          )}

          {!answeredState.isAnswered && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setAvailableWords(
                    (question.words || []).map((w, idx) => ({ id: `${w}-${idx}`, text: w }))
                  );
                  setArrangedWords([]);
                }}
              >
                <RotateCcw size={16} /> Reset
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleWordArrangeSubmit}
                disabled={arrangedWords.length === 0}
              >
                Submit Sentence
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Numeric Input Widget */}
      {question.type === "numeric" && (
        <div>
          {!answeredState.isAnswered ? (
            <form onSubmit={handleNumericSubmit}>
              <div className="numeric-input-box">
                <input
                  type="text"
                  className="num-input"
                  placeholder="Enter number..."
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={!typedAnswer.trim()}
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: "center", margin: "1rem 0" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                Your Answer:{" "}
                <span
                  style={{
                    color: answeredState.isCorrect ? "#34d399" : "#f87171"
                  }}
                >
                  {answeredState.selectedAnswer}
                </span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* 4. Multiple Choice & All Other Question Types */}
      {question.type !== "unscramble" &&
        question.type !== "word_arrange" &&
        question.type !== "numeric" &&
        question.options && (
          <div className="options-grid">
            {question.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = answeredState.selectedAnswer === option;
              const isCorrectOpt = validateAnswer(question, option);

              let optionClass = "";
              if (answeredState.isAnswered) {
                if (isCorrectOpt) {
                  optionClass = "correct";
                } else if (isSelected && !answeredState.isCorrect) {
                  optionClass = "wrong";
                }
              }

              return (
                <button
                  key={idx}
                  className={`option-btn ${optionClass}`}
                  onClick={() => handleSelectOption(option)}
                  disabled={answeredState.isAnswered}
                >
                  <span className="opt-badge">{letter}</span>
                  <span style={{ flex: 1 }}>{option}</span>
                  {answeredState.isAnswered && isCorrectOpt && (
                    <CheckCircle2 size={20} style={{ color: "#34d399" }} />
                  )}
                  {answeredState.isAnswered && isSelected && !answeredState.isCorrect && (
                    <XCircle size={20} style={{ color: "#f87171" }} />
                  )}
                </button>
              );
            })}
          </div>
        )}

      {/* Feedback & Explanation Box */}
      {answeredState.isAnswered && (
        <div className={`feedback-box ${answeredState.isCorrect ? "correct" : "wrong"}`}>
          <div className="feedback-header">
            {answeredState.isCorrect ? (
              <>
                <CheckCircle2 size={20} />
                <span>Brilliant! Correct Answer (+{answeredState.earnedPoints} pts)</span>
              </>
            ) : (
              <>
                <XCircle size={20} />
                <span>Incorrect!</span>
              </>
            )}
          </div>

          {!answeredState.isCorrect && (
            <div className="feedback-answer">
              <strong>Correct Answer: </strong>
              <span style={{ color: "#34d399", fontWeight: 700 }}>
                {question.answer}
              </span>
            </div>
          )}

          {question.explanation && (
            <p className="feedback-explanation">
              💡 <strong>Explanation:</strong> {question.explanation}
            </p>
          )}

          <button className="btn-primary btn-next-action" onClick={onNextQuestion}>
            <span>{isLastQuestion ? "View Round Results" : "Next Question"}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
