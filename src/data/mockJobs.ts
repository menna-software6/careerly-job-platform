import { Job } from '../types/job';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Staff Frontend Infrastructure Engineer',
    company: 'Vercel',
    companyInitials: 'VC',
    location: 'San Francisco, CA',
    workMode: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Lead',
    department: 'Frontend',
    minSalary: 210000,
    maxSalary: 265000,
    currency: 'USD',
    postedDate: '2 days ago',
    postedTimestamp: Date.now() - 2 * 86400000,
    featured: true,
    urgent: false,
    applicantCount: 42,
    description: 'We are seeking a Staff Frontend Infrastructure Engineer to spearhead next-generation developer tooling and web performance architecture across Next.js and Vercel edge infrastructure. In this role, you will design compile-time primitives, optimize client-side bundle hydration, and shape open web standards for millions of global engineers.',
    responsibilities: [
      'Architect and build high-throughput compilers, bundlers, and edge runtime utilities',
      'Benchmark and optimize First Input Delay, Core Web Vitals, and interaction latency across millions of client deployments',
      'Collaborate with the open-source community, TC39 delegates, and browser vendors on web primitives',
      'Mentor senior engineers and drive technical design reviews across distributed engineering hubs'
    ],
    requirements: [
      '8+ years of professional software engineering experience with deep focus on JavaScript runtimes and AST transformations',
      'Demonstrated expertise in Rust, TypeScript, WebAssembly, or low-level Node.js internals',
      'Track record of building and maintaining developer tooling or large-scale design systems',
      'Strong architectural intuition for browser layout engines, DOM APIs, and network protocols'
    ],
    niceToHave: [
      'Contributions to Next.js, Turbopack, SWC, Vite, or esbuild ecosystems',
      'Previous experience speaking at developer conferences or authoring technical RFCs'
    ],
    skills: ['TypeScript', 'Rust', 'Next.js', 'Web Performance', 'AST Parsing', 'Node.js'],
    benefits: [
      '$210k - $265k base + competitive equity grant',
      'Comprehensive medical, dental, and vision insurance with 100% premium coverage',
      '$4,000 annual home-office and hardware stipend',
      'Flexible paid time off and quarterly company-wide recharge days',
      '$2,500 annual continuous education and conference budget'
    ],
    companyDetails: {
      about: 'Vercel provides developer tools and cloud infrastructure to build, deploy, and scale modern web applications with zero configuration.',
      website: 'https://vercel.com',
      founded: 2015,
      size: '500-1000 employees',
      headquarters: 'San Francisco, CA',
      fundingStage: 'Series D',
      accentColor: '#111111'
    }
  },
  {
    id: 'job-2',
    title: 'Senior Distributed Systems Engineer',
    company: 'Stripe',
    companyInitials: 'ST',
    location: 'Seattle, WA',
    workMode: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    department: 'Backend',
    minSalary: 195000,
    maxSalary: 250000,
    currency: 'USD',
    postedDate: 'Just now',
    postedTimestamp: Date.now() - 3600000,
    featured: true,
    urgent: true,
    applicantCount: 19,
    description: 'Stripe is looking for a Senior Distributed Systems Engineer to strengthen the global financial ledger and transaction processing pipelines. You will own critical multi-region replication layers, ensuring 99.999% fault tolerance while settling billions of dollars in daily trade volume.',
    responsibilities: [
      'Design idempotent transactional engines and partition-tolerant consensus primitives',
      'Eliminate cascading failure modes in distributed datastores and queueing fabrics',
      'Participate in high-severity incident response rotations and execute rigorous root-cause analyses',
      'Partner with financial compliance architects to guarantee sub-millisecond ledger reconciliation'
    ],
    requirements: [
      '5+ years architecting high-reliability distributed systems handling strict consistency models',
      'Proficiency with Go, Java, or C++, and familiarity with consensus algorithms (Raft, Paxos)',
      'Deep understanding of ACID guarantees, distributed locking, and Kafka/gRPC internals',
      'Pragmatic approach to telemetry, tracing, and chaos engineering'
    ],
    skills: ['Go', 'Distributed Systems', 'Kafka', 'Raft', 'PostgreSQL', 'gRPC'],
    benefits: [
      'Competitive cash compensation with transparent quarterly performance bonuses',
      'Stripe equity with predictable liquidity windows',
      'Parental leave up to 24 weeks fully paid',
      'Annual wellness stipend and concierge mental health support'
    ],
    companyDetails: {
      about: 'Stripe is an economic infrastructure platform built for businesses of all sizes to accept payments and manage financial workflows.',
      website: 'https://stripe.com',
      founded: 2010,
      size: '7000+ employees',
      headquarters: 'South San Francisco, CA & Dublin',
      fundingStage: 'Publicly Traded / Late Stage',
      accentColor: '#635BFF'
    }
  },
  {
    id: 'job-3',
    title: 'Lead Product Designer & Design Engineer',
    company: 'Linear',
    companyInitials: 'LN',
    location: 'New York, NY',
    workMode: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Lead',
    department: 'Frontend',
    minSalary: 185000,
    maxSalary: 235000,
    currency: 'USD',
    postedDate: '3 days ago',
    postedTimestamp: Date.now() - 3 * 86400000,
    featured: true,
    applicantCount: 68,
    description: 'Linear crafts software that brings speed and craft back to issue tracking and project execution. We are searching for an exceptional hybrid Product Designer & Design Engineer who writes production React code, possesses surgical typography taste, and obsesses over 60fps micro-interactions.',
    responsibilities: [
      'Lead design-to-production execution for core workflows, keyboard command menus, and timeline views',
      'Author accessible, robust component libraries with zero-dependency CSS transitions and custom canvas renderers',
      'Define visual guidelines, fluid type systems, and spatial pacing across desktop and web clients',
      'Conduct rapid user feedback loops with engineering leaders and design directors'
    ],
    requirements: [
      'Demonstrated portfolio showing both bespoke interface design and production React/TypeScript implementation',
      'Mastery of Figma, CSS layout geometry, SVG animation, and interaction physics',
      'Unrelenting attention to typography, spatial rhythm, and aesthetic restraint',
      'Ability to independently scope, prototype, and ship features without heavy management oversight'
    ],
    skills: ['React', 'TypeScript', 'Design Systems', 'CSS Animation', 'Figma', 'UI/UX'],
    benefits: [
      'Top-tier global equity package and compensation',
      'Unlimited time off with 4 weeks mandatory annual rest',
      'All-expense paid semi-annual global retreats (Tokyo, Reykjavik, Lisbon)',
      'Highest-tier health coverage worldwide'
    ],
    companyDetails: {
      about: 'Linear is the purpose-built tool for high-velocity software teams to manage issues, sprints, and product roadmaps.',
      website: 'https://linear.app',
      founded: 2019,
      size: '50-100 employees',
      headquarters: 'San Francisco, CA',
      fundingStage: 'Series B',
      accentColor: '#5E6AD2'
    }
  },
  {
    id: 'job-4',
    title: 'Machine Learning Infrastructure Engineer',
    company: 'Anthropic',
    companyInitials: 'AN',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    department: 'AI & ML',
    minSalary: 230000,
    maxSalary: 310000,
    currency: 'USD',
    postedDate: '1 day ago',
    postedTimestamp: Date.now() - 86400000,
    featured: true,
    urgent: true,
    applicantCount: 88,
    description: 'At Anthropic, we build reliable, beneficial frontier AI systems. We are looking for an ML Infrastructure Engineer to design scalable cluster scheduling, tensor parallelization networks, and fault-tolerant checkpointing pipelines across tens of thousands of accelerated accelerators.',
    responsibilities: [
      'Scale distributed training frameworks across large GPU/TPU cluster fabrics with high MFU',
      'Implement fast kernel optimizations, NCCL collectives, and asynchronous parameter exchanges',
      'Build telemetry tooling to detect silent gradient corruption and network degradation before batch disruption',
      'Collaborate closely with research scientists on next-generation model training runs'
    ],
    requirements: [
      'Strong systems programming in Python and C++/CUDA',
      'Hands-on experience with PyTorch distributed (FSDP, Megatron-LM, DeepSpeed, or Jax)',
      'Solid grasp of InfiniBand, RoCE, NVLink topologies, and high-performance network stacks',
      'Pragmatic debugging mentality under extreme scale pressures'
    ],
    skills: ['PyTorch', 'CUDA', 'Python', 'C++', 'Distributed Training', 'InfiniBand'],
    benefits: [
      'Top 1% industry compensation with substantial equity upside',
      'Daily chef-prepared meals in our San Francisco mission district campus',
      'Generous parental leave, fertility benefits, and comprehensive healthcare',
      'Annual sabbatical eligibility after 3 years of service'
    ],
    companyDetails: {
      about: 'Anthropic is an AI safety and research company that develops Claude and frontier general models oriented around safety and alignment.',
      website: 'https://anthropic.com',
      founded: 2021,
      size: '300-600 employees',
      headquarters: 'San Francisco, CA',
      fundingStage: 'Series C',
      accentColor: '#CC785C'
    }
  },
  {
    id: 'job-5',
    title: 'Senior Cloud Platform & Kubernetes Engineer',
    company: 'Datadog',
    companyInitials: 'DD',
    location: 'Boston, MA',
    workMode: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    department: 'DevOps & Cloud',
    minSalary: 175000,
    maxSalary: 220000,
    currency: 'USD',
    postedDate: '4 days ago',
    postedTimestamp: Date.now() - 4 * 86400000,
    featured: false,
    applicantCount: 31,
    description: 'Join Datadog to manage our multi-cloud Kubernetes footprints spanning over 80,000 compute nodes. You will engineer custom operators, orchestrate seamless cluster upgrades without client interruptions, and enforce strict zero-trust network policies at planetary scale.',
    responsibilities: [
      'Develop custom Kubernetes controllers and CRDs in Go to automate cloud lifecycle operations',
      'Improve cluster resilience during spot-instance terminations and multi-region failovers',
      'Collaborate with security engineers on eBPF-based network auditing and admission controls',
      'Drive cost-optimization initiatives that reduce raw cloud compute expenditure'
    ],
    requirements: [
      '4+ years managing production Kubernetes clusters across AWS, GCP, or Azure at scale',
      'Proficiency in Go, Terraform/OpenTofu, and GitOps workflows (ArgoCD or Flux)',
      'Understanding of Linux kernel cgroups, eBPF, network namespaces, and Cilium CNI',
      'Exemplary documentation and blameless post-mortem writing skills'
    ],
    skills: ['Kubernetes', 'Go', 'AWS', 'Terraform', 'eBPF', 'ArgoCD'],
    benefits: [
      'Comprehensive healthcare coverage including 401(k) matching up to 5%',
      'Stock purchase plan (ESPP) with 15% discount',
      'Commuter subsidy and flexible hybrid office allowances',
      'Continuous technical training certification reimbursement'
    ],
    companyDetails: {
      about: 'Datadog is the monitoring and security platform for cloud applications providing full-stack observability.',
      website: 'https://datadoghq.com',
      founded: 2010,
      size: '5000+ employees',
      headquarters: 'New York, NY',
      fundingStage: 'Public (NASDAQ: DDOG)',
      accentColor: '#632CA6'
    }
  },
  {
    id: 'job-6',
    title: 'Full Stack Engineer, Developer Experience',
    company: 'Supabase',
    companyInitials: 'SB',
    location: 'Remote, Global',
    workMode: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid',
    department: 'Full-stack',
    minSalary: 140000,
    maxSalary: 180000,
    currency: 'USD',
    postedDate: '5 days ago',
    postedTimestamp: Date.now() - 5 * 86400000,
    featured: false,
    applicantCount: 54,
    description: 'Supabase is the open source Firebase alternative built on PostgreSQL. We are looking for a Mid-to-Senior Full Stack Engineer to enhance our cloud dashboard, database schema visualizers, and serverless edge functions management console.',
    responsibilities: [
      'Build reactive, accessible user interfaces with Next.js, Tailwind CSS, and TanStack Query',
      'Author robust backend endpoints interacting directly with Postgres catalog tables and Elixir services',
      'Implement real-time collaboration indicators and collaborative SQL query playgrounds',
      'Maintain comprehensive end-to-end integration test suites with Playwright'
    ],
    requirements: [
      '3+ years professional full-stack development experience with modern TypeScript and React',
      'Working fluency with PostgreSQL syntax, indexes, foreign keys, and RLS security policies',
      'Comfort working in a globally distributed, asynchronous open-source environment',
      'Sharp product sensibilities and empathy for developers solving tricky backend challenges'
    ],
    skills: ['React', 'TypeScript', 'PostgreSQL', 'Next.js', 'SQL', 'Node.js'],
    benefits: [
      '100% remote company from day one, work from anywhere in compatible timezones',
      'Generous hardware allowance (MacBook Pro + ultra-wide display)',
      'Coworking space stipend of $350/month',
      'Open-source contribution rewards and conference travel sponsorships'
    ],
    companyDetails: {
      about: 'Supabase provides instant Postgres databases, authentication, instant APIs, edge functions, and real-time subscriptions.',
      website: 'https://supabase.com',
      founded: 2020,
      size: '100-250 employees',
      headquarters: 'Singapore & Remote',
      fundingStage: 'Series B',
      accentColor: '#3ECF8E'
    }
  },
  {
    id: 'job-7',
    title: 'Staff Security Engineer, Application Security',
    company: 'Cloudflare',
    companyInitials: 'CF',
    location: 'Austin, TX',
    workMode: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Lead',
    department: 'Backend',
    minSalary: 200000,
    maxSalary: 255000,
    currency: 'USD',
    postedDate: '3 days ago',
    postedTimestamp: Date.now() - 3 * 86400000,
    featured: false,
    applicantCount: 22,
    description: 'Cloudflare protects over 20% of the world’s web properties. As a Staff Application Security Engineer, you will architect secure developer guardrails, run complex threat modeling across edge services, and hunt for zero-day vulnerabilities in multi-tenant edge workers.',
    responsibilities: [
      'Lead secure code architecture reviews and automated static analysis (SAST) rule authoring',
      'Design cryptographically secure isolation primitives for edge computation environments',
      'Conduct adversarial simulations and red-team penetration engagements',
      'Represent Cloudflare in responsible disclosure communications and security advisories'
    ],
    requirements: [
      '7+ years in application security, penetration testing, or reverse engineering',
      'Deep knowledge of web security mechanics (CORS, CSP, OAuth, TLS, memory corruption in Rust/C)',
      'Demonstrated experience implementing security-as-code within continuous deployment loops',
      'Industry-recognized security research or CVE disclosures is a plus'
    ],
    skills: ['Application Security', 'Rust', 'Cryptography', 'Cloudflare Workers', 'Threat Modeling'],
    benefits: [
      'Competitive salary with generous equity vesting schedule',
      'Comprehensive global healthcare and mental health benefits',
      'Generous tuition assistance and educational reimbursement programs',
      '401k with company match'
    ],
    companyDetails: {
      about: 'Cloudflare is on a mission to help build a better internet with edge computing, security, and networking solutions.',
      website: 'https://cloudflare.com',
      founded: 2009,
      size: '3000+ employees',
      headquarters: 'San Francisco, CA',
      fundingStage: 'Public (NYSE: NET)',
      accentColor: '#F38020'
    }
  },
  {
    id: 'job-8',
    title: 'Senior iOS & Swift Performance Engineer',
    company: 'Raycast',
    companyInitials: 'RC',
    location: 'London, UK / Remote',
    workMode: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Senior',
    department: 'Mobile',
    minSalary: 160000,
    maxSalary: 210000,
    currency: 'USD',
    postedDate: '1 week ago',
    postedTimestamp: Date.now() - 7 * 86400000,
    featured: true,
    applicantCount: 47,
    description: 'Raycast is crafting the fastest desktop launcher and productivity assistant on macOS and iOS. We are looking for an iOS/macOS expert who lives in Instruments, crafts silky native Swift interfaces, and respects battery life and memory footprints above all.',
    responsibilities: [
      'Develop blazing-fast native iOS and macOS extensions with SwiftUI and AppKit',
      'Optimize inter-process communication (IPC) between native binaries and Node.js extensions',
      'Profile frame rates, memory allocations, and cold-launch startup times to achieve sub-50ms execution',
      'Craft tactile, haptic-rich interaction designs that feel native to Apple design sensibilities'
    ],
    requirements: [
      '5+ years of shipping polished macOS or iOS native applications in Swift',
      'Rigorous mastery of Instruments (Time Profiler, Allocations, Leaks)',
      'Deep understanding of concurrency (async/await, actors, GCD) and memory management',
      'Extreme pride in craft and passion for delightful desktop workflows'
    ],
    skills: ['Swift', 'SwiftUI', 'macOS', 'AppKit', 'Performance Profiling', 'Instruments'],
    benefits: [
      'Top-percentile European & US benchmarked salaries',
      'Company equity with real secondary liquidity opportunities',
      'Top-of-the-line Apple workstation + 5K monitor budget',
      'Annual team offsite in picturesque European destinations'
    ],
    companyDetails: {
      about: 'Raycast makes it ultra-fast to control your tools, manage your calendar, search files, and run custom developer commands.',
      website: 'https://raycast.com',
      founded: 2020,
      size: '25-50 employees',
      headquarters: 'London, UK',
      fundingStage: 'Series A',
      accentColor: '#FF6363'
    }
  },
  {
    id: 'job-9',
    title: 'Senior Frontend Engineer, Canvas & Collaboration',
    company: 'Figma',
    companyInitials: 'FG',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    department: 'Frontend',
    minSalary: 190000,
    maxSalary: 245000,
    currency: 'USD',
    postedDate: '2 days ago',
    postedTimestamp: Date.now() - 2 * 86400000,
    featured: true,
    applicantCount: 95,
    description: 'Figma is where world-class design and engineering teams collaborate in real time. We are seeking a Senior Frontend Engineer to advance our multiplayer whiteboard engine, vector geometry algorithms, and WebAssembly rendering pipelines.',
    responsibilities: [
      'Optimize WebGL canvas pipelines to render tens of thousands of complex vector paths at steady 60fps',
      'Implement real-time CRDT sync algorithms for concurrent design edits',
      'Build intuitive, accessible inspect panels and design-to-code inspection utilities',
      'Write modular, well-tested code with rigorous TypeScript and C++ components compiled to Wasm'
    ],
    requirements: [
      '5+ years building complex web client applications with modern WebGL or HTML5 Canvas',
      'Strong command of linear algebra, 2D affine transformations, and bounding box geometry',
      'Deep understanding of real-time state synchronization (CRDTs, operational transformation)',
      'Exceptional empathy for user experience and visual craft'
    ],
    skills: ['TypeScript', 'WebGL', 'WebAssembly', 'C++', 'CRDTs', 'Canvas 2D'],
    benefits: [
      'Competitive salary, equity, and performance incentives',
      'Generous parental leave and comprehensive family-building benefits',
      'Yearly learning & development stipend of $3,000',
      'Flexible wellness benefits and in-office gym access'
    ],
    companyDetails: {
      about: 'Figma connects everyone in the design process so teams can deliver better products, faster.',
      website: 'https://figma.com',
      founded: 2012,
      size: '1000-2000 employees',
      headquarters: 'San Francisco, CA',
      fundingStage: 'Late Stage',
      accentColor: '#F24E1E'
    }
  },
  {
    id: 'job-10',
    title: 'Software Engineer, Financial Ledger Infrastructure',
    company: 'Ramp',
    companyInitials: 'RP',
    location: 'New York, NY',
    workMode: 'On-site',
    type: 'Full-time',
    experienceLevel: 'Mid',
    department: 'Backend',
    minSalary: 165000,
    maxSalary: 205000,
    currency: 'USD',
    postedDate: '4 days ago',
    postedTimestamp: Date.now() - 4 * 86400000,
    featured: false,
    applicantCount: 38,
    description: 'Ramp is the ultimate finance operations automation platform. As a Software Engineer on the Core Ledger team, you will write immutable transaction accounting engines, manage real-time card authorization checks, and build high-reliability integrations with Visa networks.',
    responsibilities: [
      'Develop transactional double-entry ledger engines with Python and PostgreSQL',
      'Build sub-100ms card authorization webhooks with 99.999% availability SLAs',
      'Design idempotent automated reconciliation jobs for millions of daily corporate card swipes',
      'Work alongside finance domain experts to enforce strict financial GAAP compliance'
    ],
    requirements: [
      '3+ years of experience with Python, Django, or modern backend frameworks',
      'Strong relational database schema design skills (indexes, constraints, lock contention management)',
      'Experience with message brokers (RabbitMQ, Celery, SQS) and distributed caching',
      'Enthusiasm for building rock-solid financial systems where precision is paramount'
    ],
    skills: ['Python', 'PostgreSQL', 'Django', 'Celery', 'AWS', 'Financial Systems'],
    benefits: [
      'Competitive base compensation + lucrative equity stake',
      'Breakfast, lunch, and dinner provided daily in modern Manhattan office',
      'Complete health, dental, and vision insurance with $0 employee deduction',
      'Commuter transit passes and annual wellness stipends'
    ],
    companyDetails: {
      about: 'Ramp helps finance teams close their books 8x faster and automate corporate expense management.',
      website: 'https://ramp.com',
      founded: 2019,
      size: '800-1200 employees',
      headquarters: 'New York, NY',
      fundingStage: 'Series D',
      accentColor: '#227C4B'
    }
  },
  {
    id: 'job-11',
    title: 'Data & Analytics Platform Engineer',
    company: 'Scale AI',
    companyInitials: 'SC',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Senior',
    department: 'Backend',
    minSalary: 185000,
    maxSalary: 240000,
    currency: 'USD',
    postedDate: '6 days ago',
    postedTimestamp: Date.now() - 6 * 86400000,
    featured: false,
    applicantCount: 29,
    description: 'Scale AI powers the foundational data infrastructure for generative models and autonomous systems. You will build data ingestion pipelines processing petabytes of multimodal sensor data, 3D point clouds, and text corpora.',
    responsibilities: [
      'Design high-throughput batch and streaming pipelines using Apache Spark, Kafka, and Snowflake',
      'Optimize data lake storage layouts (Parquet, Iceberg) to cut query execution latency by 4x',
      'Build self-service data warehouse models and semantic layers for analytical consumers',
      'Implement strict lineage tracking, data quality assertions, and automated schema migrations'
    ],
    requirements: [
      '4+ years architecting data infrastructure at modern tech companies',
      'Expertise in Python, Scala or Go, alongside SQL and distributed query engines',
      'Deep experience with modern data orchestration tools (dbt, Airflow, Dagster)',
      'Ability to translate ambiguous product requirements into structured data models'
    ],
    skills: ['Apache Spark', 'Python', 'Snowflake', 'Apache Iceberg', 'dbt', 'Kafka'],
    benefits: [
      'Generous base salary and high-value equity grant in an AI market leader',
      'Full healthcare, vision, and dental coverage',
      'Flexible time off policy and paid parental leave',
      'Monthly wellness and meal allowances'
    ],
    companyDetails: {
      about: 'Scale AI delivers high-quality training data for AI applications, autonomous vehicles, and government initiatives.',
      website: 'https://scale.com',
      founded: 2016,
      size: '1000-2000 employees',
      headquarters: 'San Francisco, CA',
      fundingStage: 'Series F',
      accentColor: '#000000'
    }
  },
  {
    id: 'job-12',
    title: 'Junior Frontend Developer, Design Systems',
    company: 'Retool',
    companyInitials: 'RT',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    experienceLevel: 'Entry',
    department: 'Frontend',
    minSalary: 110000,
    maxSalary: 135000,
    currency: 'USD',
    postedDate: '5 days ago',
    postedTimestamp: Date.now() - 5 * 86400000,
    featured: false,
    applicantCount: 112,
    description: 'Retool is looking for an enthusiastic Junior Frontend Developer to join our Design Systems team. You will write reusable, accessible React components, contribute to our open-source documentation, and help build the component blocks used to construct millions of internal apps.',
    responsibilities: [
      'Implement accessible, keyboard-navigable UI components conforming to WAI-ARIA standards',
      'Write exhaustive unit tests with Jest and React Testing Library to prevent regression',
      'Improve Storybook documentation, interactive component sandboxes, and token guidelines',
      'Partner closely with senior engineers to level up your TypeScript and component architecture skills'
    ],
    requirements: [
      '1-2 years of software engineering experience or distinguished open-source / portfolio projects',
      'Solid command of modern JavaScript (ES6+), React hooks, semantic HTML5, and CSS',
      'Genuine enthusiasm for design systems, web accessibility, and clean typography',
      'Curious mindset with strong problem-solving and communication skills'
    ],
    skills: ['React', 'TypeScript', 'CSS', 'Accessibility', 'Storybook', 'HTML5'],
    benefits: [
      'Competitive junior compensation and early equity grant',
      'Dedicated senior mentor and personalized engineering career development pathway',
      'Full health, dental, and vision insurance',
      'Annual learning stipend for courses, books, and bootcamps'
    ],
    companyDetails: {
      about: 'Retool is the fastest way to build custom internal tools, admin panels, and database workflows.',
      website: 'https://retool.com',
      founded: 2017,
      size: '300-500 employees',
      headquarters: 'San Francisco, CA',
      fundingStage: 'Series C',
      accentColor: '#3C4043'
    }
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    jobId: 'job-3',
    jobTitle: 'Lead Product Designer & Design Engineer',
    company: 'Linear',
    location: 'New York, NY (Remote)',
    salary: '$185,000 - $235,000',
    appliedDate: 'Oct 1, 2026',
    appliedTimestamp: Date.now() - 86400000,
    status: 'Interview' as const,
    interviewStage: 'Technical Architecture Round',
    resumeName: 'Jordan_Taylor_Resume_2026.pdf',
    notes: 'Completed introductory call with Head of Engineering. Scheduled for 90-min system design session this Thursday.'
  },
  {
    id: 'app-2',
    jobId: 'job-1',
    jobTitle: 'Staff Frontend Infrastructure Engineer',
    company: 'Vercel',
    location: 'San Francisco, CA (Remote)',
    salary: '$210,000 - $265,000',
    appliedDate: 'Sep 28, 2026',
    appliedTimestamp: Date.now() - 4 * 86400000,
    status: 'Applied' as const,
    interviewStage: 'Application Under Review',
    resumeName: 'Jordan_Taylor_Resume_2026.pdf',
    notes: 'Submitted tailored cover note highlighting Turbopack compiler benchmarks and custom AST plugins.'
  },
  {
    id: 'app-3',
    jobId: 'job-9',
    jobTitle: 'Senior Frontend Engineer, Canvas & Collaboration',
    company: 'Figma',
    location: 'San Francisco, CA',
    salary: '$190,000 - $245,000',
    appliedDate: 'Sep 20, 2026',
    appliedTimestamp: Date.now() - 12 * 86400000,
    status: 'Offer' as const,
    interviewStage: 'Offer Negotiation',
    resumeName: 'Jordan_Taylor_Resume_2026.pdf',
    notes: 'Official offer package received. $205k base + $120k initial equity. Reviewing terms before Friday decision.'
  },
  {
    id: 'app-4',
    jobId: 'job-2',
    jobTitle: 'Senior Distributed Systems Engineer',
    company: 'Stripe',
    location: 'Seattle, WA',
    salary: '$195,000 - $250,000',
    appliedDate: 'Sep 15, 2026',
    appliedTimestamp: Date.now() - 17 * 86400000,
    status: 'Saved' as const,
    notes: 'Bookmarked to apply once revised distributed consensus case study is ready.'
  }
];

