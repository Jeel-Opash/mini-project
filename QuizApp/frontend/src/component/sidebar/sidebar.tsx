import React, { useEffect, useRef, useState } from "react";
import "./sidebar.css";
import questionsData from "../../assets/dummydata.js";
import { TbHtml, TbBrandCpp } from "react-icons/tb";
import { FaCss3, FaNodeJs, FaReact, FaJava, FaRegStar } from "react-icons/fa";
import { LiaNode } from "react-icons/lia";
import { SiMongodb } from "react-icons/si";
import { AiOutlinePython } from "react-icons/ai";
import { BsBootstrap, BsAward } from "react-icons/bs";
import { FiZap } from "react-icons/fi";
import { GiTargetArrows, GiLaurelsTrophy } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { PiBookOpenTextLight } from "react-icons/pi";

const API_BASE = "http://localhost:5000";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type Level = {
  id: string;
  name: string;
  questions: number;
  icon: React.ReactNode;
};

type Tech = {
  id: string;
  name: string;
  icon: React.ReactNode;
  levels: Level[];
};

export const Sidebar: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const submittedRef = useRef<boolean>(false);
  const asideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768 && isSidebarOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const iconMap: Record<string, React.ReactNode> = {
    html: <TbHtml />,
    css: <FaCss3 />,
    js: <FaNodeJs />,
    react: <FaReact />,
    node: <LiaNode />,
    mongodb: <SiMongodb />,
    java: <FaJava />,
    python: <AiOutlinePython />,
    cpp: <TbBrandCpp />,
    bootstrap: <BsBootstrap />,
  };

  const levelIconMap: Record<string, React.ReactNode> = {
    basic: <FaRegStar />,
    intermediate: <FiZap />,
    advanced: <GiTargetArrows />,
  };

  const technologies: Tech[] = Object.keys(questionsData).map((techId) => ({
    id: techId,
    name: techId.charAt(0).toUpperCase() + techId.slice(1),
    icon: iconMap[techId] || <TbHtml />,
    levels: Object.keys(questionsData[techId]).map((levelId) => ({
      id: levelId,
      name: levelId.charAt(0).toUpperCase() + levelId.slice(1),
      questions: questionsData[techId][levelId].length,
      icon: levelIconMap[levelId] || <FaRegStar />,
    })),
  }));

  const handleTechSelect = (techId: string) => {
    if (selectedTech === techId) {
      setSelectedTech(null);
      setSelectedLevel(null);
    } else {
      setSelectedTech(techId);
      setSelectedLevel(null);
    }
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const getQuestionData = (): Question[] => {
    if (!selectedTech || !selectedLevel) return [];
    return questionsData[selectedTech]?.[selectedLevel] || [];
  };

  const handleAnswerSelect = (answerId: number) => {
    const questionData = getQuestionData();
    const newAnswers = { ...userAnswers, [currentQuestion]: answerId };
    setUserAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questionData.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 500);
  };

  const calculateResults = () => {
    const questionData = getQuestionData();
    let correct = 0;
    questionData.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) correct++;
    });
    const total = questionData.length;
    return {
      correct,
      total,
      percentage: total ? Math.round((correct / total) * 100) : 0,
    };
  };

  // Save result to backend using fetch
  const saveResult = async () => {
    const token = localStorage.getItem("token");
    console.log("SaveResult - Token exists:", !!token);

    if (!token) {
      console.log("SaveResult - No token, user not logged in");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: `${selectedTech?.toUpperCase()} - ${selectedLevel}`,
          technology: selectedTech,
          level: selectedLevel,
          totalQuestions: score.total,
          correct: score.correct,
          wrong: score.total - score.correct,
        }),
      });

      console.log("SaveResult - Response status:", response.status);
      const data = await response.json();
      console.log("SaveResult - Response data:", data);

      if (!response.ok) {
        console.error("SaveResult - Error response:", data);
      }
    } catch (error) {
      console.error("SaveResult - Network error:", error);
    }
  };

  const score = calculateResults();
  const questionData = getQuestionData();
  const currentQ = questionData[currentQuestion];

  const getPerformanceStatus = () => {
    if (score.percentage >= 90) return { text: "Outstanding!", icon: <HiOutlineSparkles /> };
    if (score.percentage >= 75) return { text: "Excellent", icon: <GiLaurelsTrophy /> };
    if (score.percentage >= 60) return { text: "Good Job!", icon: <BsAward /> };
    return { text: "Keep Practicing", icon: <PiBookOpenTextLight /> };
  };

  const performance = getPerformanceStatus();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (showResults && !submittedRef.current) {
      submittedRef.current = true;
      saveResult();
    }
  }, [showResults]);

  return (
    <div className="sidebar-container">
      <aside className={`sidebar ${isSidebarOpen ? "" : "closed"}`} ref={asideRef}>
        <h2>Technologies</h2>
        {technologies.map((t) => (
          <div key={t.id}>
            <div className={`tech-item ${selectedTech === t.id ? "active" : ""}`} onClick={() => handleTechSelect(t.id)}>
              <span style={{ marginRight: 8 }}>{t.icon}</span>
              <span>{t.name}</span>
            </div>
            {selectedTech === t.id && (
              <div style={{ marginLeft: 12, marginTop: 8 }}>
                {t.levels.map((l) => (
                  <div key={(l as Level).id} className={`level-item ${selectedLevel === (l as Level).id ? "active" : ""}`} onClick={() => handleLevelSelect((l as Level).id)}>
                    <span style={{ marginRight: 8 }}>{(l as Level).icon}</span>
                    <span>{(l as Level).name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      <main className="main-content">
        <button className="menu-button" onClick={toggleSidebar} style={{ marginBottom: 12 }}>
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
        <div className="quiz-card">
          <h3 className="quiz-title">{selectedTech && selectedLevel ? `${selectedTech.toUpperCase()} - ${selectedLevel}` : "Select a technology and level to begin"}</h3>

          {questionData.length > 0 ? (
            <>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / Math.max(1, questionData.length)) * 100}%` }} />
              </div>
              <p>{currentQ?.question ?? ""}</p>
              <div>
                {currentQ?.options.map((opt, idx) => (
                  <button key={idx} className={`option-btn ${userAnswers[currentQuestion] === idx ? "selected" : ""}`} onClick={() => handleAnswerSelect(idx)}>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>No questions available for the selected tech/level.</p>
          )}

          {showResults && (
            <div className="results-card">
              <h2>Quiz Completed!</h2>
              <p style={{ marginTop: 4, color: "var(--text-secondary)" }}>
                {`You've completed the ${selectedLevel ?? "level"}`}
              </p>
              <div style={{ marginTop: 12 }}>
                <button
                  className="menu-button"
                  onClick={() => {
                    setShowResults(false);
                    setSelectedLevel(null);
                    setSelectedTech(null);
                    setCurrentQuestion(0);
                    setUserAnswers({});
                    submittedRef.current = false;
                  }}>
                  Keep Practicing
                </button>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="performance-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span>{performance.icon}</span>
                  <span>{performance.text}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
                <div style={{ flex: 1, background: "rgba(34,197,94,0.08)", padding: 16, borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#16a34a" }}>{score.correct}</div>
                  <div style={{ color: "var(--text-secondary)" }}>Correct Answers</div>
                </div>
                <div style={{ flex: 1, background: "rgba(239,68,68,0.08)", padding: 16, borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#ef4444" }}>{Math.max(0, score.total - score.correct)}</div>
                  <div style={{ color: "var(--text-secondary)" }}>Incorrect Answers</div>
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ color: "var(--text-secondary)" }}>Overall Score</div>
                  <div style={{ color: "var(--text-secondary)" }}>{score.percentage}%</div>
                </div>
                <div className="progress-bar" style={{ height: 14, borderRadius: 12 }}>
                  <div className="progress-fill" style={{ width: `${score.percentage}%`, height: "100%", borderRadius: 12 }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
