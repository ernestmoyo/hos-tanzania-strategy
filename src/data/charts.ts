// Mermaid chart definitions for each task.

export const stakeholderChart = `flowchart TB
  classDef moh fill:#10231d,stroke:#2dd4a7,color:#eaf1ef;
  classDef ralg fill:#10202e,stroke:#5b9bd5,color:#eaf1ef;
  classDef gate fill:#2a1d10,stroke:#f4b740,color:#f4e3c0;
  classDef comm fill:#161f17,stroke:#7bbf6a,color:#eaf1ef;
  classDef ext fill:#1a1622,stroke:#a98fd0,color:#eaf1ef;

  HOS([HOS launch in Tanzania]):::moh

  subgraph P1[" PRINCIPAL 1 — Ministry of Health "]
    PSMOH[PS-MoH · Dr Seif Shekalaghe<br/>owns Digital Health Strategy]:::moh
    MOHICT[MoH Dir. ICT / HIS<br/>DHIS2 · AfyaCare]:::moh
    DM[Dep. Minister · Dr Florence Samizi<br/>the skeptic]:::moh
  end

  subgraph P2[" PRINCIPAL 2 — PO-RALG / TAMISEMI "]
    RALGICT[Dir. ICT · Eric Kitali<br/>owns GoTHOMIS]:::ralg
    FAC[~90% of patient contacts<br/>dispensaries · health centres]:::ralg
  end

  subgraph GATES[" GATES TO CLEAR EARLY "]
    EGA[e-GA · GISP + domestic hosting]:::gate
    PDPC[PDPC · health data + transfer veto]:::gate
  end

  subgraph COMM[" WHERE ADOPTION IS WON "]
    RMO[RMO / DMO · CHMT · CCHP budget]:::comm
    CHW[CHWs · facility nurses · super-users]:::comm
  end

  subgraph EXT[" ALLIES & PRECEDENTS "]
    DTREE[D-tree · Jamii ni Afya<br/>Zanzibar at scale]:::ext
    PATH[PATH · Gates · World Bank · Global Fund]:::ext
  end

  HOS --> PSMOH
  HOS --> RALGICT
  PSMOH --- MOHICT
  PSMOH -. reconcile two stacks .- RALGICT
  RALGICT --> FAC
  PSMOH --> EGA
  RALGICT --> PDPC
  EGA --> RMO
  PDPC --> RMO
  RMO --> CHW
  DTREE -. proof point .-> CHW
  PATH -. integrate, don't compete .-> MOHICT
  DM -. convert via peers .-> RMO
`;

export const engagementChart = `flowchart LR
  classDef step fill:#10231d,stroke:#2dd4a7,color:#eaf1ef;
  classDef out fill:#2a1d10,stroke:#f4b740,color:#f4e3c0;

  A[1 · Listen<br/>give the history<br/>the dignity of being right]:::step
  B[2 · Reframe<br/>her skepticism =<br/>my quality bar]:::step
  C[3 · Rules before product<br/>ownership · data · off-switch]:::step
  D[4 · Smallest credible proof<br/>a bounded pilot she scopes]:::step
  E[5 · One mutual commitment<br/>ideally her idea]:::step
  W([Earn meeting two]):::out

  A --> B --> C --> D --> E --> W
  E -. 48h: note that proves I listened .-> F[Kept small promise]:::out
  F -. 30d: deliver exactly as scoped .-> G[Skeptic → champion]:::out
`;

export const offlineChart = `flowchart LR
  classDef dev fill:#10231d,stroke:#2dd4a7,color:#eaf1ef;
  classDef sync fill:#10202e,stroke:#5b9bd5,color:#eaf1ef;
  classDef nat fill:#1a1622,stroke:#a98fd0,color:#eaf1ef;
  classDef fb fill:#2a1d10,stroke:#f4b740,color:#f4e3c0;

  CHW[CHW / nurse device<br/>capture + validate + decide<br/>ON-DEVICE]:::dev
  Q[Local queue<br/>solar + battery powered]:::dev
  SYNC{Signal?}:::sync
  HDU[HDU API · e-GA standards]:::sync
  DHIS[DHIS2]:::nat
  GOT[GoTHOMIS]:::nat
  SMS[SMS / USSD fallback<br/>referral · stockout · danger-sign]:::fb

  CHW --> Q --> SYNC
  SYNC -- yes --> HDU
  SYNC -- no --> Q
  HDU --> DHIS
  HDU --> GOT
  CHW -- critical events on 2G --> SMS
  DHIS -. insight returned to facility .-> CHW
`;

export const crisisChart = `flowchart TB
  classDef bad fill:#2a1212,stroke:#e8746a,color:#f6d6d2;
  classDef good fill:#10231d,stroke:#2dd4a7,color:#eaf1ef;
  classDef act fill:#2a1d10,stroke:#f4b740,color:#f4e3c0;

  N[Newspaper questions foreign<br/>digital-health + data privacy]:::act
  D{First instinct:<br/>rebut publicly?}:::act
  X[Vendor becomes the story<br/>confirms the frame]:::bad
  S[STABILISE · don't react publicly<br/>respond to the concern, not the article]:::good
  M[Ministry leads the voice<br/>Sand stands quietly behind]:::good
  F[24h: data-governance fact sheet<br/>where hosted · who accesses · the law]:::good
  T[4 anchored messages<br/>Tanzanian data · Tanzania chose it<br/>custodian can be switched off · welcome scrutiny]:::good
  W([Doubt → demonstration of control]):::good

  N --> D
  D -- no --> S
  D -. the damaging move .-> X
  S --> M --> F --> T --> W
`;

export const roadmapChart = `gantt
  title First 90 days — Tanzania HOS launch
  dateFormat X
  axisFormat %s
  section Anchor & gates
  Verify post-reshuffle org chart      :0, 14
  Anchor 2 PSs + ICT directors         :0, 21
  Engage e-GA + PDPC early             :7, 28
  section Evidence
  SARA readiness assessment            :14, 35
  Co-build scoring rubric w/ PO-RALG   :21, 42
  Corroborate Rwanda figures           :14, 30
  section Pilot design
  Select 3 districts (published rubric) :35, 49
  Recruit RMO/DMO internal owner       :42, 56
  Co-design workflow w/ CHWs           :49, 70
  section Prove
  Kill paper duplicate (sign-off)      :56, 75
  Train-the-trainer cascade            :63, 84
  First leading-indicator review       :77, 90
`;
