module.exports.USER_ROLES = [
  'admin', // Full access
  'mod', // e.g. AI Global Employee
  'member', // Normal member
];
module.exports.RESOURCE_TYPES = [
  'Algorithm',
  'API',
  'Assessment',
  'Benchmark',
  'Datasets',
  'Design Tool',
  'Education Tool',
  'Framework',
  'Inspection',
  'Library',
  'Machine Learning Tool',
  'Podcast',
  'Principles',
  'Research',
  'Software',
  'Strategy & Implementation',
  'Toolkit',
  'Vision Tool',
  'Working Groups',
  'Workshop',
  'Dataset',
  'Other',
];
module.exports.RESOURCE_PATHS = [
  'Designer Path',
  'Developer Path',
  'Policymaker Path',
  'Risk Manager Path',
  'Explorer Path',
  'Other',
];
module.exports.ORG_TYPES = [
  'Industry',
  'Academia',
  'Government',
  'Civil Society',
  'Other',
];

module.exports.TRUST_INDEX_CATEGORIES = [
  'Explainability & Interpretability',
  'Data Quality',
  'Bias & Fairness',
  'Accountability',
  'Robustness',
  'Other',
];

module.exports.AI_SYSTEM_TYPES = [
  'Intelligent Process Automation',
  'Image and Object Recognition',
  'Text and Speech Analysis',
  'Advanced Data Analytics',
  'NLP/ Content Generation',
  'Other',
];
module.exports.FILE_TYPES = [
  { name: 'DOCX', ext: 'doc', app: 'Microsoft Word' },
  { name: 'CSV', ext: 'csv', app: 'Comma Separated Values' },
];
module.exports.FILE_EXTS = module.exports.FILE_TYPES.map((ft) => ft.ext);
