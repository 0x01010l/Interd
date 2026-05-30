# AML Alert Triage Copilot - Full Documentation

## 1) Product Overview

AML Alert Triage Copilot is a Snowflake Native App for AML and Financial Crime teams. It helps analysts prioritize alerts, review explainable rationale, execute case lifecycle actions, and maintain audit-ready evidence and operational visibility.

The app is designed to run inside Snowflake and keep sensitive compliance workflows in-platform.

---


 
## 2) Core Capabilities



- Deterministic alert triage (priority score, priority band, suggested disposition, SLA bucket)
- Cortex-assisted explanation generation with safety guardrails
- Idempotent processing for reruns (no duplicate/corrupt triage state)
- Case lifecycle workflows (sync, assignment, disposition updates, escalation, feedback)
- Explainability outputs (observed facts and contributing transaction context)
- Governance-oriented role model (`APP_ADMIN`, `APP_OPERATOR`, `APP_ANALYST`)
- Operational observability (latency, throughput, failures, model-call cost)
- Evaluation framework with golden test set and regression gates

---


## 3) Repository Structure


- `native_app/manifest.yml` - Native App manifest
- `native_app/setup.sql` - main setup entrypoint
- `native_app/sql/` - core SQL definitions
  - `01_tables.sql` - schemas and tables
  - `02_validation.sql` - readiness procedure
  - `03_cortex_triage.sql` - triage + AI + logs
  - `04_security_governance.sql` - roles, grants, secure analyst views
  - `05_evaluation_framework.sql` - eval procedures/views
  - `06_observability.sql` - observability views/config
  - `07_v1_analyst_workflow.sql` - case and explainability workflows
- `native_app/tasks/01_pipeline.sql` - task definition (not executed in install path by default)
- `native_app/ui/dashboard.py` - Streamlit UI baseline
- `docs/` - quickstart, validations, onboarding, demo and readiness assets

---

## 4) Data Model (High Level)

### Input Staging Tables

- `STAGING.ALERTS_NORMALIZED`
- `STAGING.TRANSACTIONS_NORMALIZED`
- `STAGING.CUSTOMERS_NORMALIZED`


### Feature and Output Tables


- `FEATURES.ALERT_FEATURES`
- `OUTPUT.TRIAGE_QUEUE`
- `OUTPUT.ALERT_EXPLANATIONS`
- `OUTPUT.CASES`
- `OUTPUT.CASE_EVENTS`
- `OUTPUT.ANALYST_FEEDBACK`
- `OUTPUT.ALERT_EVIDENCE`
- `OUTPUT.ALERT_CONTRIBUTING_TXNS`

### Monitoring and Quality Tables

- `MONITORING.PIPELINE_RUN_LOGS`
- `MONITORING.AUDIT_EVENTS`
- `MONITORING.GOLDEN_ALERT_EXPECTATIONS`
- `MONITORING.EVAL_RUNS`
- `MONITORING.EVAL_RESULTS`

---

## 5) Security and Access Model

### Application Roles

- `APP_ADMIN` - full operational/admin control in app scope
- `APP_OPERATOR` - operational and monitoring access
- `APP_ANALYST` - analyst-facing secure views and workflow procedures

### Access Enforcement

- Secure analyst views:
  - `OUTPUT.V_TRIAGE_QUEUE_ANALYST`
  - `OUTPUT.V_ALERT_EXPLANATIONS_ANALYST`
- Analyst customer scope mapping:
  - `CORE.ANALYST_CUSTOMER_ACCESS`
  - procedures:
    - `CORE.GRANT_ANALYST_CUSTOMER_ACCESS(...)`
    - `CORE.REVOKE_ANALYST_CUSTOMER_ACCESS(...)`

### Important Note

For Native App portability, sensitive masking and row scope are enforced in secure-view logic instead of relying on account-level policy objects.

---

## 6) AI Guardrails and Reliability

`CORE.GENERATE_ALERT_TRIAGE()` includes:

- Prompt version lookup from `CORE.PROMPT_LIBRARY`
- Structured output parse/validation via JSON checks
- Fallback summary generation when model output is invalid/unavailable
- Flags written to `OUTPUT.ALERT_EXPLANATIONS.TOP_FEATURES`:
  - `llm_structured_output`
  - `llm_output_valid`
  - `fallback_used`
- Idempotent `MERGE` writes into key output tables

---

## 7) Observability and Auditability

### Key Views

- `MONITORING.V_PIPELINE_HEALTH`
- `MONITORING.V_PIPELINE_DAILY_METRICS`
- `MONITORING.V_COMPLIANCE_AUDIT_TRAIL`
- `MONITORING.V_LATEST_EVAL_RUN`

### Tracked Metrics

- latency
- throughput
- failure counts
- invalid output/fallback counts
- model call counts
- estimated model cost
- run-level traceability via `RUN_ID`

