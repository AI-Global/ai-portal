import React from 'react';
export const example = {
  name: 'Where in the Word is AI? Map',
  desc:
    'An interactive web visualization and dataset with 300+ helpful and harmful AI cases worldwide',
  formats: ['Education Tool', 'Dataset'],
  topics: [
    'Banking',
    'Health',
    'Insurance',
    'Labor',
    'Retail',
    'Education',
    'Law Enforcement',
    'Media',
  ],
  organization: ['AI Global'],
  org_types: ['Civil Society'],
  trust_index: ['Explainbility & Interpretability'],
  paths: ['Policymaker Path', 'Risk Manager Path', 'Explorer Path'],
  ai_system_type: 'OECD',
  url: 'https://map.ai-global.org/',
  creation_date: '03/01/2020',
  modified_data: '11/15/2020',
  keywords: ['Data Visualization', 'Helpful AI', 'Harmful AI'],
  version: 2.0,
  update_frequency: 'Weekly',
  license: 'Creative Commons (CC BY 4.0)',
  purpse:
    'Where in the World is AI? Map highlights helpful and harmful AI cases worldwide to start discussions around responsible AI',
  creator:
    'Martha Czernuszenko, Shrivu Shankar, Ameya Deshmukh, Colin Philips, and Lucinda Nguyen',
  contact_email: 'admin@ai-global.org',
  location: 'Austin, Texas, USA',
  fundedBy: '',
  missingInfo:
    'There is an unequal distribution of cases between North America and Europe compared to Africa and Latin America',
  qualityReview:
    'We had several external stakeholder reviews from The University of Texas and Responsible AI advisors based in Canada and the USA.',
  ethicsReview:
    'We have a civil society trust channel with responsible AI advisors that reviewed these cases.',
  intendedAudience:
    'Responsible AI Civil Society, Policymakers, Researchers, Professors',
  privacyProcedure: 'Not applicable because no personal information is used',
  dataDictLink: '',
  dataCollectorOwnerRelation: 'Both are Martha Czernuszenko.',
  dataCollection:
    'Data is collected by AI Global employees from unethical AI Google Alert, Harmful AI Repository, AI & Algorithmic Incident & Controversy Repository by Charlie Pownall and other news resources.',
  infoCollected:
    'We are manually collecting data from news sources to provide a publicly accessible dataset on cases around the world. In our dataset, AI Global labels these cases as helpful and harmful.',
  externalRestrictions: 'No, the data is in a Google Sheet open to anyone.',
  sensitiveData:
    'Yes, these news articles list some personal information and business information. The news source is reporting on this story so we assume that permission was authorized for this information.',
  datasetTasks:
    'The dataset has been taught at The University of Toronto and The University of Montreal in AI ethics classes. It has also been used by working groups to discuss responsible AI. This dataset is used in the Where in the World is AI visualization?',
  datasetDemographics: 'N/A',
  individualsIdentified: 'Yes',
  isConfidential: 'Yes',
  individualsConsent:
    'We assume yes because we only use reputable sources. We assume the media asked.',
  personalInfoRemoved: 'No',
  privacyProcedure: '',
  offensiveContent:
    'Yes, there are some cases of unjust systems, racial bias and violence.',
  fieldsRelationship: 'N/A',
  numInstances: '300+',
  instances: 'Text data of news sources',
  typeInstances:
    'There is a news title and description, also city, state and country',
  completeness:
    'The dataset is not complete as helpful and harmful cases of AI occur daily. There is no sample.',
  preprocessing: 'N/A',
  rawData: 'N/A',
  sample: 'N/A',
  sampleStrategy: '',
  populationDataSource: 'N/A',
  recommendedSplit: 'N/A',
  handledCarefully: 'N/A',
  accurateRepresentation: 'N/A',
  rawOrProcessed: 'N/A',
  dataDrift: 'N/A',
  dataReuse: 'N/A',
  lifecycleState: 'Update Dateset',
  noiseDescription: 'N/A',
  dataDependency: ['N/A', 'N/A', 'N/A'],
  modelType: 'Decision Tree',
  modelInputs: 'Text of news sources',
  modelOutputs:
    'A summary of tree model, number of observations, and node information',
  modelTradeOffs: 'As bias decreases, variance increases',
  hyperparameters: '12 Branches in Decision Tree',
  modelArchitecture: '12 layers',
  modelTask: 'Classification',
  learningType: 'Supervised',
  numParameters: '24',
  modelAttributes: '',
  framework: 'PyTorch',
  modelDependencies: 'Pandas, sklearn, graphviz',
  hardwareRequirements: '8 GPUs',
  pretrainedModels: 'https://huggingface.co/bert-base-uncased',
  modelMetrics: 'Accuracy, Precision, Recall',
};

