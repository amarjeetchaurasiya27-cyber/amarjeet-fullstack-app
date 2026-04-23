pipeline {
    agent any

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
                            sh 'node sonar-project.js' 
                        } 
                    }
                }
                stage('Frontend Scan') {
                    steps { 
                        dir('frontend') { 
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
                echo 'Pushing to Docker Hub account: amarjeet001'
                withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}"
                }
                sh "docker push ${BACKEND_IMAGE}"
                sh "docker push ${FRONTEND_IMAGE}"
            }
        }

        stage('Step 4: Clean & Deploy') {
            steps {
                echo 'Cleaning old containers and deploying on 8085/8086...'
                sh "docker rm -f node-api-amarjeet react-web-amarjeet || true"
                sh "docker run -d --name node-api-amarjeet -p 8086:5000 ${BACKEND_IMAGE}"
                sh "docker run -d --name react-web-amarjeet -p 8085:80 ${FRONTEND_IMAGE}"
            }
        }
    }
}