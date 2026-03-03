import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import "./result.css";

const Badge = ({ percent }: { percent: number }) => {
  if (percent >= 85) return <span className="excellentstyle">Excellent</span>;
  if (percent >= 65) return <span className="goodstyle">Good</span>;
  if (percent >= 45) return <span className="averagestyle">Average</span>;
  return <span className="poorstyle">Need Work</span>;
};

interface ResultItem {
  _id?: string;
  id?: string;
  title?: string;
  technology?: string;
  totalQuestions?: number;
  correct?: number;
  wrong?: number;
  timeSpent?: string;
}

interface ResultProps {
  apiBase?: string;
}

export const Result: React.FC<ResultProps> = ({
  apiBase = "http://localhost:5000",
}) => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const getAuthHeader = (): HeadersInit => {
    const token = localStorage.getItem("authToken");
    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  };

  useEffect(() => {
    let mounted = true;

    const fetchResults = async (tech = "all") => {
      setLoading(true);
      setError(null);

      try {
        const q =
          tech && tech.toLowerCase() !== "all"
            ? `?technology=${encodeURIComponent(tech)}`
            : "";

        const res = await fetch(`${apiBase}/api/results${q}`, {
          headers: getAuthHeader(),
        });

        let data: any = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (!mounted) return;

        if (res.ok && data?.success) {
          setResults(Array.isArray(data.results) ? data.results : []);
        } else if (res.status === 401) {
          setError("Not authenticated. Please log in.");
          setResults([]);
        } else {
          setResults([]);
          toast.warn("Unexpected server response.");
        }
      } catch (err) {
        if (!mounted) return;
        setError("Could not load result from server");
        toast.error("Could not load result from server");
        setResults([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchResults(selectedTechnology);

    return () => {
      mounted = false;
    };
  }, [apiBase, selectedTechnology]);

  useEffect(() => {
    let mounted = true;

    const fetchAllForTechList = async () => {
      try {
        const res = await fetch(`${apiBase}/api/results`, {
          headers: getAuthHeader(),
        });

        let data: any = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (!mounted) return;

        if (res.ok && data?.success) {
          const all = Array.isArray(data.results) ? data.results : [];
          const techSet = new Set<string>();
          all.forEach((r: ResultItem) => {
            if (r.technology) techSet.add(r.technology);
          });
          setTechnologies(
            Array.from(techSet).sort((a, b) => a.localeCompare(b))
          );
        }
      } catch {}
    };

    fetchAllForTechList();

    return () => {
      mounted = false;
    };
  }, [apiBase]);

  const makeKey = (r: ResultItem) =>
    r?._id ?? `${r?.id ?? ""}-${r?.title ?? ""}`;

  const summary = useMemo(() => {
    const totalQs = results.reduce(
      (s, r) => s + (Number(r.totalQuestions) || 0),
      0
    );
    const totalCorrect = results.reduce(
      (s, r) => s + (Number(r.correct) || 0),
      0
    );
    const totalWrong = results.reduce(
      (s, r) => s + (Number(r.wrong) || 0),
      0
    );
    const pct = totalQs
      ? Math.round((totalCorrect / totalQs) * 100)
      : 0;
    return { totalQs, totalCorrect, totalWrong, pct };
  }, [results]);

  const grouped = useMemo(() => {
    const map: Record<string, ResultItem[]> = {};
    results.forEach((r) => {
      const track = (r.title || "General").split(" ")[0];
      if (!map[track]) map[track] = [];
      map[track].push(r);
    });
    return map;
  }, [results]);

  const handleSelectTech = (tech: string) => {
    setSelectedTechnology(tech || "all");
  };

  function StripCard({ item }: { item: ResultItem }) {
    const percent = item.totalQuestions
      ? Math.round(
          (Number(item.correct) / Number(item.totalQuestions)) * 100
        )
      : 0;

    const getLevel = (it: ResultItem) => {
      const id = (it.id || "").toLowerCase();
      const title = (it.title || "").toLowerCase();
      if (id.includes("basic") || title.includes(" basic"))
        return { letter: "B", style: "levelBasic" };
      if (
        id.includes("intermediate") ||
        title.includes(" intermediate")
      )
        return { letter: "I", style: "levelIntermediate" };
      return { letter: "A", style: "levelAdvanced" };
    };

    const level = getLevel(item);

    return (
      <div className="card">
        <div className="cardHeader">
          <span className={level.style}>{level.letter}</span>
          <h4>{item.title || "Untitled"}</h4>
        </div>
        <div className="cardBody">
          <Badge percent={percent} />
          <p>
            {item.correct ?? 0} / {item.totalQuestions ?? 0} • {percent}%
            {item.timeSpent ? ` • ${item.timeSpent}` : ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="filterButtons">
        <span className="filterLabel">Filter by tech:</span>

        <button
          onClick={() => handleSelectTech("all")}
          className={`filterButton ${
            selectedTechnology === "all"
              ? "filterButtonActive"
              : "filterButtonInactive"
          }`}
        >
          All
        </button>

        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => handleSelectTech(tech)}
            className={`filterButton ${
              selectedTechnology === tech
                ? "filterButtonActive"
                : "filterButtonInactive"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="summary">
        <h3>Overall</h3>
        <Badge percent={summary.pct} />
        <p>
          {summary.totalCorrect} / {summary.totalQs} • {summary.pct}%
        </p>
      </div>

      {Object.keys(grouped).map((group) => (
        <div key={group}>
          <h3>{group}</h3>
          {grouped[group].map((item) => (
            <StripCard key={makeKey(item)} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
};