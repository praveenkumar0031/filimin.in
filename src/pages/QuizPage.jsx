import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quizData';
import { useAuth } from '../context/AuthContext';
import { saveScore as updateModuleScore } from '../services/scoreService';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import '../styles/quiz.css';

// Animated Counter Component for the Ticker effect
function AnimatedCounter({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    
    const duration = 500; // ms
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export default function QuizPage() {
  const { moduleKey } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Floating animation state
  const [floatingScore, setFloatingScore] = useState(null);

  useEffect(() => {
    if (quizData[moduleKey]) {
      setQuestions(quizData[moduleKey]);
    } else {
      navigate('/quiz');
    }
  }, [moduleKey, navigate]);

  const handleOptionClick = (optionIdx, isCorrect, event) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    if (isCorrect) {
      const rect = event.currentTarget.getBoundingClientRect();
      // Set starting position for the floating score relative to viewport
      setFloatingScore({
        id: Date.now(),
        x: rect.left + rect.width / 2,
        y: rect.top,
        amount: 100 // Points per question
      });
      
      setScore(prev => prev + 100);
    }

    setTimeout(() => {
      setFloatingScore(null);
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      }
    }, 1500); // 1.5s delay to show result and float animation
  };

  const isFinished = questions.length > 0 && currentIdx === questions.length - 1 && isAnswered;

  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (isFinished && user) {
      const doSave = async () => {
        setIsSaving(true);
        setSaveError(null);
        try {
          await updateModuleScore(user.uid, moduleKey, score);
        } catch (err) {
          console.error('[QuizPage] Score save failed:', err.code, err.message);
          setSaveError('Score could not be saved — connection issue. Your quiz is done but the score was not recorded. Try again on Dashboard.');
        } finally {
          setIsSaving(false);
        }
      };
      doSave();
    }
  }, [isFinished, user, moduleKey, score]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIdx];
  const letters = ['A', 'B', 'C', 'D'];

  if (isFinished) {
    return (
      <div className="quiz-layout">
        <Navbar />
        <div className="quiz-playfield">
          <motion.div
            className="results-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <h2>QUEST COMPLETE</h2>
            <div className="ticker-label">Final Wealth</div>
            <div className="results-score"><AnimatedCounter value={score} /></div>

            {saveError && (
              <div style={{
                background: 'var(--color-risk)',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-body)',
                marginTop: '1rem',
                marginBottom: '0.5rem',
                textAlign: 'left',
              }}>
                ⚠ {saveError}
              </div>
            )}

            <button
              className="btn-arcade primary"
              onClick={() => navigate('/dashboard')}
              disabled={isSaving}
              style={{ marginTop: '2rem' }}
            >
              {isSaving ? 'SAVING DATA...' : 'RETURN TO PORTFOLIO'}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-layout">
      {/* Navbar overlay for top nav */}
      <Navbar />
      
      {/* Ticker Header */}
      <div className="quiz-ticker">
        <div>
          <div className="ticker-label">Quest: {moduleKey.toUpperCase()}</div>
          <div className="progress-fraction">Q {String(currentIdx + 1).padStart(2, '0')}/{String(questions.length).padStart(2, '0')}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="ticker-label">Score</div>
          <div className="ticker-value"><AnimatedCounter value={score} /></div>
        </div>
      </div>

      {/* Playfield */}
      <div className="quiz-playfield">
        
        {/* Floating Multiplier Drop */}
        <AnimatePresence>
          {floatingScore && (
            <motion.div
              className="floating-score"
              initial={{ opacity: 1, y: floatingScore.y - 150, x: floatingScore.x - 20 }}
              animate={{ opacity: 0, y: floatingScore.y - 250 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              +{floatingScore.amount}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          key={currentIdx} // Animate on question change
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="question-card">
            <h2 className="question-text">{currentQuestion.question}</h2>
          </div>
          
          <div className="options-grid">
            {currentQuestion.options.map((opt, idx) => {
              const isCorrect = (idx === currentQuestion.answer);
              let stateClass = '';
              if (isAnswered) {
                if (isCorrect) stateClass = 'correct';
                else if (selectedOption === idx) stateClass = 'incorrect';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  className={`option-btn ${stateClass}`}
                  onClick={(e) => handleOptionClick(idx, isCorrect, e)}
                >
                  <div className="option-letter">{letters[idx]}</div>
                  <div style={{ flex: 1 }}>{opt}</div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