export const questions_core1 = [
  {
    string: 'Do you own this resource (Yes/No)?',
    val: 'isOwner',
    type: 'select',
    options: ['Yes', 'No'],
    required: true,
    tip: '',
    example_ans: '',
  },
  {
    string: 'Resource Title',
    val: 'name',
    type: 'type',
    options: null,
    required: true,
    tips: '',
    example_ans: example.name,
  },
  {
    string: 'Resource Description',
    val: 'desc',
    type: 'text-area',
    options: null,
    required: true,
    tip: 'A short summary sentence of the resource',
    example_ans: example.desc,
  },
  {
    string: 'Format(s)',
    val: 'formats',
    type: 'multiple',
    options: [
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
      'Workshops',
      'Other',
    ],
    required: true,
    tip:
      'Select any tags that are relevant. If we are missing a tag, please let us know.',
    example_ans: example.formats,
  },
  {
    string: 'Topic of Resource (Ex: Health Services, Law Enforcement)',
    val: 'topics',
    type: 'multiple',
    options: [
      'Banking',
      'Health',
      'Insurance',
      'Labor',
      'Retail',
      'Education',
      'Law Enforcement',
      'Media',
      'Other',
    ],
    required: true,
    tip: 'Select any topics that are relevant',
    example_ans: example.topics,
  },
  {
    string: 'Which organization(s) is the resource from?',
    val: 'organizations',
    type: 'tags',
    options: ['Org A', 'Org B', 'Org C'],
    required: true,
    tip: 'Please avoid any abbreviations or acronyms',
    example_ans: example.organization,
  },
  {
    string: 'What type(s) of organization(s) (Ex: Industry, Academia)',
    val: 'org_types',
    type: 'multiple',
    options: [
      'Industry',
      'Academia',
      'Government',
      'Civil Society',
      'International Organization',
      'Other',
    ],
    required: true,
    tip:
      'If you are unsure of what the organization type is, select civil society',
    example_ans: example.org_types,
  },
  {
    string: 'Responsible AI Trust Index',
    val: 'trust-index',
    type: 'multiple',
    options: [
      'Explainability & Interpretability',
      'Data Quality',
      'Bias & Fairness',
      'Accountability',
      'Robustness',
      'Other',
    ],
    required: true,
    tip: (
      <t>
        Learn more about our Trust Index Values
        <a href="https://ai-global.org/2020/04/28/creating-a-responsible-ai-trust-index-a-unified-assessment-to-assure-the-responsible-design-development-and-deployment-of-ai/">
          {' '}
          here
        </a>
      </t>
    ),
    example_ans: example.trust_index,
  },
  {
    string: 'Who is your resource intended for?',
    val: 'paths',
    type: 'multiple',
    options: [
      'Designer Path',
      'Developer Path',
      'Policymaker Path',
      'Risk Manager Path',
      'Explorer Path',
      'Other',
    ],
    required: true,
    tip: '',
    example_ans: example.paths,
  },
  {
    string: 'Which AI System type does the resource align with?',
    val: 'ai-system-type',
    type: 'multiple',
    options: [
      'Intelligent Process Automation',
      'Image and Object Recognition',
      'Text and Speech Analysis',
      'Advanced Data Analytics',
      'NLP/ Content Generation',
      'Other',
    ],
    required: true,
    tip: 'AI System type values are defined by OECD.',
    example_ans: example.ai_system_type,
  },
  {
    //TODO: make new question type for this one
    string: 'Where can we access the resource?',
    val: 'resources',
    type: 'type',
    options: null,
    required: true,
    tip: 'Please add a url or upload any files via Google Drive url.',
    example_ans: example.url,
  },
  {
    string: 'When was the resource created?',
    val: 'creationDate',
    type: 'date',
    options: null,
    required: true,
    tip: '',
    example_ans: '',
  },
  {
    string: 'If applicable, when was the resource modified?',
    val: 'modifiedDate',
    type: 'date',
    options: null,
    required: false,
    tip: 'If resource was not modified, enter resource created',
    example_ans: '',
  },
  {
    string: 'What version is the resource?',
    val: 'version',
    type: 'type',
    options: null,
    required: false,
    tip: 'Please list any version numbers of indicators',
    example_ans: example.version,
  },
  {
    string: 'How often is this resource updated?',
    val: 'updateFrequency',
    type: 'select',
    options: ['Weekly', 'Monthly', 'Annually'],
    required: false,
    tip: 'Maintenance/Update Frequency',
    example_ans: example.update_frequency,
  },
  {
    string: 'If applicable, are there any licenses to this resource?',
    val: 'licenseName',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any licenses or acknowledgements to the resource',
    example_ans: example.license,
  },
  {
    string: 'Select up to 5 keywords for the resource',
    val: 'keywords',
    type: 'tags',
    options: [],
    required: true,
    tip: '',
    example_ans: example.keywords,
  },

  // {
  //   string: ,
  //   val: ,
  //   type: ,
  //   options: ,
  //   required: ,
  //   tip: ,
  //   example_ans:
  // }
];