---

## 8) Evaluation and Regression

### Main Procedures

- `CORE.RUN_GOLDEN_EVAL(run_label STRING)`
- `CORE.CHECK_REGRESSION_GATES(current_run_id STRING, baseline_run_id STRING)`

### Inputs and Outputs

- Test expectations: `MONITORING.GOLDEN_ALERT_EXPECTATIONS`
- Run summary: `MONITORING.EVAL_RUNS`
- Per-test results: `MONITORING.EVAL_RESULTS`

Use evaluation before promoting prompt/model/rule changes.

---

## 9) Installation and Deployment

## Prerequisites

- Snowflake account with Native App support
- Application package and stage available
- Distribution set to `EXTERNAL` for Marketplace publishing

### Package Flow (Release Channels Enabled)

1. Upload app files to stage path (example: `@.../v7/`)
2. Register version:
   - `ALTER APPLICATION PACKAGE <pkg> REGISTER VERSION vN USING '@stage/path';`
3. Add version to default release channel:
   - `ALTER APPLICATION PACKAGE <pkg> MODIFY RELEASE CHANNEL DEFAULT ADD VERSION vN;`
4. Create local test install:
   - `CREATE APPLICATION <app> FROM APPLICATION PACKAGE <pkg> USING VERSION vN PATCH 0;`

### External Publishing Gate

You cannot set an external default release directive until Snowflake security review approves the target patch.

---

## 10) Quick Start (Operational)

### 1. Seed Demo Data

Run:

- `docs/demo_dataset.sql`

### 2. Validate Readiness

```sql
USE DATABASE AML_TRIAGE_APP;
USE SCHEMA CORE;
CALL CORE.VALIDATE_INPUT_READINESS();
```

### 3. Generate Triage

```sql
CALL CORE.GENERATE_ALERT_TRIAGE();
```

### 4. Review Outputs

```sql
SELECT * FROM OUTPUT.TRIAGE_QUEUE ORDER BY PRODUCED_AT DESC LIMIT 20;
SELECT * FROM OUTPUT.ALERT_EXPLANATIONS ORDER BY GENERATED_AT DESC LIMIT 20;
```

### 5. Run Workflow

```sql
CALL CORE.SYNC_CASES_FROM_TRIAGE();
CALL CORE.BUILD_ALERT_EXPLAINABILITY();
```

### 6. Check Health

```sql
SELECT * FROM MONITORING.V_PIPELINE_HEALTH ORDER BY STARTED_AT DESC LIMIT 10;
```

---

## 11) Validation Scripts

Use scripts under `docs/`:

- `security_validation.sql`
- `ai_guardrails_validation.sql`
- `evaluation_regression.sql`
- `observability_validation.sql`
- `v1_workflow_validation.sql`

Also available:

- `consumer_onboarding.sql`
- `demo_dataset.sql`
- `demo_walkthrough.md`
- `marketplace_readiness_checklist.md`

---

## 12) Known Operational Behavior

- Default install path avoids automatic task creation to prevent consumer privilege blockers.
- Manual trigger is currently the reliable baseline:
  - `CALL CORE.GENERATE_ALERT_TRIAGE();`
- Evaluation status depends on seeded expectations and current scoring behavior.

---

## 13) Troubleshooting

### A) Listing says package is organization-only

Set distribution:

```sql
ALTER APPLICATION PACKAGE <pkg> SET DISTRIBUTION = EXTERNAL;
```

### B) Listing says invalid patch for external accounts

- Add version to release channel
- Wait for security scan approval
- Then set default release directive:

```sql
ALTER APPLICATION PACKAGE <pkg>
  MODIFY RELEASE CHANNEL DEFAULT
  SET DEFAULT RELEASE DIRECTIVE VERSION=vN PATCH=0;
```

### C) Readiness returns `is_ready = false`

Ensure non-empty rows exist in all three staging inputs:

- alerts
- transactions
- customers

### D) Evaluation fails unexpectedly

- verify seeded test cases map to current outputs
- run triage first
- inspect `MONITORING.EVAL_RESULTS` failure reasons

---

## 14) Marketplace Positioning

### Primary Value

- reduce AML alert backlog
- accelerate triage
- improve decision consistency
- strengthen audit readiness

### Recommended Category Direction

- Risk & Compliance (primary)
- Financial Services
- AI / Machine Learning

---

## 15) Suggested Next Enhancements

- consumer-safe scheduling strategy for production automation
- stronger model/prompt calibration to reduce fallback-heavy outputs
- UI polish for analyst productivity and executive-level demo impact
- commercial packaging (edition and pricing model)

---

## 16) Version Notes (Current State)

Current tested app generation includes:

- Native App deployment flow validated
- external distribution configured
- secure views and role model in place
- demo and onboarding scripts aligned with app behavior
- end-to-end validation flow available in `docs/`
