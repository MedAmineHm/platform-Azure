pipeline {
    agent any
    tools { 
        nodejs "NODE_HOME" // Remplacez "NODE_HOME" par le nom de votre outil Node.js
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
                            echo 'Installation des dépendances pour le backend NestJS'
                            sh 'npm install'
                        }
                    }
                }
        
        
           
                stage('Install Frontend Dependencies') {
                    steps {
                        dir(FRONTEND_DIR) {
                            echo 'Installation des dépendances pour le frontend ReactJS'
                            sh 'npm install'
                        }
                    }
                }

               
            
        
        stage('SonarQube Analysis') {
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
        stage('Build Docker Image') {
            steps {
                script {
                    dir(BACKEND_DIR) { // Changez le répertoire à backend pour construire l'image
                        sh 'docker build -t mohamedamine1/backend-azure:backend .'
                    }
                }  
            }
        }
        stage('Push Image to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                        sh 'docker login -u mohamedamine1 -p ${dockerhubpwd}'
                        sh 'docker push mohamedamine1/backend-azure:backend'
                    }
                }  
            }
        }
    }
}
