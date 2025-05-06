/**
 * Unit tests for the Assessment Core module
 */

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

// Assign mock to global object
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Import module (in a real implementation, you would use proper import)
// const AssessmentCore = require('../assets/js/modules/assessment-core');

// Test suite
describe('AssessmentCore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });
  
  test('should save data to localStorage', () => {
    const testData = { test: 'data' };
    const result = AssessmentCore.saveData(testData);
    
    expect(result).toBe(true);
    expect(window.localStorage.getItem('assessmentData')).toBe(JSON.stringify(testData));
  });
  
  test('should load data from localStorage', () => {
    const testData = { test: 'data' };
    window.localStorage.setItem('assessmentData', JSON.stringify(testData));
    
    const result = AssessmentCore.loadData();
    
    expect(result).toEqual(testData);
  });
  
  test('should return null when no data exists', () => {
    const result = AssessmentCore.loadData();
    
    expect(result).toBeNull();
  });
  
  test('should clear data from localStorage', () => {
    const testData = { test: 'data' };
    window.localStorage.setItem('assessmentData', JSON.stringify(testData));
    
    AssessmentCore.clearData();
    
    expect(window.localStorage.getItem('assessmentData')).toBeNull();
  });
  
  test('should export data as JSON', () => {
    const testData = { test: 'data' };
    const result = AssessmentCore.exportData(testData, 'json');
    
    expect(result).toContain('data:application/json');
    expect(result).toContain(encodeURIComponent(JSON.stringify(testData, null, 2)));
  });
  
  test('should throw error for unsupported export format', () => {
    const testData = { test: 'data' };
    
    expect(() => {
      AssessmentCore.exportData(testData, 'unsupported');
    }).toThrow('Unsupported export format');
  });
});
