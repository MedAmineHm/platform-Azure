pipeline {
    agent any
    tools { 
        nodejs "NODE_HOME" // Replace "NODE_HOME" with your Node.js tool name
    }
       environment {
        FRONTEND_DIR = 'frontend'   
        BACKEND_DIR = 'backend' 
        GIT_REPO_URL = 'https://github.com/MedAmineHm/platform-azure.git'    
        GIT_BRANCH = 'main'
    }
    stages {
   stage('Preparation') {
            steps {
                script {
                    echo "Préparation de l'environnement"
                    echo "Clonage du dépôt Git"
                    sh "git clone -b ${GIT_BRANCH} ${GIT_REPO_URL} ."
                }
            }
        }
        stage('Install Dependencies') {
            parallel {
                stage('Install Frontend Dependencies') {
                    steps {
                        dir(FRONTEND_DIR) {
                            echo 'Installation des dépendances pour le frontend ReactJS'
                            sh 'npm install'
                        }
                    }
                }

                stage('Install Backend Dependencies') {
                    steps {
                        dir(BACKEND_DIR) {
                            echo 'Installation des dépendances pour le backend NestJS'
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv ('sonarqube') {
                        sh 'npm install sonar-scanner'
                        sh 'npm run sonar'
                    }     
                } 
            }
        }
        stage('buils docker image') {
            steps{
              script{
                sh 'docker build -t mohamedamine1/backend-azure:backend . '
              }  
            }
        }
        stage('push image to dockerhub') {
            steps{
              script{
                withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                    sh 'docker login -u mohamedamine1 -p ${dockerhubpwd}'
                    sh 'docker push mohamedamine1/backend-azure:backend '
    
}
              }  
            }
        }


    }
}
