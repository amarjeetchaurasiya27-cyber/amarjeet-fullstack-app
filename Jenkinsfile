pipeline {
    agent any

    // Yeh block Jenkins ko batayega ki Node.js 20 ka istemal karna hai
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
                            sh 'npm install' // Dependencies install karna zaroori hai
                            sh 'node sonar-project.js' 
                        } 
                    }
                }
                stage('Frontend Scan') {
                    steps { 
                        dir('frontend') { 
                            sh 'npm install'
                            sh 'node sonar-scanner.cjs' 
                        } 
                    }
                }
            }
        }

        stage('Step 2: Docker Build & Tagging') {
            steps {
                echo 'Building precise images for Amarjeet...'
                sh "docker build -t ${BACKEND_IMAGE} ./backend"
                sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
            }
        }

        stage('Step 3: Docker Hub Push') {
            steps {
                echo "Pushing to Docker Hub account: ${DOCKER_USER}"
                // CredentialsId wahi hona chahiye jo aapne Jenkins Manage Credentials mein dala hai
                withCredentials([string(credentialsId: 'docker-creds', variable: 'DOCKER_PASSWORD')]) {
                    sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USER} --password-stdin"
                }
                sh "docker push ${BACKEND_IMAGE}"
                sh "docker push ${FRONTEND_IMAGE}"
            }
        }

        stage('Step 4: Clean & Deploy') {
            steps {
                echo 'Cleaning old containers and deploying on 8085/8086...'
                // Purane containers ko hatana taaki ports free ho jayein
                sh "docker rm -f node-api-amarjeet react-web-amarjeet || true"
                sh "docker run -d --name node-api-amarjeet -p 8086:5000 ${BACKEND_IMAGE}"
                sh "docker run -d --name react-web-amarjeet -p 8085:80 ${FRONTEND_IMAGE}"
            }
        }
    }
}
