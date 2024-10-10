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
        stage('Clone Repository') {
            steps {
                echo 'Cloning the repository...'
                git url: GIT_REPO_URL, branch: GIT_BRANCH
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir(BACKEND_DIR) {
                    echo 'Installing dependencies for the NestJS backend...'
                    cache(path: './node_modules', key: "${GIT_BRANCH}-backend", restoreKeys: ["${GIT_BRANCH}-backend"]) {
                        sh 'npm install'
                    }
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                dir(FRONTEND_DIR) {
                    echo 'Installing dependencies for the ReactJS frontend...'
                    cache(path: './node_modules', key: "${GIT_BRANCH}-frontend", restoreKeys: ["${GIT_BRANCH}-frontend"]) {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('SonarQube Analysis - Backend') {
            steps {
                script {
                    withSonarQubeEnv('sonarqube') {
                        dir(BACKEND_DIR) {
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
                    withSonarQubeEnv('sonarqube') {
                        dir(FRONTEND_DIR) {
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
                        sh 'docker build -t mohamedamine1/backend-azure:latest .'
                    }
                }  
            }
        }
        
        stage('Build Docker Image - Frontend') {
            steps {
                script {
                    dir(FRONTEND_DIR) { 
                        sh 'docker build -t mohamedamine1/frontend-azure:latest .' 
                    }
                }  
            }
        }
        
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                        sh 'docker login -u mohamedamine1 -p ${dockerhubpwd}'
                        sh 'docker push mohamedamine1/backend-azure:latest'
                        sh 'docker push mohamedamine1/frontend-azure:latest' 
                    }
                }  
            }
        }
    }
}
