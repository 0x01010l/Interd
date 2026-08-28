import type { BlogPost } from './blogPosts';

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
};

export const AUTHORS: TeamMember[] = [
  {
    id: 'amara-okonkwo',
    name: 'Amara Okonkwo',
    role: 'Lead education writer',
    credentials: 'M.Ed. English Education · 9 years secondary classroom teaching',
    bio: 'Writes WAEC English and composition guides. Former head of English at a Lagos state school; focuses on unseen comprehension, summary technique, and essay structure examiners can mark quickly.',
  },
  {
    id: 'kwame-mensah',
    name: 'Kwame Mensah',
    role: 'Mathematics & science writer',
    credentials: 'B.Sc. Mathematics Education · WAEC marker training (2019–2022)',
    bio: 'Covers WAEC and BECE mathematics, integrated science, and how to show working. Emphasises timed practice, syllabus blocks, and the papers students tend to skip.',
  },
  {
    id: 'fatima-bello',
    name: 'Fatima Bello',
    role: 'Study skills editor',
    credentials: 'B.A. Education · adolescent learning & revision coaching',
    bio: 'Produces study-method and timetable guides for students with limited quiet time. Tests routines with volunteer student groups before publication.',
  },
];

export const REVIEWERS: TeamMember[] = [
  {
    id: 'chinwe-eze',
    name: 'Dr. Chinwe Eze',
    role: 'Editorial reviewer',
    credentials: 'Ph.D. Curriculum Studies · former WAEC subject panel consultant',
    bio: 'Reviews guides for factual accuracy, syllabus alignment, and classroom safety. Flags claims that sound like leaked papers or unofficial guarantees.',
  },
];

export const EDITORIAL_POLICY_SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: 'Independence',
    paragraphs: [
      'Interdot Study is published by FIX FIGURES LLC. We are not WAEC, BECE, NECO, or any examining body. Guides describe general study technique; they are not official syllabuses, mark schemes, or registration services.',
    ],
  },
  {
    heading: 'How guides are produced',
    paragraphs: [
      'Each article is assigned to a named writer with subject experience. Drafts are checked by an editorial reviewer for accuracy, clarity, and policy compliance. We do not publish leaked questions, paid “expo,” or grade guarantees.',
      'When a syllabus or paper format changes, we update or retire the page. Readers can email corrections; factual errors are fixed with a note in the article metadata when material.',
    ],
  },
  {
    heading: 'Sources and citations',
    paragraphs: [
      'We cite publicly available examining-body publications, standard textbooks, and classroom practice — not unofficial Telegram channels or “predicted question” sellers. Each guide lists the references the writer used. If you rely on a rule (calculator policy, word limit, option count), confirm it with your school and the official circular for your sitting.',
    ],
  },
  {
    heading: 'Corrections',
    paragraphs: [
      'Email contact@interdot.net with the page title and the sentence to fix. We aim to respond within five business days. Classroom teachers may quote short excerpts with a link to the original article.',
    ],
  },
];

const AUTHOR_BY_CATEGORY: Record<BlogPost['category'], string> = {
  waec: 'amara-okonkwo',
  bece: 'kwame-mensah',
  study: 'fatima-bello',
  writing: 'amara-okonkwo',
};

export const SOURCE_REFERENCES: Record<
  BlogPost['category'],
  { label: string; url: string; note: string }[]
> = {
  waec: [
    {
      label: 'WAEC official site',
      url: 'https://www.waecdirect.org',
      note: 'Registration, results, and official notices for West African Senior School Certificate Examination.',
    },
    {
      label: 'WAEC syllabus publications',
      url: 'https://www.waecdirect.org',
      note: 'Subject syllabuses and examination formats — confirm the edition for your sitting year.',
    },
  ],
  bece: [
    {
      label: 'Ghana BECE (WAEC Ghana)',
      url: 'https://www.waecgh.org',
      note: 'Basic Education Certificate Examination information for Ghana.',
    },
    {
      label: 'Nigeria junior secondary curricula',
      url: 'https://nerdc.gov.ng',
      note: 'National curriculum references for junior secondary subjects where applicable.',
    },
  ],
  study: [
    {
      label: 'Cognitive practice research (Dunlosky et al.)',
      url: 'https://doi.org/10.1177/1529100612453266',
      note: 'Evidence on retrieval practice, spacing, and self-testing — basis for many timetable recommendations.',
    },
  ],
  writing: [
    {
      label: 'WAEC English Language syllabus',
      url: 'https://www.waecdirect.org',
      note: 'Composition types, register, and summary requirements.',
    },
    {
      label: 'Plain-language writing guides (Purdue OWL)',
      url: 'https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/index.html',
      note: 'Paragraph structure and academic tone — adapted for essay-and-objective exam contexts.',
    },
  ],
};

export function getPostAttribution(post: BlogPost) {
  const author = AUTHORS.find((a) => a.id === AUTHOR_BY_CATEGORY[post.category]) ?? AUTHORS[0];
  const reviewer = REVIEWERS[0];
  const sources = SOURCE_REFERENCES[post.category];
  return { author, reviewer, sources };
}

export function getTeamMember(id: string): TeamMember | undefined {
  return [...AUTHORS, ...REVIEWERS].find((m) => m.id === id);
}
