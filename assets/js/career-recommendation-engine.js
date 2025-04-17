/**
 * Career Recommendation Engine
 *
 * A local JavaScript-based career recommendation system that uses
 * self-assessment results to suggest suitable career paths.
 */

console.log('Career Recommendation Engine loaded successfully');

// Comprehensive data structure for user assessment results
class UserAssessmentProfile {
  constructor() {
    // Technical skills with proficiency ratings (1-5 scale)
    this.technicalSkills = {
      // Core technical skills from federal service
      coreTechnicalSkills: {}, // e.g., { "data_analysis": 4, "project_management": 5 }

      // Agency-specific technical skills
      agencySkills: [], // Array of { name, rating, notes }

      // Software and digital tools
      softwareTools: [], // Array of { name, rating, equivalent }

      // Industry-specific skills
      industrySkills: [] // Array of { name, rating, gap }
    };

    // Transferable soft skills with proficiency ratings (1-5 scale)
    this.softSkills = {
      // Leadership skills
      leadershipSkills: {}, // e.g., { "team_leadership": 4, "strategic_planning": 3 }

      // Problem-solving skills
      problemSolvingSkills: {}, // e.g., { "critical_thinking": 5, "decision_making": 4 }

      // Communication skills
      communicationSkills: {} // e.g., { "written_communication": 5, "presentation": 3 }
    };

    // Professional interests and work values
    this.professionalInterests = {
      // Target industries of interest
      targetIndustries: [], // e.g., ["technology", "healthcare", "consulting"]

      // Work environment preferences
      workEnvironment: {
        remoteWork: 0, // 0-5 preference scale
        teamSize: "", // "small", "medium", "large"
        workpaceType: "", // "startup", "corporate", "nonprofit", etc.
        workLifeBalance: 0 // 0-5 importance scale
      },

      // Career motivators and values
      careerValues: {
        salary: 0, // 0-5 importance scale
        jobSecurity: 0, // 0-5 importance scale
        advancement: 0, // 0-5 importance scale
        autonomy: 0, // 0-5 importance scale
        creativity: 0, // 0-5 importance scale
        impact: 0, // 0-5 importance scale
        recognition: 0 // 0-5 importance scale
      }
    };

    // Personality traits (based on common assessment models)
    this.personalityTraits = {
      // Big Five personality dimensions (0-100 scale)
      openness: 0, // Openness to experience
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,

      // Work style preferences
      workStyles: {
        analytical: 0, // 0-5 scale
        creative: 0, // 0-5 scale
        practical: 0, // 0-5 scale
        leadership: 0, // 0-5 scale
        supportive: 0, // 0-5 scale
        detail_oriented: 0, // 0-5 scale
        big_picture: 0 // 0-5 scale
      }
    };

    // Key achievements and experiences
    this.achievements = []; // Array of { title, description, impact, skills }

    // STAR stories for behavioral examples
    this.starStories = []; // Array of { situation, task, action, result, skills }

    // Career transition goals
    this.careerGoals = {
      shortTerm: "", // Short-term career goal
      longTerm: "", // Long-term career goal
      desiredRoles: [], // Specific roles of interest
      salaryCriteria: "", // Salary expectations
      locationPreferences: [] // Preferred locations
    };

    // Skill gaps and development areas
    this.developmentAreas = {
      skillsToImprove: [], // Skills to develop
      trainingNeeds: [], // Training or education needed
      certifications: [] // Certifications to pursue
    };
  }

