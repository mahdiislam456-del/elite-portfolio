import { Project, SkillCategory, TimelineItem } from '../types';

export const PORTFOLIO_OWNER = {
  name: 'Mahdi Islam Chowdhury',
  shortName: 'Mahdi',
  tagline: 'Full-Stack Developer · Systems Engineer · ML Enthusiast',
  institution: 'Metropolitan University',
  location: 'Sylhet, Bangladesh',
  email: 'mahdiislam456@gmail.com',
  instagram: 'https://www.instagram.com/mahdixoneshot?stkn=MWhsc291MGJkbXh0cw%3D%3D&utm_source=qr',
  facebook: 'https://www.facebook.com/share/1PWBMP3egL/?mibextid=wwXIfr',
  github: 'https://github.com/MahdiIslamChowdhury',
  avatarUrl: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/502c6c77-20b9-4eb4-a18c-0489a2380e48/1790280401946-4fb90422/WhatsApp_Image_2026-09-25_at_2.05.41_AM.jpeg',
  status: 'Open for engineering roles, research & high-impact projects',
  bio: `I am Mahdi Islam Chowdhury, a full-stack developer and student at Metropolitan University, building practical software with a curious mind and a systems-first approach. I bridge deep fundamental computer science—from C/C++ memory mechanics and Java enterprise OOP—to high-velocity modern web apps in React, Vite, Node, and machine learning architectures.`
};

