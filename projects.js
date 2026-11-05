// Replace these clearly labeled starter examples with your own project details.
// Roles: ai = AI research & agents, data = data science, ml = machine learning.
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
  }
];
