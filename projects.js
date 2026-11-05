// Live project notes. Roles: ai = AI research & agents, data = data science, ml = machine learning.
window.portfolioProjects = [
  {
    id: "retailpred", title: "retailPRED — forecasting, with receipts", subtitle: "A demand-forecasting platform that refused to serve its own model.",
    roles: ["data", "ml"], roleLabels: ["DATA SCIENCE", "MACHINE LEARNING", "MLOPS"],
    technologies: ["Python", "LightGBM", "Databricks", "Delta Lake", "dbt", "FastAPI", "Tableau"], year: "FIELD NOTE · 2026",
    summary: "A rebuild of an undergraduate retail-forecasting project into an evidence-gated platform: native-frequency data contracts, point-in-time evaluation on 106 ALFRED vintages, a four-task scheduled Databricks pipeline, and a serving contract that stays dark until a model earns the right to forecast.",
    narration: "The revised-history numbers looked great — LightGBM beat seasonal naive by 29% across eleven retail categories. So the harder question came next: what could each model actually know at forecast time? On real-time vintages the edge disappeared entirely (8.49% vs 8.16% mean category WAPE), and a promotion gate written before the measurement refused the model. Meanwhile the same gates verified the pipeline honestly: 13 Delta tables bootstrapped, 20 data tests green against live Census pulls, and every refusal recorded in an execution ledger.",
    result: "The gate failed, and that is the product: the showcase site stays on historical evidence, the API keeps returning typed refusals, and the only path to live serving runs back through a predeclared measurement. A promotion gate that rejects its own champion is worth more than a leaderboard it can flatter.",
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
