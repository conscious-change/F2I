/**
 * Career Database
 * 
 * A database of career profiles for the career recommendation engine.
 * Each profile includes required skills, interests, personality traits,
 * and career information.
 */

// Career Database
const careerDatabase = [
  {
    id: "product_manager",
    title: "Product Manager",
    description: "Oversees product development from conception to launch, balancing business needs with technical feasibility and user experience.",
    federalTransition: "Ideal for federal project managers, program analysts, and policy specialists who have experience coordinating cross-functional teams and translating requirements into deliverables.",
    
    // Skills required (0-5 scale, where 0 = not required, 5 = essential)
    requiredSkills: {
      technical: {
        project_management: 5,
        data_analysis: 4,
        product_development: 4,
        agile_methodology: 3,
        market_research: 3,
        user_experience: 3,
        technical_writing: 3,
        budget_management: 3
      },
      soft: {
        strategic_planning: 5,
        stakeholder_management: 5,
        communication: 5,
        leadership: 4,
        problem_solving: 4,
        decision_making: 4,
        negotiation: 4,
        team_leadership: 4
      }
    },
    
    // Relevant software and tools
    relevantTools: [
      "Product Management Software (Jira, Asana, Trello)",
      "Data Analysis Tools (Excel, Tableau)",
      "Prototyping Tools (Figma, Sketch)",
      "Customer Feedback Platforms"
    ],
    
    // Professional interests that align with this career
    relatedInterests: [
      "Technology",
      "Business Strategy",
      "User Experience",
      "Innovation",
      "Problem Solving"
    ],
    
    // Work values that align with this role
    workValues: {
      autonomy: 4,
      creativity: 4,
      impact: 5,
      variety: 5,
      recognition: 3,
      workLifeBalance: 3,
      advancement: 4
    },
    
    // Personality traits that suit this career (0-5 scale)
    personalityTraits: {
      openness: 4, // Open to new ideas and approaches
      conscientiousness: 5, // Detail-oriented and organized
      extraversion: 4, // Comfortable working with diverse stakeholders
      agreeableness: 3, // Balanced between collaboration and assertiveness
      neuroticism: 1, // Emotionally stable under pressure
      
      workStyles: {
        analytical: 4,
        creative: 4,
        practical: 4,
        leadership: 5,
        detail_oriented: 3,
        big_picture: 5
      }
    },
    
    // Career information
    careerInfo: {
      medianSalary: "$115,000 - $150,000",
      salaryRange: "$90,000 - $200,000+",
      outlook: "Excellent (15% growth over 10 years)",
      workEnvironment: "Corporate, Startup, Remote options",
      advancement: "Senior Product Manager, Director of Product, VP of Product, Chief Product Officer",
      entryRequirements: "Bachelor's degree, 3-5 years experience in project management or related field"
    },
    
    // Federal to private transition tips
    transitionTips: [
      "Emphasize experience managing complex projects with multiple stakeholders",
      "Highlight data-driven decision making and measurable outcomes",
      "Translate government processes into product development terminology",
      "Showcase experience with requirements gathering and implementation",
      "Obtain product management certifications (e.g., Scrum, PMP)"
    ]
  },
  
  {
    id: "data_analyst",
    title: "Data Analyst",
    description: "Collects, processes, and performs statistical analyses on large datasets to identify patterns and insights that drive business decisions.",
    federalTransition: "Well-suited for federal employees with experience in data management, statistical analysis, reporting, or research who enjoy working with numbers and finding patterns in complex information.",
    
    // Skills required (0-5 scale, where 0 = not required, 5 = essential)
    requiredSkills: {
      technical: {
        data_analysis: 5,
        statistical_methods: 4,
        database_management: 4,
        data_visualization: 4,
        sql: 4,
        excel_advanced: 4,
        programming: 3,
        business_intelligence: 3
      },
      soft: {
        analytical_thinking: 5,
        attention_to_detail: 5,
        problem_solving: 4,
        communication: 4,
        critical_thinking: 4,
        time_management: 3,
        presentation: 3,
        teamwork: 3
      }
    },
    
    // Relevant software and tools
    relevantTools: [
      "SQL",
      "Excel (Advanced)",
      "Tableau, Power BI",
      "Python or R",
      "Statistical Software (SPSS, SAS)",
      "Data Cleaning Tools"
    ],
    
    // Professional interests that align with this career
    relatedInterests: [
      "Data and Analytics",
      "Research",
      "Statistics",
      "Problem Solving",
      "Technology"
    ],
    
    // Work values that align with this role
    workValues: {
      autonomy: 3,
      creativity: 3,
      impact: 4,
      variety: 3,
      recognition: 2,
      workLifeBalance: 4,
      advancement: 3
    },
    
    // Personality traits that suit this career (0-5 scale)
    personalityTraits: {
      openness: 3, // Curious about patterns and insights
      conscientiousness: 5, // Detail-oriented and methodical
      extraversion: 2, // Can work independently
      agreeableness: 3, // Collaborative but objective
      neuroticism: 2, // Handles ambiguity well
      
      workStyles: {
        analytical: 5,
        creative: 2,
        practical: 4,
        leadership: 2,
        detail_oriented: 5,
        big_picture: 3
      }
    },
    
    // Career information
    careerInfo: {
      medianSalary: "$85,000 - $110,000",
      salaryRange: "$65,000 - $140,000",
      outlook: "Very Good (18% growth over 10 years)",
      workEnvironment: "Corporate, Government, Consulting, Remote options",
      advancement: "Senior Data Analyst, Data Scientist, Analytics Manager, Business Intelligence Manager",
      entryRequirements: "Bachelor's degree in statistics, mathematics, economics, computer science, or related field"
    },
    
    // Federal to private transition tips
    transitionTips: [
      "Highlight experience with large, complex datasets and reporting",
      "Showcase any experience with data visualization or dashboard creation",
      "Emphasize analytical problem-solving and decision support",
      "Develop a portfolio of data analysis projects",
      "Obtain relevant certifications (e.g., Microsoft Power BI, Tableau)"
    ]
  },
  
  {
    id: "cybersecurity_specialist",
    title: "Cybersecurity Specialist",
    description: "Protects computer systems, networks, and data from cyber threats by implementing security measures, monitoring for breaches, and responding to incidents.",
    federalTransition: "Excellent match for federal IT security specialists, intelligence analysts, or compliance officers with experience in security protocols, risk assessment, or regulatory compliance.",
    
    // Skills required (0-5 scale, where 0 = not required, 5 = essential)
    requiredSkills: {
      technical: {
        network_security: 5,
        security_protocols: 5,
        threat_assessment: 4,
        incident_response: 4,
        security_tools: 4,
        operating_systems: 4,
        programming: 3,
        cloud_security: 4
      },
      soft: {
        analytical_thinking: 5,
        attention_to_detail: 5,
        problem_solving: 5,
        communication: 4,
        teamwork: 3,
        adaptability: 4,
        continuous_learning: 5,
        stress_management: 4
      }
    },
    
    // Relevant software and tools
    relevantTools: [
      "Security Information and Event Management (SIEM) tools",
      "Vulnerability Assessment Tools",
      "Penetration Testing Tools",
      "Encryption Technologies",
      "Firewalls and Network Security Tools"
    ],
    
    // Professional interests that align with this career
    relatedInterests: [
      "Cybersecurity",
      "Information Technology",
      "Risk Management",
      "Problem Solving",
      "Continuous Learning"
    ],
    
    // Work values that align with this role
    workValues: {
      autonomy: 3,
      creativity: 3,
      impact: 5,
      variety: 4,
      recognition: 3,
      workLifeBalance: 3,
      advancement: 4
    },
    
    // Personality traits that suit this career (0-5 scale)
    personalityTraits: {
      openness: 3, // Balanced between established protocols and new approaches
      conscientiousness: 5, // Highly detail-oriented and thorough
      extraversion: 2, // Can work independently
      agreeableness: 3, // Collaborative but firm on security requirements
      neuroticism: 2, // Calm under pressure
      
      workStyles: {
        analytical: 5,
        creative: 3,
        practical: 5,
        leadership: 3,
        detail_oriented: 5,
        big_picture: 4
      }
    },
    
    // Career information
    careerInfo: {
      medianSalary: "$100,000 - $130,000",
      salaryRange: "$75,000 - $170,000+",
      outlook: "Excellent (31% growth over 10 years)",
      workEnvironment: "Corporate, Government, Consulting, Remote options",
      advancement: "Senior Security Specialist, Security Architect, CISO (Chief Information Security Officer)",
      entryRequirements: "Bachelor's degree in cybersecurity, computer science, or related field; Security certifications (CISSP, CEH, Security+)"
    },
    
    // Federal to private transition tips
    transitionTips: [
      "Emphasize experience with security protocols and compliance frameworks",
      "Highlight incident response and risk assessment experience",
      "Obtain industry-recognized certifications (CISSP, CEH, Security+)",
      "Translate classified experience into general security principles",
      "Showcase experience with security tools and technologies"
    ]
  },
  
  {
    id: "management_consultant",
    title: "Management Consultant",
    description: "Helps organizations improve performance through analysis of existing problems and development of plans for improvement, often specializing in specific industries or business functions.",
    federalTransition: "Great fit for federal program managers, policy analysts, or strategic planners who have experience with organizational assessment, process improvement, or change management.",
    
    // Skills required (0-5 scale, where 0 = not required, 5 = essential)
    requiredSkills: {
      technical: {
        business_analysis: 5,
        project_management: 4,
        data_analysis: 4,
        process_improvement: 4,
        strategic_planning: 5,
        change_management: 4,
        financial_analysis: 3,
        industry_knowledge: 4
      },
      soft: {
        problem_solving: 5,
        communication: 5,
        presentation: 5,
        critical_thinking: 5,
        stakeholder_management: 5,
        adaptability: 4,
        teamwork: 4,
        leadership: 4
      }
    },
    
    // Relevant software and tools
    relevantTools: [
      "Business Analysis Tools",
      "Project Management Software",
      "Data Analysis and Visualization Tools",
      "Process Mapping Software",
      "Microsoft Office Suite (Advanced)"
    ],
    
    // Professional interests that align with this career
    relatedInterests: [
      "Business Strategy",
      "Organizational Development",
      "Process Improvement",
      "Problem Solving",
      "Change Management"
    ],
    
    // Work values that align with this role
    workValues: {
      autonomy: 4,
      creativity: 4,
      impact: 5,
      variety: 5,
      recognition: 4,
      workLifeBalance: 2,
      advancement: 5
    },
    
    // Personality traits that suit this career (0-5 scale)
    personalityTraits: {
      openness: 4, // Open to new approaches and ideas
      conscientiousness: 5, // Detail-oriented and organized
      extraversion: 4, // Comfortable working with clients
      agreeableness: 3, // Balanced between collaboration and assertiveness
      neuroticism: 1, // Handles pressure and ambiguity well
      
      workStyles: {
        analytical: 5,
        creative: 4,
        practical: 4,
        leadership: 4,
        detail_oriented: 4,
        big_picture: 5
      }
    },
    
    // Career information
    careerInfo: {
      medianSalary: "$95,000 - $150,000",
      salaryRange: "$80,000 - $250,000+",
      outlook: "Good (11% growth over 10 years)",
      workEnvironment: "Consulting Firms, Corporate, Travel Required",
      advancement: "Senior Consultant, Manager, Partner, Independent Consultant",
      entryRequirements: "Bachelor's or Master's degree in business, economics, or related field; MBA often preferred"
    },
    
    // Federal to private transition tips
    transitionTips: [
      "Highlight experience with organizational assessment and improvement",
      "Emphasize project management and change management experience",
      "Showcase analytical skills and data-driven decision making",
      "Translate government processes into business terminology",
      "Develop expertise in specific industries or functional areas"
    ]
  },
  
  {
    id: "compliance_manager",
    title: "Compliance Manager",
    description: "Ensures an organization adheres to internal policies and regulatory requirements by developing compliance programs, conducting audits, and managing risk.",
    federalTransition: "Excellent match for federal regulatory specialists, auditors, inspectors, or legal analysts with experience in regulatory frameworks, compliance monitoring, or risk assessment.",
    
    // Skills required (0-5 scale, where 0 = not required, 5 = essential)
    requiredSkills: {
      technical: {
        regulatory_knowledge: 5,
        compliance_frameworks: 5,
        risk_assessment: 5,
        audit_procedures: 4,
        policy_development: 4,
        legal_analysis: 4,
        reporting: 4,
        documentation: 4
      },
      soft: {
        attention_to_detail: 5,
        integrity: 5,
        communication: 5,
        analytical_thinking: 4,
        stakeholder_management: 4,
        problem_solving: 4,
        diplomacy: 4,
        training_facilitation: 3
      }
    },
    
    // Relevant software and tools
    relevantTools: [
      "Governance, Risk, and Compliance (GRC) Software",
      "Audit Management Systems",
      "Document Management Systems",
      "Reporting Tools",
      "Regulatory Tracking Software"
    ],
    
    // Professional interests that align with this career
    relatedInterests: [
      "Regulatory Compliance",
      "Risk Management",
      "Legal Frameworks",
      "Process Improvement",
      "Corporate Governance"
    ],
    
    // Work values that align with this role
    workValues: {
      autonomy: 3,
      creativity: 2,
      impact: 4,
      variety: 3,
      recognition: 3,
      workLifeBalance: 4,
      advancement: 3
    },
    
    // Personality traits that suit this career (0-5 scale)
    personalityTraits: {
      openness: 3, // Balance between established procedures and new approaches
      conscientiousness: 5, // Highly detail-oriented and thorough
      extraversion: 3, // Balanced for both independent work and stakeholder interaction
      agreeableness: 3, // Diplomatic but firm on compliance requirements
      neuroticism: 2, // Handles pressure well
      
      workStyles: {
        analytical: 5,
        creative: 2,
        practical: 5,
        leadership: 3,
        detail_oriented: 5,
        big_picture: 3
      }
    },
    
    // Career information
    careerInfo: {
      medianSalary: "$90,000 - $120,000",
      salaryRange: "$75,000 - $180,000",
      outlook: "Good (8% growth over 10 years)",
      workEnvironment: "Corporate, Financial Services, Healthcare, Manufacturing",
      advancement: "Senior Compliance Manager, Director of Compliance, Chief Compliance Officer",
      entryRequirements: "Bachelor's degree in business, law, or related field; Compliance certifications often preferred"
    },
    
    // Federal to private transition tips
    transitionTips: [
      "Emphasize experience with regulatory frameworks and compliance monitoring",
      "Highlight risk assessment and mitigation experience",
      "Showcase policy development and implementation skills",
      "Translate government compliance experience to industry-specific regulations",
      "Obtain industry-specific compliance certifications"
    ]
  }
];

// Export the career database
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { careerDatabase };
} else {
  // For browser environment
  window.careerDatabase = careerDatabase;
}
