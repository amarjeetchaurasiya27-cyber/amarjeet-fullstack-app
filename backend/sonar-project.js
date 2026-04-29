const sonarqubeScanner = require('sonarqube-scanner').default;

sonarqubeScanner(
  {
    // Yahan localhost use karna sabse safe hai agar SonarQube usi PC par hai
    serverUrl: 'http://localhost:9000', 
    options: {
      'sonar.projectKey': 'amarjeet-node-project',
      'sonar.projectName': 'Amarjeet Node Project',
      'sonar.sources': '.',
      'sonar.login': 'squ_b99fd2c51889eb49e49a04e0ccd2a81d5fbaaf06', // 'login' ki jagah 'token' use karein
    },
  },
  () => {
    console.log('--- Backend Scan Finished ---');
    process.exit();
  }
);