export const INITIAL_USER_PROFILE = {
  name: 'Jordan Taylor',
  title: 'Senior Software Engineer & Product Architect',
  email: 'jordan.taylor@careerly.dev',
  phone: '+1 (415) 892-0149',
  location: 'San Francisco, California',
  bio: 'Systems-minded software engineer with 7+ years architecting high-performance client applications, distributed APIs, and editorial design systems. Passionate about developer ergonomics, zero-latency rendering, and accessible web standards.',
  githubUrl: 'https://github.com/jordantaylor-dev',
  linkedinUrl: 'https://linkedin.com/in/jordantaylor-eng',
  portfolioUrl: 'https://jordantaylor.codes',
  skills: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Rust',
    'Web Performance',
    'Tailwind CSS',
    'Distributed Systems',
    'GraphQL',
    'Docker'
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Senior Frontend Engineer',
      company: 'Northstar Systems',
      period: '2023 - Present',
      description: 'Architected core analytics workspace reducing render latency by 45%. Spearheaded design tokens pipeline adopted across 14 cross-functional teams.'
    },
    {
      id: 'exp-2',
      role: 'Full Stack Engineer',
      company: 'Aether Cloud Solutions',
      period: '2020 - 2023',
      description: 'Engineered high-throughput event streaming services handling 8M+ daily requests. Built collaborative drag-and-drop workflow canvas.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      school: 'University of California, Berkeley',
      year: '2016 - 2020'
    }
  ],
  resumeFile: {
    name: 'Jordan_Taylor_Resume_2026.pdf',
    size: '184 KB',
    uploadedAt: 'Oct 1, 2026'
  },
  preferences: {
    desiredRole: 'Staff / Senior Frontend Engineer',
    targetSalary: 215000,
    preferredWorkModes: ['Remote', 'Hybrid'] as ('Remote' | 'Hybrid')[],
    preferredLocations: ['San Francisco, CA', 'New York, NY', 'Remote']
  },
  notifications: {
    emailAlerts: true,
    applicationUpdates: true,
    weeklyDigest: false,
    employerMessages: true
  }
};
