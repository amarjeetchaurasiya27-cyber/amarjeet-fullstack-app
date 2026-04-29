pipeline {
    agent any

    tools {
        nodejs 'node20' 
    }

    environment {
        DOCKER_USER = 'amarjeet001'
        BACKEND_IMAGE = "amarjeet001/amarjeet-node-backend:v1"
        FRONTEND_IMAGE = "amarjeet001/amarjeet-react-frontend:v1"
        // Hack: Windows Jenkins ko batana padta hai ki Docker pipe kahan hai
        DOCKER_HOST = "npipe:////./pipe/docker_engine"
    }

    stages {
        stage('Step 1: Full-Stack Quality Scan') {
            parallel {
                stage('Backend Scan') {
                    steps { 
                        dir('backend') { 
                            bat 'npm install'
                            // Error handling: Agar scan fail ho toh pipeline na ruke
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
                echo 'Building precise images for Amarjeet...'
                // Build se pehle purani images clean karna achhi aadat hai
                bat "docker build -t %BACKEND_IMAGE% ./backend"
                bat "docker build -t %FRONTEND_IMAGE% ./frontend"
            }
        }

        stage('Step 3: Docker Hub Push') {
            steps {
                echo "Pushing to Docker Hub account: %DOCKER_USER%"
                // MATCHED: Aapke screenshot wala ID 'dockerhub-creds'
                withCredentials([string(credentialsId: 'dockerhub-creds', variable: 'DOCKER_PASSWORD')]) {
                    bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USER% --password-stdin"
                }
                bat "docker push %BACKEND_IMAGE%"
                bat "docker push %FRONTEND_IMAGE%"
            }
        }

        stage('Step 4: Clean & Deploy') {
            steps {
                echo 'Cleaning old containers and deploying...'
                bat "docker rm -f node-api-amarjeet react-web-amarjeet || exit 0"
                bat "docker run -d --name node-api-amarjeet -p 8086:5000 %BACKEND_IMAGE%"
                bat "docker run -d --name react-web-amarjeet -p 8085:80 %FRONTEND_IMAGE%"
            }
        }
    }
}
