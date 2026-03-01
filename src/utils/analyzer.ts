import {
  type AnalysisResult,
  SKILLS_DATABASE,
  EXPERIENCE_KEYWORDS,
  EDUCATION_KEYWORDS,
} from '../types'

/**
 * Tokenize text: lowercase, split by non-alphanumeric, remove stopwords
 */
function tokenize(text: string): string[] {
  const stopwords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'shall', 'can', 'this', 'that',
    'these', 'those', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he',
    'she', 'it', 'they', 'them', 'their', 'what', 'which', 'who', 'when',
    'where', 'how', 'not', 'no', 'nor', 'as', 'if', 'then', 'than',
    'too', 'very', 'just', 'about', 'above', 'after', 'before', 'between',
    'during', 'into', 'through', 'over', 'under', 'again', 'further',
    'other', 'some', 'such', 'only', 'same', 'so', 'also', 'each', 'every'
  ])

  return text
    .toLowerCase()
    .split(/[^a-z0-9.#+]+/)
    .filter(word => word.length > 1 && !stopwords.has(word))
}

/**
 * Calculate term frequency for a document
 */
function termFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>()
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1)
  }
  // Normalize by document length
  const len = tokens.length
  for (const [key, value] of tf) {
    tf.set(key, value / len)
  }
  return tf
}

/**
 * Calculate TF-IDF cosine similarity between two texts
 */
function cosineSimilarity(text1: string, text2: string): number {
  const tokens1 = tokenize(text1)
  const tokens2 = tokenize(text2)

  if (tokens1.length === 0 || tokens2.length === 0) return 0

  const tf1 = termFrequency(tokens1)
  const tf2 = termFrequency(tokens2)

  // Build vocabulary
  const vocab = new Set([...tf1.keys(), ...tf2.keys()])

  // Calculate IDF (with 2 documents)
  const idf = new Map<string, number>()
  for (const word of vocab) {
    const docCount = (tf1.has(word) ? 1 : 0) + (tf2.has(word) ? 1 : 0)
    idf.set(word, Math.log(2 / docCount) + 1) // smoothed IDF
  }

  // TF-IDF vectors
  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  for (const word of vocab) {
    const tfidf1 = (tf1.get(word) || 0) * (idf.get(word) || 0)
    const tfidf2 = (tf2.get(word) || 0) * (idf.get(word) || 0)
    dotProduct += tfidf1 * tfidf2
    magnitude1 += tfidf1 * tfidf1
    magnitude2 += tfidf2 * tfidf2
  }

  magnitude1 = Math.sqrt(magnitude1)
  magnitude2 = Math.sqrt(magnitude2)

  if (magnitude1 === 0 || magnitude2 === 0) return 0

  return dotProduct / (magnitude1 * magnitude2)
}

/**
 * Extract skills found in text from our skills database
 */
function extractSkills(text: string, jobDesc: string): { matched: string[], missing: string[] } {
  const lowerText = text.toLowerCase()
  const lowerJob = jobDesc.toLowerCase()

  // Find all skills mentioned in the job description
  const jobSkills: string[] = []
  for (const [, skills] of Object.entries(SKILLS_DATABASE)) {
    for (const skill of skills) {
      if (lowerJob.includes(skill)) {
        jobSkills.push(skill)
      }
    }
  }

  // Find which job skills the resume has
  const matched: string[] = []
  const missing: string[] = []

  for (const skill of jobSkills) {
    if (lowerText.includes(skill)) {
      matched.push(skill)
    } else {
      missing.push(skill)
    }
  }

  return { matched: [...new Set(matched)], missing: [...new Set(missing)] }
}

/**
 * Calculate experience score (0-100)
 */
function calculateExperienceScore(resumeText: string, jobDesc: string): number {
  const lowerResume = resumeText.toLowerCase()
  const lowerJob = jobDesc.toLowerCase()

  let score = 0

  // Check for experience keywords
  for (const keyword of EXPERIENCE_KEYWORDS) {
    if (lowerResume.includes(keyword)) score += 8
  }

  // Check for years mentioned
  const yearMatches = lowerResume.match(/(\d+)\s*(?:\+\s*)?(?:years?|yrs?)\s+(?:of\s+)?experience/gi)
  if (yearMatches) score += 15

  // Check if seniority level matches
  const seniorKeywords = ['senior', 'lead', 'principal', 'staff', 'manager', 'director']
  for (const kw of seniorKeywords) {
    if (lowerJob.includes(kw) && lowerResume.includes(kw)) score += 12
  }

  // Check for project/work descriptions
  const projectKeywords = ['project', 'developed', 'implemented', 'designed', 'built', 'created',
    'managed', 'led', 'architected', 'optimized', 'deployed', 'maintained']
  for (const kw of projectKeywords) {
    if (lowerResume.includes(kw)) score += 3
  }

  return Math.min(score, 100)
}

/**
 * Calculate education score (0-100)
 */
function calculateEducationScore(resumeText: string, jobDesc: string): number {
  const lowerResume = resumeText.toLowerCase()
  const lowerJob = jobDesc.toLowerCase()

  let score = 0

  // Check for education keywords
  for (const keyword of EDUCATION_KEYWORDS) {
    if (lowerResume.includes(keyword)) score += 6
  }

  // Bonus if job-required education is present
  const educationLevels = ['phd', 'doctorate', 'master', 'bachelor', 'mba']
  for (const level of educationLevels) {
    if (lowerJob.includes(level) && lowerResume.includes(level)) score += 15
  }

  return Math.min(score, 100)
}

/**
 * Generate a summary of the analysis
 */
function generateSummary(
  score: number,
  matched: string[],
  missing: string[],
  resumeName: string
): string {
  let verdict = ''
  if (score >= 80) verdict = 'Excellent match'
  else if (score >= 60) verdict = 'Good match'
  else if (score >= 40) verdict = 'Moderate match'
  else verdict = 'Low match'

  const parts = [`${verdict} for "${resumeName}".`]

  if (matched.length > 0) {
    parts.push(`Found ${matched.length} matching skill${matched.length > 1 ? 's' : ''}.`)
  }
  if (missing.length > 0) {
    parts.push(`Missing ${missing.length} required skill${missing.length > 1 ? 's' : ''}.`)
  }

  return parts.join(' ')
}

/**
 * Analyze a single resume against a job description
 */
export function analyzeResume(
  resumeText: string,
  resumeName: string,
  jobDescription: string
): AnalysisResult {
  // Calculate individual scores
  const similarityScore = Math.round(cosineSimilarity(resumeText, jobDescription) * 100)
  const { matched, missing } = extractSkills(resumeText, jobDescription)
  const skillsScore = matched.length + missing.length > 0
    ? Math.round((matched.length / (matched.length + missing.length)) * 100)
    : 50
  const experienceScore = calculateExperienceScore(resumeText, jobDescription)
  const educationScore = calculateEducationScore(resumeText, jobDescription)

  // Weighted overall score
  const overallScore = Math.round(
    similarityScore * 0.30 +
    skillsScore * 0.35 +
    experienceScore * 0.20 +
    educationScore * 0.15
  )

  const summary = generateSummary(overallScore, matched, missing, resumeName)

  return {
    id: crypto.randomUUID(),
    resumeName,
    overallScore,
    similarityScore,
    skillsScore,
    experienceScore,
    educationScore,
    matchedSkills: matched,
    missingSkills: missing,
    summary,
    analyzedAt: new Date(),
  }
}
