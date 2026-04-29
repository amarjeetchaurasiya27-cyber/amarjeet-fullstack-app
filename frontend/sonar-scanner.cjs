const sonarqubeScanner = require('sonarqube-scanner').default;

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.projectKey': 'amarjeet-react-frontend',
      'sonar.projectName': 'Amarjeet React Frontend',
      'sonar.projectDescription': 'Frontend quality check for Amarjeet React App',
      'sonar.sources': 'src',
      'sonar.token': 'squ_3ab001afad8417203a6b35f7eee4d431386ec209', // Master Token
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.sourceEncoding': 'UTF-8',
    },
  },
  () => {
    console.log('--- React Scan Finished Successfully ---');
    console.log('Check your report here: http://localhost:9000/dashboard?id=amarjeet-react-frontend');
    process.exit();
  }
);
