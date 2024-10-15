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
        DOCKER_USERNAME = 'mohamedamine1'
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
                            def buildNumber = env.BUILD_NUMBER ?: 'latest'  // Fallback to 'latest' if not available
                            def dockerImageBackend = "${DOCKER_USERNAME}/backend-azure:${buildNumber}"
                            dir(BACKEND_DIR) { 
                                sh "docker build -t ${dockerImageBackend} ."
                            }
                        }  
                    }
                }
                stage('Build Docker Image - Frontend') {
                    steps {
                        script {
                            def buildNumber = env.BUILD_NUMBER ?: 'latest'  // Fallback to 'latest' if not available
                            def dockerImageFrontend = "${DOCKER_USERNAME}/frontend-azure:${buildNumber}"
                            dir(FRONTEND_DIR) { 
                                sh "docker build -t ${dockerImageFrontend} ." 
                            }
                        }  
                    }
                }
            }
        }

        /*stage('Trivy Security Scan') {
            parallel {
                stage('Trivy Scan - Backend') {
                    steps {
                        script {
                            echo 'Scanning the backend Docker image for vulnerabilities...'
                            sh "trivy image --severity HIGH,CRITICAL --output backend-scan-results.json ${DOCKER_USERNAME}/backend-azure:${env.BUILD_NUMBER}"
                        }
                    }
                }
                stage('Trivy Scan - Frontend') {
                    steps {
                        script {
                            echo 'Scanning the frontend Docker image for vulnerabilities...'
                            sh "trivy image --severity HIGH,CRITICAL --output frontend-scan-results.json ${DOCKER_USERNAME}/frontend-azure:${env.BUILD_NUMBER}"
                        }
                    }
                }
            }
        }*/
        

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                        sh 'docker login -u ${DOCKER_USERNAME} -p ${dockerhubpwd}'
                        sh "docker push ${DOCKER_USERNAME}/backend-azure:${env.BUILD_NUMBER}"
                        sh "docker push ${DOCKER_USERNAME}/frontend-azure:${env.BUILD_NUMBER}" 
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
                    kubernetesDeploy(configs: "${SECRET_YAML_PATH}", kubeconfigId: "Kubernetes")  //aaaaaa
        }
      }
    }
    }
   
}
