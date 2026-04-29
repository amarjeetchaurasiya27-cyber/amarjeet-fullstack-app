pipeline {
    agent any

    // Jenkins ko batayega ki Node.js 20 ka istemal karna hai
    tools {
        nodejs 'node20' 
    }

    environment {
        DOCKER_USER = 'amarjeet001'
        BACKEND_IMAGE = "amarjeet001/amarjeet-node-backend:v1"
        FRONTEND_IMAGE = "amarjeet001/amarjeet-react-frontend:v1"
    }

    stages {
        stage('Step 1: Full-Stack Quality Scan') {
            parallel {
                stage('Backend Scan') {
                    steps { 
                        dir('backend') { 
                            // Windows ke liye 'sh' ki jagah 'bat'
                            bat 'npm install'
                            bat 'node sonar-project.js' 
                        } 
                    }
                }
                stage('Frontend Scan') {
                    steps { 
                        dir('frontend') { 
                            bat 'npm install'
                            bat 'node sonar-scanner.cjs' 
                        } 
                    }
                }
            }
        }

        stage('Step 2: Docker Build & Tagging') {
            steps {
                echo 'Building precise images for Amarjeet...'
                // Windows environment variables use karne ka sahi tarika
                bat "docker build -t %BACKEND_IMAGE% ./backend"
                bat "docker build -t %FRONTEND_IMAGE% ./frontend"
            }
        }

        stage('Step 3: Docker Hub Push') {
            steps {
                echo "Pushing to Docker Hub account: %DOCKER_USER%"
                // CredentialsId wahi hona chahiye jo Jenkins mein hai
                withCredentials([string(credentialsId: 'docker-creds', variable: 'DOCKER_PASSWORD')]) {
                    // Windows par echo piping aise hoti hai
                    bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USER% --password-stdin"
                }
                bat "docker push %BACKEND_IMAGE%"
                bat "docker push %FRONTEND_IMAGE%"
            }
        }

        stage('Step 4: Clean & Deploy') {
            steps {
                echo 'Cleaning old containers and deploying on 8085/8086...'
                // '|| true' ki jagah Windows mein '2>nul' use hota hai par simple 'bat' bhi chalega
                bat "docker rm -f node-api-amarjeet react-web-amarjeet || exit 0"
                bat "docker run -d --name node-api-amarjeet -p 8086:5000 %BACKEND_IMAGE%"
                bat "docker run -d --name react-web-amarjeet -p 8085:80 %FRONTEND_IMAGE%"
            }
        }
    }
}
