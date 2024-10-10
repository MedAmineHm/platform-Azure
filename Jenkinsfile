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
        IMAGE_NAMES = ['mohamedamine1/backend-azure', 'mohamedamine1/frontend-azure'] // Liste des images à conserver
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
                            withSonarQubeEnv('sonarqube') {
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

        // Étape de nettoyage
        stage('Cleanup') {
            steps {
                echo 'Cleaning up unused Docker images...'
                script {
                    // Supprime les images de backend et frontend qui ont un tag différent de "latest" ou "<none>"
                    def images = sh(script: 'docker images', returnStdout: true).trim().split("\n").drop(1) // Ignorer l'en-tête
                    for (image in images) {
                        def details = image.trim().split("\\s+")
                        def repository = details[0]
                        def tag = details[1]

                        // Vérifie si l'image fait partie des images à gérer
                        if ((repository == 'mohamedamine1/backend-azure' || repository == 'mohamedamine1/frontend-azure') && 
                            (tag != 'latest' && tag != '<none>')) {
                            sh "docker rmi -f ${details[2]}" // Supprime l'image
                        }
                    }
                }
            }
        }
    }
}
