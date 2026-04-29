pipeline {
    agent any

    tools {
        nodejs 'node20' 
    }

    environment {
        DOCKER_USER = 'amarjeet001'
        BACKEND_IMAGE = "amarjeet001/amarjeet-node-backend:v1"
        FRONTEND_IMAGE = "amarjeet001/amarjeet-react-frontend:v1"
        // Windows Docker Pipe Path
        DOCKER_HOST = "npipe:////./pipe/docker_engine"
    }

    stages {
        stage('Step 1: Full-Stack Quality Scan') {
            parallel {
                stage('Backend Scan') {
                    steps { 
                        dir('backend') { 
                            bat 'npm install'
                            bat 'node sonar-project.js || exit 0' 
                        } 
                    }
                }
                stage('Frontend Scan') {
                    steps { 
                        dir('frontend') { 
                            bat 'npm install'
                            bat 'node sonar-scanner.cjs || exit 0' 
                        } 
                    }
                }
            }
        }

        stage('Step 2: Docker Build & Tagging') {
            steps {
                echo 'Docker Hub authentication for Amarjeet...'
                // Build shuru hone se pehle hi login karna zaroori hai
                withCredentials([string(credentialsId: 'dockerhub-creds', variable: 'DOCKER_PASSWORD')]) {
                    bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USER% --password-stdin"
                }
                
                echo 'Building precise images...'
                bat "docker build -t %BACKEND_IMAGE% ./backend"
                bat "docker build -t %FRONTEND_IMAGE% ./frontend"
            }
        }

        stage('Step 3: Docker Hub Push') {
            steps {
                echo "Pushing images to account: %DOCKER_USER%"
                // Pehle hi login ho chuka hai, ab sirf push karna hai
                bat "docker push %BACKEND_IMAGE%"
                bat "docker push %FRONTEND_IMAGE%"
            }
        }

        stage('Step 4: Clean & Deploy') {
            steps {
                echo 'Cleaning old containers and deploying on 8085/8086...'
                bat "docker rm -f node-api-amarjeet react-web-amarjeet || exit 0"
                bat "docker run -d --name node-api-amarjeet -p 8086:5000 %BACKEND_IMAGE%"
                bat "docker run -d --name react-web-amarjeet -p 8085:80 %FRONTEND_IMAGE%"
            }
        }
    }
}
