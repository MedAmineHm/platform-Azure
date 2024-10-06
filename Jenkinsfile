pipeline {
    agent any
    tools { 
        nodejs "NODE_HOME" 
    }
    environment {
        FRONTEND_DIR = 'frontend'   
        BACKEND_DIR = 'backend' 
        GIT_REPO_URL = 'https://github.com/MedAmineHm/platform-azure.git'    
        GIT_BRANCH = 'main'
    }
    stages {
        stage('Install Backend Dependencies') {
            steps {
                dir(BACKEND_DIR) {
                    echo 'Installing dependencies for the NestJS backend...'
                    sh 'npm install'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                dir(FRONTEND_DIR) {
                    echo 'Installing dependencies for the ReactJS frontend...'
                    sh 'rm -rf node_modules package-lock.json'
                    sh 'npm install'
                }
            }
        }

        stage('SonarQube Analysis - Backend') {
            steps {
                script {
                    withSonarQubeEnv('sonarqube') {
                        dir(BACKEND_DIR) {
                            // Install sonar-scanner if not already installed in your environment
                            sh 'npm install sonar-scanner'
                            sh 'npm run sonar'
                        }
                    }     
                } 
            }
        }

        stage('SonarQube Analysis - Frontend') {
            steps {
                script {
                    withSonarQubeEnv('sonar') {
                        dir(FRONTEND_DIR) {
                            // Install sonar-scanner if not already installed in your environment
                            sh 'npm install sonar-scanner'
                            sh 'npm run sonar'
                        }
                    }     
                } 
            }
        }

        stage('Build Docker Image - Backend') {
            steps {
                script {
                    dir(BACKEND_DIR) { 
                        sh 'docker build -t mohamedamine1/backend-azure:backend .'
                    }
                }  
            }
        }
        
        stage('Build Docker Image - Frontend') {
            steps {
                script {
                    dir(FRONTEND_DIR) { 
                        sh 'docker build -t mohamedamine1/frontend-azure:frontend .' // Corrected image tag
                    }
                }  
            }
        }
        
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                        sh 'docker login -u mohamedamine1 -p ${dockerhubpwd}'
                        sh 'docker push mohamedamine1/backend-azure:backend'
                        sh 'docker push mohamedamine1/frontend-azure:frontend' // Corrected image tag
                    }
                }  
            }
        }
    } // Ensure this closing brace is present
}