export const questions_core2 = [
  {
    string: 'What is the purpose of the resource?',
    val: 'purpose',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'A short sentence about the purpose of the resource',
    example_ans: example.purpose,
  },
  {
    string: 'What should this resource not be used for?',
    val: 'unrelated-tasks',
    type: 'text-area',
    options: null,
    required: false,
    tip: '',
    example_ans: null,
  },
  {
    string: 'Who created this resource? (*o*)',
    val: 'creators',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'List first and last names of any creators of resource',
    example_ans: example.creator,
  },
  {
    string:
      'What is the email address of one of the owners? (This information will be made publicly available on our portal))',
    val: 'contactEmail',
    type: 'type',
    options: null,
    required: false,
    tip: 'This will be publicly available in case anyone has any questions',
    example_ans: example.contact_email,
  },
  {
    string: 'Where was the resource made?',
    val: 'location',
    type: 'type',
    options: null,
    required: false,
    tip: 'Please list city, state, country',
    example_ans: example.location,
  },
  {
    string:
      'If applicable, is the resource funded by anyone or an organization?',
    val: 'fundedBy',
    type: 'type',
    options: null,
    required: false,
    tip: 'Please list any affiliations or organizations',
    example_ans: example.fundedBy,
  },
  {
    string: 'If applicable, does the resource have any missing information?',
    val: 'missingInfo',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any missing information',
    example_ans: example.missingInfo,
  },
  {
    string: 'If applicable, how did you ensure quality for the resource?',
    val: 'qualityReview',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any quality resources',
    example_ans: example.qualityReview,
  },
  {
    string:
      'If applicable, were any ethical review processes conducted (e.g., by an institutional review board)? If so, please provide a description of these review processes, including the outcomes, as well as a link or other access point to any supporting documentation.',
    val: 'ethicsReview',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Please include any outcomes and links to supporting documentation',
    example_ans: example.ethicsReview,
  },
  {
    string: 'Who is the intended audience?',
    val: 'intendedAudience',
    type: 'type',
    options: null,
    required: false,
    tip: 'Please list any target audiences',
    example_ans: example.intendedAudience,
  },
  {
    string:
      'If applicable, describe any mechanisms through which individuals can request information to be removed.',
    val: 'privacyProcedure',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any applicable methods for de-identification',
    example_ans: example.privacyProcedure,
  },
];
// {
//   string: ,
//   val: ,
//   type: ,
//   options: ,
//   required: ,
//   tip: ,
//   example_ans:
// }
export const questions_dataset = [
  {
    string: 'If applicable, upload data dictionary',
    val: 'dataDictLink',
    type: 'linkFile',
    options: null,
    required: true,
    tip: 'Please link to an Excel or screenshot of data dictionary',
    example_ans: '',
  },
  {
    string:
      'What is the relationship between the dataset collector and owner/manager? ',
    val: 'dataCollectorOwnerRelation',
    type: 'type',
    options: null,
    required: false,
    tip:
      'State if they are the same person or if different people and their relationship',
    example_ans: example.dataCollectorOwnerRelation,
  },
  {
    string: 'What is the data collection process?  (*o*)',
    val: 'dataCollection',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe data collection process if manual or automated and sources.',
    example_ans: example.dataCollection,
  },
  {
    string:
      'What information on the data is being collected, used and managed?',
    val: 'infoCollected',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe if data is changed and managed',
    example_ans: example.infoCollected,
  },
  {
    string: 'Are there any restrictions on accessing data?',
    val: 'externalRestrictions',
    type: 'type',
    options: null,
    required: true,
    tip:
      'Describe any access permissions. Either Yes and explain restrictions or No',
    example_ans: example.externalRestrictions,
  },
  {
    string: 'Is there sensitive data?',
    val: 'sensitiveData',
    type: 'type',
    options: null,
    required: false,
    tip:
      'Please describe any sensitive data such as personal information, business information  or classified information Sensitive Data is Data that could reveal: Racial or ethnic origin, political opinion, religious beliefs, biometric data, health data, sexual orientation, financial information, personal information',
    example_ans: example.sensitiveData,
  },
  {
    string: 'What are some tasks that the dataset has been used for?',
    val: 'datasetTasks',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any past use cases of dataset',
    example_ans: example.datasetTasks,
  },
  {
    string:
      'What are subpopulations by demographics in the dataset? Are they vulnerable?',
    val: 'datasetDemographics',
    type: 'type',
    options: false,
    required: false,
    tip:
      'Describe by age, gender, race, or other categories and provide a description of their respective distributions within the dataset. There are several definitions available for the term “vulnerable populations”, the words simply imply the disadvantaged sub-segment of the community requiring upmost care, specific ancillary considerations and augmented protections in research.  The vulnerable individuals’ freedom and capability to protect one-self from intended or inherent risks is variably abbreviated, from decreased freewill to inability to make informed choices(NCBI).',
    example_ans: example.datasetDemographics,
  },
  {
    string:
      'Is it possible to identify individuals (i.e., one or more natural persons), either directly or indirectly (i.e., in combination with other data) from the dataset?',
    val: 'individualsIdentified',
    type: 'select',
    options: ['Yes', 'No'],
    required: false,
    tip: null,
    example_ans: example.individualsIdentified,
  },
  {
    string:
      'Does the dataset contain data that might be considered confidential (e.g., data that is protected by legal privilege or by doctor patient confidentiality, data that includes the content of individuals’ non-public communications)?',
    val: 'isConfidential',
    type: 'select',
    options: ['Yes', 'No'],
    required: false,
    tip: null,
    example_ans: example.isConfidential,
  },
  {
    string:
      "If individuals' data is included in this dataset, did those individuals consent to the collection and use of their data? If so, please describe the consent procedure.",
    val: 'individualsConsent',
    type: 'type',
    options: null,
    required: false,
    tip: 'Describe any consent procedures',
    example_ans: example.individualsConsent,
  },
  //TODO: form that has sub questions
  {
    string:
      "If individuals' data is included in this dataset, was this data altered to ensure higher levels of privacy?",
    val: 'personalInfoRemoved',
    type: 'select',
    options: ['Yes', 'No'],
    required: false,
    tip: 'Data altered to ensure higher levels of privacy',
    example_ans: example.personalInfoRemoved,
  },
  {
    string:
      'If yes to the previous question, please describe any privacy procedures followed with regards to this dataset (anonymization efforts, privacy protocols, suppression techniques, etc).',
    val: 'privacyProcedure',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Description of privacy procedures',
    example_ans: example.privacyProcedure,
  },
  {
    string:
      'Does the dataset contain data that, if viewed directly, might be offensive, insulting, threatening, or might otherwise cause anxiety?',
    val: 'offensiveContent',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe any warnings about the dataset',
    example_ans: example.offensiveContent,
  },
  {
    string: 'Which fields have explicit and implicit relationships?',
    val: 'fieldsRelationship',
    type: 'type',
    options: null,
    required: false,
    tip: '',
    example_ans: example.fieldsRelationship,
  },
  {
    string:
      'How many instances are there in total(of each type if appropriate)',
    val: 'numInstances',
    type: 'type',
    options: null,
    required: false,
    tip: 'If instance number will change due to updates, include “+”',
    example_ans: example.numInstances,
  },
  {
    string:
      'What do the instances that comprise the dataset represent (e.g., documents, unprocessed text, photos, people, countries)?',
    val: 'instances',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any representations',
    example_ans: example.instances,
  },
  {
    string:
      'Are there multiple types of instances (e.g., movies, users, and ratings; people and interactions between them; nodes and edges)? Please provide a description',
    val: 'typeInstances',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Provide any interactions between instances',
    example_ans: example.typeInstances,
  },
  {
    string:
      'Does the dataset contain all possible instances or is it a sample (not necessarily random) of instances from a larger set?',
    val: 'completeness',
    type: 'type',
    options: null,
    required: false,
    tip: 'State if sample size or larger dataset.',
    example_ans: example.completeness,
  },
  {
    string:
      'Was any preprocessing/cleaning/labeling of the data done? If so, please provide a description.',
    val: 'preprocessing',
    type: 'type',
    options: null,
    required: false,
    tip:
      'Were missing values filled? Was categorical data encoded? Was the dataset split or was there feature scaling?',
    example_ans: example.preprocessing,
  },
  {
    string:
      'If the data was processed, was the raw data saved in addition to the preprocessed/cleaned/labeled data? If yes, please provide a link to the raw data.',
    val: 'rawData',
    type: 'type',
    options: null,
    required: false,
    tip: 'Yes/No, link raw data if possible ',
    example_ans: example.rawData,
  },
  {
    string: 'Is your dataset a sample?',
    val: 'sample',
    type: 'select',
    options: ['Yes', 'No', 'N/A'],
    required: false,
    tip: 'Describe sampling strategy',
    example_ans: example.sample,
  },
  {
    string:
      'If so, what was the sampling strategy used (e.g. deterministic, probabilistic with specific sampling probabilities), and does it accurately represent the intended output?',
    val: 'sampleStrategy',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Describe sampling strategy',
    example_ans: example.sampleStrategy,
  },
  {
    string:
      'If the dataset is a sample, is the sample representative of the larger set (e.g., geographic coverage)?',
    val: 'populationDataSource',
    type: 'multiple-type',
    options: [
      'Population Data Source',
      ' Sample truly represent the larger set: (Describe why not if applicable)',
    ],
    required: false,
    tip: 'Link population data source if applicable ',
    example_ans: '',
  },
  {
    string:
      'Are there recommended data splits (e.g., training, development/validation, testing)?',
    val: 'recommendedSplit',
    type: 'type',
    options: null,
    required: false,
    tip: 'Yes, No, N/A and recommended split',
    example_ans: example.recommendedSplit,
  },
  {
    string:
      'Is data used in the training or implementation of this system handled with care?',
    val: 'handledCarefully',
    type: 'select',
    options: ['Yes, No', 'N/A'],
    required: false,
    tip: ['Yes', 'No', 'N/A'],
    example_ans: 'Yes, No , N/A',
  },
  {
    string:
      'Is your system trained on data that accurately represents your entire user base?',
    val: 'accurateRepresentation',
    type: 'select',
    options: ['Yes', 'No', 'N/A'],
    required: false,
    tip: 'Yes, No, N/A',
    example_ans: example.accurateRepresentation,
  },
  {
    string: 'Is data being used to train the system raw or processed?',
    val: 'rawOrProcessed',
    type: 'type',
    options: null,
    required: false,
    tip: 'If data is trained, please answer',
    example_ans: example.rawOrProcessed,
  },
  {
    string: 'Any assessment procedure for protection against data drift?',
    val: 'dataDrift',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'Data drift is the sum of data changes',
    example_ans: example.dataDrift,
  },
  {
    string: 'Has the data been reused?',
    val: 'dataReuse',
    type: 'type',
    options: null,
    required: false,
    tip: 'State any instances of data being reused',
    example_ans: 'N/A',
  },
  {
    string: 'Which state is the dataset in the dataset lifecycle?',
    val: 'lifecycleState',
    type: 'select',
    options: [
      'Generate Schema',
      'Create Dataset',
      'Populate Dataset',
      'Validate Dataset',
      'Update Dataset',
      'Annihilate Dataset',
    ],
    required: false,
    tip:
      'Stages include: Generate Schema, Create Dataset, Populate Dataset, Validate Dataset, Update Dataset, Annihilate Dataset',
    example_ans: example.lifecycleState,
  },
  {
    string:
      'Are there any errors, sources of noise, or redundancies in the dataset? (User Input)',
    val: 'noiseDescription',
    type: 'type',
    options: null,
    required: false,
    tip:
      'Some examples could be erroneous attribute values, missing or unknown attribute values',
    example_ans: example.noiseDescription,
  },
  {
    string:
      'Is the dataset self-contained, or does the dataset include information from upstream sources? If so, name these sources, their stability, and any known usage limitations.',
    val: 'dataDependency',
    type: 'multiple-type',
    options: [
      'Description if data self-contained or dependent on upstream resources',
      'Any guarantee that the data will exist and remain constant over time',
      'Official archival versions of the complete dataset',
      'Description on restrictions associated with external resources',
    ],
    required: false,
    tip: '',
    example_ans: '',
  },
  // {
  //   string: ,
  //   val: ,
  //   type: ,
  //   options: null ,
  //   required: false,
  //   tip: ,
  //   example_ans:
  // }
];

