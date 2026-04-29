const sonarqubeScanner = require('sonarqube-scanner').default;

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.projectKey': 'amarjeet-react-frontend',
      'sonar.projectName': 'Amarjeet React Frontend',
      'sonar.projectDescription': 'Frontend quality check for Amarjeet React App',
      'sonar.sources': 'src',
      'sonar.login': 'squ_b99fd2c51889eb49e49a04e0ccd2a81d5fbaaf06', // Master Token
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