  // Method to populate the profile from self-assessment data
  populateFromSelfAssessment(assessmentData) {
    // Technical skills
    if (assessmentData.coreTechnicalSkills) {
      this.technicalSkills.coreTechnicalSkills = { ...assessmentData.coreTechnicalSkills };
    }

    if (assessmentData.agencySkills && assessmentData.agencySkills.length > 0) {
      this.technicalSkills.agencySkills = [...assessmentData.agencySkills];
    }

    if (assessmentData.softwareTools && assessmentData.softwareTools.length > 0) {
      this.technicalSkills.softwareTools = [...assessmentData.softwareTools];
    }

    if (assessmentData.industrySkills && assessmentData.industrySkills.length > 0) {
      this.technicalSkills.industrySkills = [...assessmentData.industrySkills];
    }

    // Soft skills
    if (assessmentData.leadershipSkills) {
      this.softSkills.leadershipSkills = { ...assessmentData.leadershipSkills };
    }

    if (assessmentData.problemSolvingSkills) {
      this.softSkills.problemSolvingSkills = { ...assessmentData.problemSolvingSkills };
    }

    if (assessmentData.communicationSkills) {
      this.softSkills.communicationSkills = { ...assessmentData.communicationSkills };
    }

    // Professional interests
    if (assessmentData.industryAnalysis) {
      // Extract target industries
      const industries = [];
      if (assessmentData.industryAnalysis.targetIndustry1) {
        industries.push(assessmentData.industryAnalysis.targetIndustry1);
      }
      if (assessmentData.industryAnalysis.targetIndustry2) {
        industries.push(assessmentData.industryAnalysis.targetIndustry2);
      }
      if (assessmentData.industryAnalysis.targetIndustry3) {
        industries.push(assessmentData.industryAnalysis.targetIndustry3);
      }
      this.professionalInterests.targetIndustries = industries;
    }

    // Achievements and STAR stories
    if (assessmentData.achievements && assessmentData.achievements.length > 0) {
      this.achievements = [...assessmentData.achievements];
    }

    if (assessmentData.starStories && assessmentData.starStories.length > 0) {
      this.starStories = [...assessmentData.starStories];
    }

    // Development areas
    if (assessmentData.developSkill1 || assessmentData.developSkill2 || assessmentData.developSkill3) {
      const skillsToImprove = [];
      if (assessmentData.developSkill1) skillsToImprove.push(assessmentData.developSkill1);
      if (assessmentData.developSkill2) skillsToImprove.push(assessmentData.developSkill2);
      if (assessmentData.developSkill3) skillsToImprove.push(assessmentData.developSkill3);
      this.developmentAreas.skillsToImprove = skillsToImprove;
    }

    // Career goals
    if (assessmentData.nextStep1 || assessmentData.nextStep2 || assessmentData.nextStep3) {
      const desiredRoles = [];
      // Extract potential role information from next steps
      if (assessmentData.nextStep1 && assessmentData.nextStep1.includes("role")) {
        const roleMatch = assessmentData.nextStep1.match(/role as a ([^,\.]+)/i);
        if (roleMatch && roleMatch[1]) desiredRoles.push(roleMatch[1].trim());
      }
      this.careerGoals.desiredRoles = desiredRoles;
    }

    return this;
  }

  // Method to get the top technical skills (rated 4-5)
  getTopTechnicalSkills() {
    const topSkills = [];

    // Check core technical skills
    for (const [skill, rating] of Object.entries(this.technicalSkills.coreTechnicalSkills)) {
      if (rating >= 4) {
        topSkills.push({ name: skill, rating: rating });
      }
    }

    // Check agency skills
    this.technicalSkills.agencySkills.forEach(skill => {
      if (skill.rating >= 4) {
        topSkills.push({ name: skill.name, rating: skill.rating });
      }
    });

    // Check software tools
    this.technicalSkills.softwareTools.forEach(tool => {
      if (tool.rating >= 4) {
        topSkills.push({ name: tool.name, rating: tool.rating });
      }
    });

    return topSkills.sort((a, b) => b.rating - a.rating);
  }

  // Method to get the top soft skills (rated 4-5)
  getTopSoftSkills() {
    const topSkills = [];

    // Check leadership skills
    for (const [skill, rating] of Object.entries(this.softSkills.leadershipSkills)) {
      if (rating >= 4) {
        topSkills.push({ name: skill, rating: rating });
      }
    }

    // Check problem-solving skills
    for (const [skill, rating] of Object.entries(this.softSkills.problemSolvingSkills)) {
      if (rating >= 4) {
        topSkills.push({ name: skill, rating: rating });
      }
    }

    // Check communication skills
    for (const [skill, rating] of Object.entries(this.softSkills.communicationSkills)) {
      if (rating >= 4) {
        topSkills.push({ name: skill, rating: rating });
      }
    }

    return topSkills.sort((a, b) => b.rating - a.rating);
  }

  // Method to get skill gaps (industry skills with low ratings)
  getSkillGaps() {
    const skillGaps = [];

    this.technicalSkills.industrySkills.forEach(skill => {
      if (skill.rating <= 2 && skill.name) {
        skillGaps.push({
          name: skill.name,
          rating: skill.rating,
          gap: skill.gap
        });
      }
    });

    return skillGaps;
  }
}

// Export the UserAssessmentProfile class
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UserAssessmentProfile };
} else {
  // For browser environment
  window.UserAssessmentProfile = UserAssessmentProfile;
}
