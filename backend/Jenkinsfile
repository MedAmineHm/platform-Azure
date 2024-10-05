pipeline {
    agent any
    tools { 
        nodejs "NODE_HOME" // Replace "NODE_HOME" with your Node.js tool name
    }
    stages {
        stage ('Build') {
            steps {
                script {
                    try {
                        git branch: 'main', url: 'https://github.com/MedAmineHm/pfe-insomea-backend.git'
                        sh 'npm install'
                    } catch (err) {
                        echo "An error occurred during the build stage: ${err}"
                        error "Build stage failed"
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
