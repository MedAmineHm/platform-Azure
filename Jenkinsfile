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
  stage('Build') {
    parallel {
        stage('Build frontend') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    dir(FRONTEND_DIR) {
                        echo 'Building the ReactJS frontend to generate the dist directory...'
                        sh 'CI=false npm run build'  // Build will continue even if there are warnings
                    }
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir(BACKEND_DIR) {
                    echo 'Building the NestJS backend to generate the dist directory...'
                    sh 'npm run build'
                }
            }
        }
    }
}


stage('Linting') {
    parallel {
        stage('Backend Linting') {
            steps {
                dir(BACKEND_DIR) {
                    echo 'Linting the backend code...'
                    sh 'npm run lint'
                }
            }
        }
        stage('Frontend Linting') {
            steps {
                dir(FRONTEND_DIR) {
                    echo 'Linting the frontend code...'
                    sh 'npm run lint'
                }
            }
        }
    }
}






                stage('SonarQube Analysis') {
    parallel {
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
                    withSonarQubeEnv('sonarqubee') {  
                        dir(FRONTEND_DIR) {
                            sh 'npm install sonar-scanner'
                            sh 'npm run sonar'
                        }
                    }
                }
            }
        }
    }
}

            
        

        stage('Build Docker Images') {
            parallel {
                stage('Build Docker Image - Backend') {
                    steps {
                        script {
                            dir(BACKEND_DIR) { 
                                sh "docker build -t mohamedamine1/backend:backend-pfe ."
                            }
                        }  
                    }
                }
                stage('Build Docker Image - Frontend') {
                    steps {
                        script {
                            dir(FRONTEND_DIR) { 
                                sh "docker build -t mohamedamine1/frontend:frontend-pfe ." 
                            }
                        }  
                    }
                }
            }
        }
        stage('Security Scanning - Docker Images') {
    parallel {
        stage('Scan Backend Docker Image') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL --cache-dir ~/.cache/trivy mohamedamine1/backend:backend-pfe'
            }
        }
        stage('Scan Frontend Docker Image') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL --cache-dir ~/.cache/trivy mohamedamine1/frontend:frontend-pfe'
            }
        }
    }
}

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                        sh '''
                            echo "${dockerhubpwd}" | docker login -u mohamedamine1 --password-stdin
                        '''
                        sh 'docker push mohamedamine1/backend:backend-pfe'
                        sh 'docker push mohamedamine1/frontend:frontend-pfe'
                    }
                }  
            }
        }
    }
}