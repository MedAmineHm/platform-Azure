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
        TEMPLATES_DIR = 'templates'

        DEPLOYMENT_YAML_PATH = "${TEMPLATES_DIR}/deployment.yaml"
        SERVICE_YAML_PATH = "${TEMPLATES_DIR}/service.yaml"
        AZURE_SECRET_YAML_PATH = "${TEMPLATES_DIR}/azure-secrets.yaml"
        MONGO_PERSISTENT_VOLUME_YAML_PATH = "${TEMPLATES_DIR}/mongodb-persistent-volume.yaml"
        SECRET_YAML_PATH = "${TEMPLATES_DIR}/secret.yaml" 
    }
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning the repository...'
                git url: GIT_REPO_URL, branch: GIT_BRANCH
            }
        }

        stage('Install Dependencies') {
            parallel {
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
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        /*stage('SonarQube Analysis') {
            parallel {
                stage('SonarQube Analysis - Backend') {
                    steps {
                        script {
                            withSonarQubeEnv('sonarqube') {
                                dir(BACKEND_DIR) {
                                    sh 'npm install sonar-scanner'
                                    sh 'npm run sonar -Dsonar.qualityGate.wait=true'
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
                                    sh 'npm run sonar -Dsonar.qualityGate.wait=true' /aaaaa
                                }
                            }     
                        } 
                    }
                }
            }
        }*/

        stage('Build Docker Images') {
            parallel {
                stage('Build Docker Image - Backend') {
                    steps {
                        script {
                            
                            dir(BACKEND_DIR) { 
                                sh "docker build -t mohamedamine1/backend-azure:back ."
                            }
                        }  
                    }
                }
                stage('Build Docker Image - Frontend') {
                    steps {
                        script {
                            
                            dir(FRONTEND_DIR) { 
                                sh "docker build -t mohamedamine1/frontend-azure:front ." 
                            }
                        }  
                    }
                }
            }
        }

    

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                        sh 'docker login -u mohamedamine1 -p ${dockerhubpwd}'
                        sh "docker push mohamedamine1/backend-azure:latest"
                        sh "docker push mohamedamine1/frontend-azure:latest" 
                    }
                }  
            }
        }
        stage('Deploying App to Kubernetes') {
      steps {
        script {
                    kubernetesDeploy(configs: "${DEPLOYMENT_YAML_PATH}", kubeconfigId: "Kubernetes")
                    kubernetesDeploy(configs: "${SERVICE_YAML_PATH}", kubeconfigId: "Kubernetes")
                    kubernetesDeploy(configs: "${AZURE_SECRET_YAML_PATH}", kubeconfigId: "Kubernetes")
                    kubernetesDeploy(configs: "${MONGO_PERSISTENT_VOLUME_YAML_PATH}", kubeconfigId: "Kubernetes")
                    kubernetesDeploy(configs: "${SECRET_YAML_PATH}", kubeconfigId: "Kubernetes")  
        }
      }
    }
    }
   
}