export const PROJECTS: Project[] = [
  {
    id: 'qr-attendance',
    artifactNumber: '01',
    title: 'DYNAMIC QR ATTENDANCE',
    subtitle: 'EduFlow Student & Faculty Academic Presence Engine',
    category: 'Enterprise Academic Portal',
    imageUrl: `${import.meta.env.BASE_URL}assets/aistudio/WhatsApp_Image_2026-09-30_at_10.22.35_PM_6ee69bc3.jpeg`,
    description: 'A full-cycle institutional student portal and automated attendance verification suite. Features dynamic rotating QR code authentication for fraud prevention, real-time course enrollment secret codes, attendance health metrics, leave/absence request workflows, and interactive calendar histories.',
    impact: 'Eliminated proxy attendance and manual roster logging with cryptographic dynamic QR check-ins.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL / Supabase', 'Tailwind CSS', 'QR Crypto'],
    features: [
      'Dynamic rotating QR validation with time-window authorization to prevent attendance spoofing',
      'Student & Teacher split portal with secret course access keys and enrollment management',
      'Automated attendance health radar tracking Present, Late, and Absent percentiles against 80% exam eligibility thresholds',
      'Integrated medical leave and absence application engine with file attachment and instructor review status'
    ],
    architecture: 'Client-server authentication pipeline with signed token payloads embedded in time-expiring QR matrices. Real-time state synchronization tracks active classroom presence.',
    githubUrl: 'https://github.com/MahdiIslamChowdhury',
    accentColor: '#2E6B72',
    status: 'Production'
  },
  {
    id: 'spectrum-dp',
    artifactNumber: '02',
    title: 'SPECTRUM DP',
    subtitle: 'STRATUM-DP: Autonomous Trading Engine & Dynamic Programming Simulation',
    category: 'Algorithmic Simulation & Finance',
    imageUrl: `${import.meta.env.BASE_URL}assets/aistudio/Screenshot_2026-11-06_192421_553913de.png`,
    description: 'An autonomous trading simulation engine powered by dynamic programming algorithms. Features real-time market terminal streaming (SPX-VOL500), space-optimized 1D Knapsack yield maximization, sub-millisecond execution latency benchmarks, and volatility shock stress testing.',
    impact: 'Achieved 0.041ms swap execution latency with O(W) space-optimized dynamic programming knapsack heuristics.',
    techStack: ['Python / TypeScript', 'Dynamic Programming', 'Knapsack O(W)', 'Canvas Financial Charts', 'Risk Engine'],
    features: [
      'Live institutional benchmark feed with interactive volatility index & trigger threshold swap line',
      'Space-optimized 1D Dynamic Programming knapsack solver for optimal yield portfolio allocation',
      'Real-time volatility shock and bull recovery interactive simulators with sub-millisecond tick execution',
      'Comprehensive risk telemetry tracking portfolio yield, swapping latency (0.041ms), and volatility nominal thresholds'
    ],
    architecture: 'High-frequency state machine pairing live market order books with an O(W) DP optimization pipeline, recalculating yield frontiers on every market tick.',
    githubUrl: 'https://github.com/MahdiIslamChowdhury',
    accentColor: '#E8913C',
    status: 'Active'
  },
  {
    id: 'runtime-survivor',
    artifactNumber: '03',
    title: 'RUNTIME SURVIVOR',
    subtitle: 'Algorithmic Combat & Time Complexity Sandbox Arena',
    category: 'Interactive Sandbox & Gamified Engine',
    imageUrl: `${import.meta.env.BASE_URL}assets/aistudio/Screenshot_2026-11-06_192243run_70d2812a.png`,
    description: 'An interactive developer sandbox and survival combat arena where software performance directly drives gameplay survival. Players must diagnose CPU bottlenecks, replace naive O(N²) bubble sorts with O(N log N) routines in a live code editor, and deploy patches before waves breach the core.',
    impact: 'Gamified theoretical Big-O complexity analysis into live interactive debugging and profiling.',
    techStack: ['Python 3 / WebAssembly', 'Big-O Profiler', 'Canvas Game Loop', 'Test Harness', 'AST Analysis'],
    features: [
      'Integrated in-browser code editor with Python 3 execution and automated test harness validation',
      'Real-time Big-O complexity analyzer and CPU cycle bottleneck diagnostics under active wave incursions',
      'Interactive 60 FPS arena simulation with automaton steering, buffer radar, and EMP grid refreshes',
      'Multi-wave scaling difficulty (Easy, Normal, Nightmare) with automated scoring and patch deployment'
    ],
    architecture: 'Client-side execution sandbox using abstract syntax tree inspection and runtime timing hooks to evaluate algorithmic complexity against simulated combat clocks.',
    githubUrl: 'https://github.com/MahdiIslamChowdhury',
    accentColor: '#3DA1AB',
    status: 'Production'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'low-level',
    title: 'Systems & Fundamentals',
    color: '#E8913C',
    description: 'Foundational computer science, memory management, and structured algorithms.',
    skills: [
      {
        name: 'C / C++',
        level: 90,
        experience: '2+ Years',
        description: 'Memory allocation, pointer arithmetic, struct modeling, STL containers, and algorithmic efficiency.',
        tags: ['Pointers', 'Memory', 'Algorithms', 'STL']
      },
      {
        name: 'Data Structures & Algorithms',
        level: 88,
        experience: '2+ Years',
        description: 'Trees, Graphs, Dynamic Programming, Sorting algorithms, and algorithmic complexity analysis.',
        tags: ['Big-O', 'Graphs', 'DP', 'Optimization']
      },
      {
        name: 'Object-Oriented Programming',
        level: 92,
        experience: '2+ Years',
        description: 'Solid encapsulation, inheritance hierarchies, polymorphism, design patterns, and clean code principles.',
        tags: ['OOP', 'SOLID', 'Design Patterns']
      }
    ]
  },
  {
    id: 'apps-ml',
    title: 'Applications & Intelligence',
    color: '#2E6B72',
    description: 'Enterprise logic, desktop GUI engines, and data intelligence.',
    skills: [
      {
        name: 'Java',
        level: 87,
        experience: '2+ Years',
        description: 'Enterprise OOP, JDBC connections, JavaFX desktop components, multithreading, and collections framework.',
        tags: ['Enterprise', 'JDBC', 'JavaFX', 'Multithreading']
      },
      {
        name: 'Python',
        level: 92,
        experience: '2+ Years',
        description: 'Automation, scripting, Qt GUI integration, backend data pipelines, and mathematical scripting.',
        tags: ['PyQt', 'Scripting', 'Automation', 'APIs']
      },
      {
        name: 'Machine Learning',
        level: 80,
        experience: '1+ Years',
        description: 'Scikit-learn modeling, dataset preprocessing, regression, classification, and neural fundamentals.',
        tags: ['Scikit-Learn', 'Pandas', 'NumPy', 'Data Analysis']
      }
    ]
  },
  {
    id: 'web-stack',
    title: 'Modern Web Engineering',
    color: '#FFAC59',
    description: 'Fluid, modern frontend architectures and reactive web interfaces.',
    skills: [
      {
        name: 'React & Vite',
        level: 94,
        experience: '2+ Years',
        description: 'Hooks, functional components, state machines, custom hooks, and lightning-fast Vite build tooling.',
        tags: ['React 19', 'Hooks', 'Vite', 'Component Systems']
      },
      {
        name: 'JavaScript / TypeScript',
        level: 90,
        experience: '2+ Years',
        description: 'ESNext, async/await, strict static typing, event delegation, DOM APIs, and Canvas pipelines.',
        tags: ['TypeScript', 'ESNext', 'DOM API', 'Async']
      },
      {
        name: 'Tailwind CSS & Motion',
        level: 95,
        experience: '2+ Years',
        description: 'Fluid responsive design, dark mode tokens, micro-interactions, spring physics, and CSS grid math.',
        tags: ['Tailwind v4', 'Framer Motion', 'Responsive', 'UX']
      },
      {
        name: 'Node.js & REST APIs',
        level: 84,
        experience: '1+ Years',
        description: 'Server runtime, Express.js middleware, HTTP routing, JSON validation, and endpoint design.',
        tags: ['Express', 'REST', 'Middleware', 'Backend']
      }
    ]
  },
  {
    id: 'database',
    title: 'Databases & Storage',
    color: '#3DA1AB',
    description: 'Normalized schemas, indexing, and durable persistence architectures.',
    skills: [
      {
        name: 'MySQL & PostgreSQL',
        level: 88,
        experience: '2+ Years',
        description: 'Relational schema design, complex joins, primary/foreign key constraints, and transactional consistency.',
        tags: ['RDBMS', 'SQL', 'Schema Normalization', 'ACID']
      },
      {
        name: 'SQLite',
        level: 92,
        experience: '2+ Years',
        description: 'Embedded persistence for desktop applications, WAL mode configuration, and lightweight zero-config storage.',
        tags: ['Embedded', 'PyQt Integration', 'Local Cache']
      },
      {
        name: 'MongoDB',
        level: 82,
        experience: '1+ Years',
        description: 'Document modeling, BSON queries, aggregation pipelines, and schema-flexible web persistence.',
        tags: ['NoSQL', 'Document Store', 'Aggregation']
      }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    period: '2024 — Present',
    role: 'Computer Science & Engineering Student',
    organization: 'Metropolitan University',
    location: 'Sylhet, Bangladesh',
    status: 'Currently Enrolled',
    highlight: 'Rigorous academic curriculum covering systems programming, advanced data structures, and database engineering.',
    details: [
      'Core coursework in C/C++, Java OOP, Database Management Systems, and Software Engineering.',
      'Active contributor to student technical toolings, including the automated university cover page engine.',
      'Collaborating on academic team assignments, peer problem solving, and software design.'
    ]
  },
  {
    period: '2024 — Present',
    role: 'Full-Stack & Systems Project Builder',
    organization: 'Independent Engineering',
    location: 'Sylhet / Remote',
    status: 'Active Builder',
    highlight: 'Designing and deploying practical utilities that solve concrete day-to-day problems.',
    details: [
      'Built Dynamic QR Attendance (EduFlow Portal) to eliminate proxy attendance with cryptographic time-expiring QR check-ins.',
      'Architected Spectrum DP (Stratum Autonomous Trading), achieving 0.041ms swap execution latency with 1D dynamic programming knapsack algorithms.',
      'Engineered Runtime Survivor, an interactive combat sandbox arena gamifying time complexity analysis and real-time CPU profiling.'
    ]
  },
  {
    period: 'Future Milestone',
    role: 'Lead Software Engineer / Systems Architect',
    organization: 'Top-Tier Tech Engineering',
    location: 'Global / Enterprise Scale',
    status: 'Aspiring Horizon',
    highlight: 'Aiming to build resilient, high-throughput distributed systems and world-class developer products.',
    details: [
      'Focusing on high-concurrency architecture, distributed infrastructure, and machine learning integration.',
      'Committed to relentless engineering craft, clean abstractions, and user-centric software.'
    ]
  }
];
