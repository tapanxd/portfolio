import type { PortfolioContent } from '../types/portfolio'

/* ============================================================================
   PORTFOLIO CONTENT

   This is the only file with copy in it. Components read from here.

   ONE VALUE STILL NEEDS FILLING IN. It is an empty string, and the UI hides
   the corresponding element rather than shipping a dead link:

     engineer.resumeUrl   -> the "Download CV" button in the hero

   Figures inside career deliverables are wrapped in **double asterisks**, which
   render bold. That is the only markup allowed in copy.

   Optional: engineer.portraitUrl. Empty renders a typographic monogram plate
   instead of a photograph. Drop a file in /public and point at it, for
   example '/portrait.jpg'.

   House style, applied throughout: no em-dashes, every number is attached to
   the mechanism that produced it, and nothing is claimed that is not backed
   by the source documents.
   ========================================================================= */

export const portfolio: PortfolioContent = {
  engineer: {
    name: 'Tapan Panchal',
    monogram: 'TP',
    title: 'Data Engineer',
    roleTag: 'Databricks + Lakehouse',
    location: 'Toronto, Ontario, Canada',
    availability: 'AVAILABLE FOR DATA ENGINEERING ROLES ACROSS CANADA',
    availabilityShort: 'AVAILABLE ACROSS CANADA',
    email: 'tapan007panchal@gmail.com',
    phone: '+1 647-916-7903',
    linkedinUrl: 'https://www.linkedin.com/in/tapan-panchal',
    githubUrl: 'https://github.com/tapanxd',
    resumeUrl: '',
    portraitUrl: '',
    portraitAlt: 'Tapan Panchal',
  },

  hero: {
    headline: 'I build and run Databricks lakehouses that stay correct.',
    narrative:
      'Databricks certified, based in Toronto. Four years catching bad data before anyone downstream acts on it.',
    metrics: [
      {
        id: 'throughput',
        value: '1M+',
        label: 'Records per day',
        subLabel: 'CDC incremental loads, five relational systems plus ADLS Gen2',
        isBoxed: false,
      },
      {
        id: 'runtime',
        value: '40%',
        label: 'Lower batch runtime',
        subLabel: 'Partition strategy, broadcast joins, executor sizing',
        isBoxed: true,
      },
      {
        id: 'refresh',
        value: '6h to <2h',
        label: 'Batch refresh window',
        subLabel: 'On-premises SQL Server onto Azure Databricks ELT',
        isBoxed: false,
      },
      {
        id: 'incidents',
        value: '30%',
        label: 'Fewer production incidents',
        subLabel: 'Schema validation, null detection, reconciliation, alerting',
        isBoxed: true,
      },
    ],
  },

  philosophy: {
    axiom:
      'By the time a report looks wrong, someone has already acted on the number.',
    body: [
      'Most pipelines I have inherited did not fail loudly. A source system changes a column type, or starts sending nulls in a field that never carried them, and the job still finishes green. You find out days later, when a number looks wrong and someone has already acted on it.',
      'Catching that after the fact is possible, and plenty of teams do it well with good observability. I would rather the data never get that far. Schema validation and null detection at ingest, row count reconciliation between source and target, and alerts that fire before anything downstream reads the table. At Cavallo that framework took production incidents down 30 percent.',
      'The rest is throughput and cost, and most of it is unglamorous. Partition strategy, broadcast joins where the size ratio justifies them, and executors sized to the workload rather than to whatever the cluster was provisioned for. Average batch runtime fell 40 percent, and the cluster bill fell with it.',
    ],
    portraitCaption: {
      top: 'Tapan Panchal, Data Engineer',
      bottom: 'Toronto, Ontario',
    },
    metadata: [
      { label: 'Experience', value: '4 years on Azure Databricks and Delta Lake' },
      { label: 'Focus', value: 'Lakehouse pipelines, data quality, Spark cost tuning' },
      { label: 'Education', value: 'M. Applied Computer Science, Dalhousie University' },
    ],
  },

  caseStudies: [
    {
      id: 'ai-triage',
      tag: 'AI TOOLING',
      title: 'The Databricks App that writes tickets',
      meta: 'Cavallo Technologies',
      summary:
        'Every client engagement started with someone reading a requirements document and typing what it asked for into GitHub by hand. I built a Databricks App that calls ai_query to do the reading and write the issues instead.',
      techStack: ['Databricks Apps', 'ai_query', 'Python', 'GitHub'],
      metrics: [
        { label: 'Manual triage step', value: 'Removed' },
        { label: 'Runs as', value: 'Databricks App' },
      ],
      detail: {
        problem:
          'Every client engagement started the same way. Someone read a requirements document written in prose, decided what it actually asked for, split it into units of work, and typed those into GitHub by hand. It was slow, it was inconsistent between whoever happened to do it, and it had to happen again on every revision of the document.',
        mechanism: [
          'Built the tool as a Databricks App so it runs where the data and the governance already are, rather than as a separate service to deploy and secure.',
          'Used ai_query directly against the requirement text to extract discrete units of work rather than summarising the document.',
          'Constrained the output to a fixed structure, so each unit came back as a scoped issue with a title and body rather than free text a human still had to reshape.',
          'Wrote the results out as GitHub issues, so the output landed in the tracker the team already worked from.',
        ],
        proof:
          'Removed a recurring manual triage step from the team workflow. Requirement documents now arrive as scoped issues rather than as reading homework.',
      },
    },
    {
      id: 'silent-failure',
      tag: 'DATA QUALITY',
      title: 'Catching silent failure',
      meta: 'Cavallo Technologies',
      summary:
        'A source changes a column type and the job still finishes green. I built a framework that validates schema, detects nulls and reconciles row counts against the source, before anything downstream reads the table.',
      techStack: ['Python', 'SQL', 'PySpark', 'Databricks Workflows'],
      metrics: [
        { label: 'Production incidents', value: '30% fewer' },
        { label: 'Checks run', value: 'Before consumption' },
      ],
      detail: {
        problem:
          'Pipelines were succeeding while the data they produced was wrong. A source system would change a column type, or start sending nulls in a field that had never carried them, and the job would complete without complaint. The failure surfaced days later as a report that did not look right, at which point tracing it back to the source cost more than catching it would have.',
        mechanism: [
          'Schema validation at ingest, so a changed column type is caught at the boundary instead of propagating into Delta tables.',
          'Null detection on fields that are not expected to carry them, which is where the drift showed up most often.',
          'Row count reconciliation between source and target, so records lost in transit are visible rather than inferred.',
          'Structured error handling and alerting wired to the checks, so the alert fires before downstream consumers read the table rather than after.',
        ],
        proof:
          'Production incidents down 30 percent. Failures that used to be found by a confused analyst are now found by the pipeline.',
      },
    },
    {
      id: 'spark-cost',
      tag: 'PERFORMANCE',
      title: 'Making Spark cheaper',
      meta: 'Cavallo Technologies',
      summary:
        'Batch jobs were slow for ordinary reasons. Skewed partitions, shuffle joins on tables small enough to broadcast, and executors nobody had resized since the workload changed.',
      techStack: ['PySpark', 'Delta Lake', 'Azure Databricks'],
      metrics: [
        { label: 'Average batch runtime', value: '40% lower' },
        { label: 'Cluster spend', value: 'Fell with it' },
      ],
      detail: {
        problem:
          'Batch runtimes had grown along with the data, and the cluster bill had grown with the runtimes. Nothing was broken, which is exactly why nobody had looked at it. The jobs finished. They just cost more every month than they needed to.',
        mechanism: [
          'Revisited partition strategy so the partition column matched how the data was actually queried, not how it was originally loaded.',
          'Replaced shuffle joins with broadcast joins wherever the size ratio between the two sides justified it.',
          'Right-sized executor configuration against the current workload rather than the one the cluster had been provisioned for.',
        ],
        proof:
          'Average batch runtime down 40 percent, and cluster spend down with it. Same outputs, same schedule, smaller bill.',
      },
    },
    {
      id: 'bank-migration',
      tag: 'MIGRATION',
      title: 'Getting a bank off SQL Server',
      meta: 'Tata Consultancy Services',
      summary:
        'A regulated bank was running its batch on on-premises SQL Server, six hours a night. I moved those workloads onto Azure Databricks ELT without asking every downstream report to change with them.',
      techStack: ['Azure Databricks', 'Azure Data Factory', 'SQL Server', 'Delta Lake'],
      metrics: [
        { label: 'Batch refresh window', value: '6h to under 2h' },
        { label: 'Client', value: 'Regulated banking' },
      ],
      detail: {
        problem:
          'A regulated banking client was running its batch workloads on on-premises SQL Server, with a refresh window of about six hours. Reporting downstream had been built against those tables over years. The migration could not be a rewrite that asked every consumer to change at once.',
        mechanism: [
          'Rebuilt the on-premises workloads as ELT pipelines on Azure Databricks, moving transformation off the source database.',
          'Kept the shape the downstream reporting expected, so consumers did not have to be migrated in lockstep with the pipelines.',
          'Worked inside a regulated environment, which meant change had to be documented and reviewable rather than fast.',
        ],
        proof:
          'Batch refresh window cut from six hours to under two, with the reporting that depended on it still working.',
      },
    },
    {
      id: 'api-ingestion',
      tag: 'INTEGRATION',
      title: 'APIs you do not control',
      meta: 'Tata Consultancy Services',
      summary:
        'Three external providers, each breaking ingestion in its own way. Tokens expiring mid-run, pagination that differed between endpoints, and fields changing type with no warning.',
      techStack: ['Python', 'REST', 'Webhooks', 'Azure Data Factory'],
      metrics: [
        { label: 'Ingestion failures', value: '8 to under 2' },
        { label: 'External providers', value: '3' },
      ],
      detail: {
        problem:
          'Ingestion from three external providers failed regularly, and each provider failed differently. Access tokens expired part way through a run. Pagination behaved differently between providers, and sometimes between endpoints. Fields appeared, disappeared or changed type with no warning, because the providers had no obligation to tell us.',
        mechanism: [
          'Token refresh handled inside the ingestion layer, so an expiry mid-run is a retry rather than a failed load.',
          'Pagination handled per provider instead of assuming a shared convention.',
          'Schema drift absorbed at ingest, so an added or changed field does not halt the pipeline or silently corrupt the target.',
        ],
        proof: 'Ingestion failures across the three providers fell from eight to under two.',
      },
    },
    {
      id: 'unity-catalog',
      tag: 'GOVERNANCE',
      title: 'Unity Catalog in daily use',
      meta: 'Cavallo Technologies',
      summary:
        'Governance gets written as a policy problem and lived as an access problem. I organised schemas and access controls across catalogs so analysts could find and use data without filing a request for every dataset.',
      techStack: ['Unity Catalog', 'Azure Databricks', 'Delta Lake'],
      metrics: [
        { label: 'Ownership', value: 'Day to day' },
        { label: 'Sources governed', value: '5 plus ADLS Gen2' },
      ],
      detail: {
        problem:
          'Governance is usually described as a policy problem and lived as an access problem. Analysts and data scientists could not find datasets, or could find them but not read them, and every question turned into a request to someone else. That someone else was the bottleneck.',
        mechanism: [
          'Organised datasets and schemas across catalogs so the structure told people where to look, rather than requiring them to ask.',
          'Managed access controls in Unity Catalog day to day, as ongoing ownership rather than a one-time setup.',
          'Kept discovery and permission aligned, so what a person could find was what they were cleared to use.',
        ],
        proof:
          'Day to day governance ownership across the Cavallo lakehouse, covering five relational sources plus ADLS Gen2.',
      },
    },
  ],

  projects: [
    {
      id: 'data-engineering',
      name: 'Data engineering',
      items: [
        {
          id: 'github-lakehouse',
          name: 'GitHub Lakehouse',
          summary:
            'A Databricks lakehouse on Azure, deployed with Databricks Asset Bundles across separate dev, preview and production targets. GitHub event data lands through Bronze, Silver and Gold Delta layers, with the Silver and Gold hops running as Delta Live Tables pipelines. CI/CD on the dev target, and cost monitoring on the cluster.',
          stack: [
            'Databricks',
            'Delta Live Tables',
            'PySpark',
            'Delta Lake',
            'Asset Bundles',
            'CI/CD',
            'Python',
          ],
          links: [
            { label: 'github-lakehouse', href: 'https://github.com/tapanxd/github-lakehouse' },
          ],
        },
        {
          id: 'oss-radar',
          name: 'OSS Radar',
          summary:
            'Tracks 49 GitHub repositories across the AI tooling ecosystem and produces a weekly digest that ranks changes by materiality, so an archived repo or a licence change outranks a patch bump. A collector on GitHub Actions writes append-only observations to Postgres, dbt models them across staging, intermediate and marts with an SCD Type 2 spine derived from the observation log rather than from snapshots, and three Airflow DAGs run collection, transformation and an asset-triggered digest. 172 dbt tests and 13 pytest tests behind it.',
          stack: [
            'dbt',
            'Apache Airflow',
            'Postgres',
            'Python',
            'Docker',
            'GitHub Actions',
            'Metabase',
            'SCD Type 2',
            'SQL',
          ],
          links: [{ label: 'oss-radar', href: 'https://github.com/tapanxd/oss-radar' }],
          inProgress: true,
        },
      ],
    },
    {
      id: 'machine-learning',
      name: 'Machine learning',
      items: [
        {
          id: 'oceancall',
          name: 'OceanCall, marine sound classifier',
          summary:
            'Identifies whale species from underwater audio across five cetaceans, including humpback, killer whale and sperm whale. PANNs CNN14 extracts the audio embeddings and XGBoost classifies them. Serverless on AWS, with a static frontend on S3 and CloudFront, inference routed through API Gateway and Lambda, and metadata in DynamoDB. Master of Applied Computer Science project supervised by Dr. Lu Yang, trained on the Watkins Marine Mammal Sound Database.',
          stack: [
            'Python',
            'TensorFlow',
            'XGBoost',
            'FastAPI',
            'AWS Lambda',
            'API Gateway',
            'SageMaker',
            'DynamoDB',
            'S3',
            'CloudFront',
          ],
          links: [{ label: 'oceancall', href: 'https://github.com/tapanxd/oceancall' }],
        },
        {
          id: 'cross-sell-propensity',
          name: 'Cross-sell propensity',
          summary:
            'Finds which health insurance customers are most likely to buy vehicle insurance, on a Kaggle dataset of 381,109 customers with a 12 percent response rate. SQL profiles and cleans the data in SQLite, Power Query joins the reference tables and engineers tenure, premium and channel bands, and a logistic regression baseline scores and tiers every customer against random targeting on a held-out set. The model and its Power BI dashboard are still in progress.',
          stack: ['SQL', 'SQLite', 'Power Query', 'Python', 'Logistic regression', 'Power BI'],
          links: [
            {
              label: 'cross-sell-propensity',
              href: 'https://github.com/tapanxd/cross-sell-propensity',
            },
          ],
          inProgress: true,
        },
      ],
    },
    {
      id: 'applications',
      name: 'Applications',
      items: [
        {
          id: 'communedrop',
          name: 'CommuneDrop',
          summary:
            'A delivery platform built as six microservices covering auth, orders, payments, geocoding, live location and the frontend. Kafka carries events between them, Socket.IO pushes driver positions, Redis caches geocoding lookups, and a .NET service on Duende Identity Server handles OAuth2. Provisioned with Terraform onto Amazon EKS. Team project.',
          stack: [
            'React',
            '.NET',
            'Node.js',
            'TypeScript',
            'Kafka',
            'Redis',
            'Kubernetes',
            'Terraform',
            'AWS EKS',
          ],
          links: [{ label: 'CommuneDrop', href: 'https://github.com/tapanxd/CommuneDrop' }],
        },
        {
          id: 'bytecomm',
          name: 'ByteComm',
          summary:
            'A real-time chatroom over WebSockets, containerised with Docker and deployed to AWS EC2 on Terraform managed infrastructure.',
          stack: ['Node.js', 'WebSockets', 'Docker', 'Terraform', 'AWS EC2'],
          links: [{ label: 'chatroom-app', href: 'https://github.com/tapanxd/chatroom-app' }],
        },
        {
          id: 'petpal',
          name: 'PetPal',
          summary:
            'A React Native pet care app. Profiles for several pets at once, vaccination and medication tracking, weight charted over time, a milestones journal, maps for nearby veterinary services, and weather pulled from a companion Python API.',
          stack: [
            'React Native',
            'Expo',
            'TypeScript',
            'Firebase Auth',
            'Firestore',
            'Python',
          ],
          links: [
            { label: 'PetPal', href: 'https://github.com/tapanxd/PetPal' },
            { label: 'petpal-weatherAPI', href: 'https://github.com/tapanxd/petpal-weatherAPI' },
          ],
        },
        {
          id: 'software-visualizer',
          name: 'Software Dependency Visualizer',
          summary:
            'Reads JAR bytecode with ASM to map class level dependencies, inheritance, implementation and composition, and renders them as an interactive graph you can filter by relationship type. Built with TDD to 90 percent test coverage. Team project.',
          stack: ['Java 17', 'Spring Boot', 'React', 'TypeScript', 'React Flow', 'Docker'],
          links: [
            { label: 'software-visualizer', href: 'https://github.com/tapanxd/software-visualizer' },
          ],
        },
      ],
    },
  ],

  featuredCaseIds: ['ai-triage', 'silent-failure', 'spark-cost'],

  operatingAxiom:
    'You should hear about bad data from the pipeline, not from an analyst.',

  skills: [
    {
      id: 'databricks',
      name: 'Databricks and Spark',
      icon: 'lightning',
      note: 'Lakehouse builds on Azure, from ingest through to the Gold layer.',
      items: [
        { name: 'Azure Databricks', level: 'core' },
        { name: 'Delta Lake', level: 'core' },
        { name: 'PySpark', level: 'core' },
        { name: 'Spark Structured Streaming', level: 'core' },
        { name: 'Databricks Workflows', level: 'core' },
        { name: 'Spark cost and performance tuning', level: 'core' },
        { name: 'Databricks Apps and ai_query', level: 'working' },
      ],
    },
    {
      id: 'pipelines',
      name: 'Pipelines and cloud',
      icon: 'flow',
      note: 'Five relational sources plus ADLS Gen2, over one million records a day.',
      items: [
        { name: 'Azure Data Factory', level: 'core' },
        { name: 'ADLS Gen2', level: 'core' },
        { name: 'Azure SQL and SQL Server', level: 'core' },
        { name: 'CDC and incremental loads', level: 'core' },
        { name: 'Schema evolution and drift', level: 'core' },
        { name: 'REST and Webhook APIs', level: 'core' },
        { name: 'Apache Airflow', level: 'core' },
        { name: 'Kafka and dbt', level: 'working' },
        { name: 'AWS S3, Glue, Redshift', level: 'working' },
      ],
    },
    {
      id: 'governance',
      name: 'Modelling and governance',
      icon: 'shield',
      note: 'Schema checks, null detection and row counts before anything consumes the data.',
      items: [
        { name: 'Unity Catalog', level: 'core' },
        { name: 'Access controls and schemas', level: 'core' },
        { name: 'Data quality frameworks', level: 'core' },
        { name: 'Automated validation', level: 'core' },
        { name: 'Monitoring and alerting', level: 'core' },
        { name: 'Data modelling', level: 'working' },
        { name: 'Dimensional and star schema', level: 'working' },
        { name: 'Data warehousing', level: 'working' },
      ],
    },
    {
      id: 'practice',
      name: 'Languages and practice',
      icon: 'code',
      note: 'Code review and containerised releases, manual release effort down 60 percent.',
      items: [
        { name: 'Python', level: 'core' },
        { name: 'SQL', level: 'core' },
        { name: 'Query optimisation and tuning', level: 'core' },
        { name: 'Git and GitHub Actions', level: 'core' },
        { name: 'CI/CD', level: 'core' },
        { name: 'Docker', level: 'core' },
        { name: 'Automated testing', level: 'core' },
        { name: 'Code review and Agile scrum', level: 'working' },
      ],
    },
  ],

  stackLogos: [
    { slug: 'databricks', name: 'Databricks' },
    { slug: 'apachespark', name: 'Apache Spark' },
    { slug: 'python', name: 'Python' },
    { slug: 'apachekafka', name: 'Apache Kafka' },
    { slug: 'apacheairflow', name: 'Apache Airflow' },
    { slug: 'docker', name: 'Docker' },
    { slug: 'git', name: 'Git' },
    { slug: 'github', name: 'GitHub' },
  ],

  experience: [
    {
      id: 'cavallo',
      kind: 'employment',
      period: 'Sep 2025 to Apr 2026',
      role: 'Data Engineer',
      organisation: 'Cavallo Technologies Inc',
      location: 'Toronto, ON',
      badge: 'CLIENT SERVICES',
      summary:
        'Built and ran a Databricks lakehouse on Azure for client delivery, along with the data quality, governance and CI/CD layers around it.',
      deliverables: [
        'Built and operated a Databricks lakehouse on Azure with Azure Data Factory, onboarding ADLS Gen2 and **five relational source systems** through CDC based incremental loads processing **over one million records daily**.',
        'Governed the lakehouse in Unity Catalog day to day, managing access controls and organising datasets and schemas across catalogs so analysts and data scientists could discover and use them safely.',
        'Tuned Spark workloads through partition strategy, broadcast joins and executor configuration, cutting average batch runtime by **40 percent** and lowering cluster spend.',
        'Built a data quality framework in Python and SQL covering schema validation, null detection, error handling and reconciliation, with alerting.',
        'Raised engineering standards through code review, automated testing and CI/CD with Git, GitHub Actions and Docker.',
        'Built an internal Databricks App using ai_query that converts client requirement documents into structured, scoped GitHub issues.',
      ],
      telemetry: [
        { label: 'Batch runtime', value: '40% lower' },
        { label: 'Production incidents', value: '30% fewer' },
        { label: 'Manual release effort', value: '60% lower' },
        { label: 'Daily throughput', value: '1M+ records' },
      ],
    },
    {
      id: 'dalhousie',
      kind: 'study',
      period: 'Aug 2024 to Dec 2025',
      role: 'Master of Applied Computer Science',
      organisation: 'Dalhousie University',
      location: 'Halifax, NS',
      badge: 'GRADUATE STUDY',
      summary: 'Full time graduate study. GPA 4.13 out of 4.30.',
      deliverables: [],
      telemetry: [],
    },
    {
      id: 'tcs',
      kind: 'employment',
      period: 'Aug 2021 to Jul 2024',
      role: 'Data Engineer',
      organisation: 'Tata Consultancy Services',
      location: 'India',
      badge: 'REGULATED BANKING',
      summary:
        'Moved a regulated banking client off on-premises SQL Server and onto Azure Databricks, then kept the pipelines around it honest.',
      deliverables: [
        'Migrated on-premises SQL Server workloads to Azure Databricks ELT pipelines for a regulated banking client, cutting batch refresh windows from **six hours to under two**.',
        'Built ingestion from REST and Webhook APIs with token refresh, pagination and schema drift handling across **three external providers**.',
        'Orchestrated multi-task ETL workflows in Apache Airflow with dependency management and retry logic.',
        'Implemented monitoring, alerting and incident management across **four production source systems**, resolving **12 recurring data integrity issues** that had distorted reporting accuracy for six months or more.',
        'Partnered with analysts, DBAs and business stakeholders in Agile scrum, running requirements gathering and maintaining engineering and architectural documentation.',
      ],
      telemetry: [
        { label: 'Batch refresh', value: '6h to under 2h' },
        { label: 'Failure resolution', value: '3h to under 45m' },
        { label: 'Ingestion failures', value: '8 to under 2' },
        { label: 'Integrity issues closed', value: '12' },
      ],
    },
  ],

  credentials: [
    {
      id: 'databricks',
      name: 'Databricks',
      items: [
        {
          id: 'de-professional',
          kind: 'Certification',
          name: 'Certified Data Engineer Professional',
          issuer: 'Databricks',
          credentialId: '175799063',
          dates: 'Issued March 2026, valid to March 2028',
          description:
            'Production pipeline design on Databricks, Delta Lake internals, Unity Catalog governance, and Spark performance tuning.',
          verificationUrl:
            'https://credentials.databricks.com/ca78817a-9a82-46ba-8a4e-cde511d67821',
          featured: true,
        },
        {
          id: 'de-associate',
          kind: 'Certification',
          name: 'Certified Data Engineer Associate',
          issuer: 'Databricks',
          credentialId: '169287220',
          dates: 'Issued December 2025, valid to December 2027',
          description:
            'Core lakehouse work on Databricks: Delta Lake tables, ETL with Spark SQL and PySpark, and workflow orchestration.',
          verificationUrl:
            'https://credentials.databricks.com/72b57bb9-7478-4743-aed7-ac9f5dd05459',
        },
        {
          id: 'uc-governance',
          kind: 'Partner training',
          name: 'Data and AI Governance with Unity Catalog',
          issuer: 'Databricks',
          credentialId: '',
          dates: 'Issued October 2025, valid to October 2027',
          description:
            'Partner training on governing data and AI assets in Unity Catalog: catalogs, access control and lineage.',
          verificationUrl:
            'https://credentials.databricks.com/f5d1c903-6a2e-49bd-8f43-215bb266b379',
        },
        {
          id: 'fundamentals',
          kind: 'Accreditation',
          name: 'Databricks Fundamentals',
          issuer: 'Databricks',
          credentialId: '',
          dates: 'Issued September 2025',
          description:
            'Accreditation covering the Databricks Lakehouse Platform, its architecture, and where each component fits.',
          verificationUrl:
            'https://credentials.databricks.com/76fc893d-f2ab-4fa0-8508-0afe313e3897',
        },
      ],
    },
    {
      id: 'education',
      name: 'Education',
      items: [
        {
          id: 'dalhousie-macs',
          kind: 'Degree',
          name: 'Master of Applied Computer Science',
          issuer: 'Dalhousie University, Halifax',
          credentialId: '',
          dates: 'Aug 2024 to Dec 2025, GPA 4.13 of 4.30',
          description:
            'Completed December 2025, alongside a return to full time engineering work.',
          verificationUrl: '',
        },
        {
          id: 'gtu-be',
          kind: 'Degree',
          name: 'B.E. Computer Science',
          issuer: 'Gujarat Technological University, India',
          credentialId: '',
          dates: 'Jun 2017 to May 2021, GPA 9.18 of 10',
          description:
            'Completed May 2021, immediately preceding four years of data engineering practice.',
          verificationUrl: '',
        },
      ],
    },
  ],

  contact: {
    headline: 'Tell me what keeps breaking.',
    body: 'I am open to data engineering roles anywhere in Canada, onsite or remote, and I will relocate. Email is the fastest way to reach me, and I answer everything.',
  },
}
