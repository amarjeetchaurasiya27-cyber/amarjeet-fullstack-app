const sonarqubeScanner = require('sonarqube-scanner').default;

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.projectKey': 'amarjeet-node-project',
      'sonar.projectName': 'Amarjeet Node Project',
      'sonar.sources': '.',
      // Token ko login ki jagah daalna hi sabse bada secret hai
      'sonar.login': 'squ_3ab001afad8417203a6b35f7eee4d431386ec209', 
    },
  },
  () => {
    console.log('--- Scan Finished ---');
    process.exit();
  }
);