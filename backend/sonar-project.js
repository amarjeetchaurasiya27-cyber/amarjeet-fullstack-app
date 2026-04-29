const sonarqubeScanner = require('sonarqube-scanner').default;

sonarqubeScanner(
  {
    // Yahan localhost use karna sabse safe hai agar SonarQube usi PC par hai
    serverUrl: 'http://localhost:9000', 
    options: {
      'sonar.projectKey': 'amarjeet-node-project',
      'sonar.projectName': 'Amarjeet Node Project',
      'sonar.sources': '.',
      'sonar.token': 'squ_3ab001afad8417203a6b35f7eee4d431386ec209', // 'login' ki jagah 'token' use karein
    },
  },
  () => {
    console.log('--- Backend Scan Finished ---');
    process.exit();
  }
);
