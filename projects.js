// Live project notes. Roles: ai = AI research & agents, data = data science, ml = machine learning.
window.portfolioProjects = [
  {
    id: "retailpred", title: "retailPRED — forecasting, with receipts", subtitle: "A demand-forecasting platform that refused to serve its own model.",
    roles: ["data", "ml"], roleLabels: ["DATA SCIENCE", "MACHINE LEARNING", "MLOPS"],
    technologies: ["Python", "LightGBM", "Databricks", "Delta Lake", "dbt", "FastAPI", "Tableau"], year: "FIELD NOTE · 2026",
    summary: "A rebuild of an undergraduate GCP + Airflow forecasting project into an evidence-gated platform on Databricks — and the story of how a predeclared promotion gate refused its own champion, a research satellite explained why, and the fix became a regime classifier.",
    narration: "v1 ran recurring forecasts on GCP + Airflow: monthly Census values expanded into synthetic weekly rows, engineered features computed with inclusive windows, models served from pickles. Its scoreboard — LightGBM 9.76% MAPE vs seasonal naive 14.11% — said feature engineering worked. The v2 rebuild's corrected protocol said otherwise immediately: naive's honest value is 6.35%, and the entire v1 gap was protocol artifact — weekly pseudo-replication plus inclusive target features handed the models memorizable structure that naive couldn't touch. This is backtest/serve skew, the most common silent failure in applied DS: the features weren't wrong, the measuring stick was. On revised history the engineered features genuinely win (4.49% vs 6.35%); on the vintage gate built to replicate live conditions, the edge vanished (8.49% vs 8.16%) — because the input those features need, settled history, doesn't exist at a real forecast origin. Why wasn't this caught in v1? Structurally couldn't be: the evaluation protocol had no independent monthly targets, and the vintage data didn't exist yet. A research satellite then decomposed the failure on exploration origins: error concentrates at long horizons and high-revision categories (Spearman −0.755); preliminary-noise poisoning and revision-aware features were refuted; forecast combination helped (+1.18pp) but wasn't gate-shaped; and the theta method — a literature-backed technique — beat naive in 10/11 categories, then failed its own holdout because its dominance was regime-specific. Every result triangulated one mechanism: who wins is decided by regime state, not model capacity.",
    result: "The learnable object the evidence supports is a small causal policy — trend strength, volatility, revision churn, lagged performance deciding naive vs theta — whose worst case in a calm gate ties naive and whose upside is the volatile phases where naive loses by 9pp. The general lesson is the industry-relevant one: 'my model won' always deserves the follow-up question — won under what data conditions? The most valuable artifact in the project isn't any model; it's the vintage harness that would have caught the v1 result on day one.",
    visuals: [{type:"bars",caption:"M5 hierarchy: global LightGBM 0.8133 WRMSSE vs seasonal naive 0.8697 — promoted, all five windows."},{type:"trend",caption:"Point-in-time MRTS: real-time naive 8.16% vs LightGBM 8.49% — the gate said no."}]
  },
  {
    id: "agent-evaluation", title: "Evaluating tool-using agents", subtitle: "A practical framework for measuring reliable task completion.",
    roles: ["ai", "ml"], roleLabels: ["AI RESEARCH", "AGENTIC AI", "MACHINE LEARNING"],
    technologies: ["Python", "LLM evaluation", "Jupyter"], year: "EXAMPLE PROJECT",
    summary: "A starter case study for an agent evaluation project. Replace this with a brief, specific description of the question, your contribution, and the main takeaway.",
    narration: "Describe the problem and why it matters. Explain the system or experiment you built, what you compared, and how you judged success. Keep the narrative focused on your own contribution and make the reasoning easy to follow.",
    result: "Add a grounded finding here: a measured improvement, an important failure mode, or what the investigation changed about your approach. Avoid claiming impact you cannot substantiate.",
    visuals: [{type:"agent",caption:"Example agent workflow diagram — replace with your own figure."},{type:"bars",caption:"Example evaluation comparison — replace with real results."}]
  },
  {
    id: "community-trends", title: "Finding patterns in public data", subtitle: "Turning a messy dataset into a decision-ready view.",
    roles: ["data"], roleLabels: ["DATA SCIENCE"],
    technologies: ["Python", "Pandas", "SQL"], year: "EXAMPLE PROJECT",
    summary: "A starter case study for a data science project. Replace this with the question you explored, the data you used, and the decision or insight the analysis supported.",
    narration: "Walk through the data source, the main cleaning and analysis steps, and the choices that shaped the result. Mention limitations and uncertainty so a reader can understand what the evidence does and does not say.",
    result: "Summarize the most useful finding and who it helped. Include a number only when you can explain how it was measured.",
    visuals: [{type:"trend",caption:"Example trend visualization — replace axes and values with your own analysis."},{type:"distribution",caption:"Example distribution — use a chart that supports the story."}]
  },
  {
    id: "model-study", title: "A careful model comparison", subtitle: "Testing where a lightweight model works—and where it doesn’t.",
    roles: ["ml", "data"], roleLabels: ["MACHINE LEARNING", "DATA SCIENCE"],
    technologies: ["scikit-learn", "Python", "Matplotlib"], year: "EXAMPLE PROJECT",
    summary: "A starter case study for a machine learning project. Replace this with the task, the model contribution, and the most useful evaluation result.",
    narration: "Explain the baseline, model choices, training and validation setup, and the metric that best reflects the real task. Describe tradeoffs such as latency, interpretability, or data quality when relevant.",
    result: "State what the comparison taught you and what you would do next. A clear negative result or limitation can be as valuable as a performance gain.",
    visuals: [{type:"bars",caption:"Example model metric comparison — replace with your evaluated models."},{type:"trend",caption:"Example validation curve — add the figure that best explains your result."}]
  }
];