export const questions_model = [
  {
    string: 'What is the model type?',
    val: 'modelType',
    type: 'type',
    options: null,
    required: true,
    tip: 'Examples can include regression, neural net, random forest etc.',
    example_ans: example.modelType,
  },
  {
    string: 'What are the model inputs?',
    val: 'modelInputs',
    type: 'type',
    options: null,
    required: false,
    tip: 'Describe any input data',
    example_ans: example.modelInputs,
  },
  {
    string: 'What are the model outputs?',
    val: 'modelOutputs',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any outputs',
    example_ans: example.modelOutputs,
  },
  {
    string: 'What are the limitations of the model?',
    val: 'modelTradeOffs',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'List any tradeoffs',
    example_ans: example.modelTradeOffs,
  },
  {
    string: 'What are the model hyperparameters?',
    val: 'hyperparameters',
    type: 'text-area',
    options: null,
    required: false,
    tip:
      'Learning Rate, Number of Epochs, Number of branches in decision tree, number of clusters in clustering algorithm etc.',
    example_ans: example.hyperparameters,
  },
  {
    string: 'What is the model architecture?',
    val: 'modelArchitecture',
    type: 'type',
    options: null,
    required: false,
    tip: '# of layers, layer types',
    example_ans: example.modelArchitecture,
  },
  {
    string: 'Is this model used for classification or regression?',
    val: 'modelTask',
    type: 'type',
    options: null,
    required: false,
    tip: 'Classification or Regression task',
    example_ans: example.modelTask,
  },
  {
    string: 'What type of learning is this model?',
    val: 'learningType',
    type: 'select',
    options: ['Unsupervised, Supervised', 'Reinforcement'],
    required: false,
    tip: 'Unsupervised, Supervised, or Reinforcement Learning',
    example_ans: example.learningType,
  },
  {
    string: 'How many parameters are there?',
    val: 'numParameters',
    type: 'text-area',
    options: null,
    required: false,
    tip: '',
    example_ans: '',
  },
  {
    string: 'What are the model’s attributes?',
    val: 'modelAttributes',
    type: 'text-area',
    options: null,
    required: false,
    tip: '',
    example_ans: '',
  },
  {
    string: 'Which framework does the model use?',
    val: 'framework',
    type: 'type',
    options: null,
    required: false,
    tip: 'Examples: PyTorch, TensorFlow etc.',
    example_ans: example.framework,
  },
  {
    string: 'What are model dependencies?',
    val: 'modelDependencies',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any libraries needed',
    example_ans: example.modelDependencies,
  },
  {
    string: ' What are hardware requirements?',
    val: 'hardwareRequirements',
    type: 'type',
    options: null,
    required: false,
    tip: 'Number of GPUs',
    example_ans: example.hardwareRequirements,
  },
  {
    string: 'What are other pretrained models?',
    val: 'pretrainedModels',
    type: 'type',
    options: null,
    required: false,
    tip: 'Link any pre-trained models',
    example_ans: example.pretrainedModels,
  },
  {
    string: 'What are the model metrics?',
    val: 'modelMetrics',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any model metrics such as F1 score, accuracy etc.',
    example_ans: example.modelMetrics,
  },
];
