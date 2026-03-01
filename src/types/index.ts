export interface ResumeFile {
  id: string
  name: string
  text: string
  size: number
  uploadedAt: Date
}

export interface AnalysisResult {
  id: string
  resumeName: string
  overallScore: number
  similarityScore: number
  skillsScore: number
  experienceScore: number
  educationScore: number
  matchedSkills: string[]
  missingSkills: string[]
  summary: string
  analyzedAt: Date
}

export interface AnalysisHistory {
  id: string
  jobDescription: string
  results: AnalysisResult[]
  analyzedAt: Date
}

// Common skills database for matching
export const SKILLS_DATABASE: Record<string, string[]> = {
  'Programming Languages': [
    'python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'ruby', 'go', 'golang',
    'rust', 'swift', 'kotlin', 'php', 'scala', 'r', 'matlab', 'perl', 'dart', 'lua',
    'objective-c', 'shell', 'bash', 'sql', 'html', 'css', 'sass', 'less'
  ],
  'Web Frameworks': [
    'react', 'angular', 'vue', 'svelte', 'next.js', 'nextjs', 'nuxt', 'gatsby',
    'express', 'django', 'flask', 'fastapi', 'spring', 'rails', 'laravel',
    'asp.net', '.net', 'node.js', 'nodejs', 'nestjs', 'remix', 'astro'
  ],
  'Data & ML': [
    'tensorflow', 'pytorch', 'scikit-learn', 'sklearn', 'pandas', 'numpy',
    'keras', 'opencv', 'nlp', 'machine learning', 'deep learning', 'data science',
    'data analysis', 'data engineering', 'spark', 'hadoop', 'tableau', 'power bi',
    'statistics', 'big data', 'ai', 'artificial intelligence', 'neural network'
  ],
  'Cloud & DevOps': [
    'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s',
    'terraform', 'ansible', 'jenkins', 'ci/cd', 'github actions', 'gitlab',
    'linux', 'unix', 'nginx', 'apache', 'serverless', 'lambda', 'microservices'
  ],
  'Databases': [
    'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch',
    'cassandra', 'dynamodb', 'firebase', 'supabase', 'sqlite', 'oracle',
    'sql server', 'neo4j', 'graphql', 'rest api', 'restful'
  ],
  'Soft Skills': [
    'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking',
    'project management', 'agile', 'scrum', 'collaboration', 'mentoring',
    'presentation', 'analytical', 'strategic', 'innovative', 'detail-oriented'
  ],
  'Design & UI': [
    'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator', 'ui/ux',
    'user experience', 'user interface', 'wireframing', 'prototyping',
    'responsive design', 'accessibility', 'design system', 'tailwind', 'bootstrap'
  ]
}

export const EXPERIENCE_KEYWORDS = [
  'years of experience', 'year experience', 'yr experience',
  'senior', 'lead', 'principal', 'staff', 'manager', 'director',
  'junior', 'intern', 'entry level', 'mid-level', 'experienced'
]

export const EDUCATION_KEYWORDS = [
  'bachelor', 'master', 'phd', 'doctorate', 'mba', 'b.s.', 'b.a.',
  'm.s.', 'm.a.', 'b.sc', 'm.sc', 'computer science', 'engineering',
  'information technology', 'data science', 'mathematics', 'physics',
  'university', 'college', 'degree', 'diploma', 'certificate', 'certification',
  'coursework', 'gpa'
]
