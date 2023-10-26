#!/usr/bin/env groovy
pipeline {
    agent any
    tools {
        nodejs 'NodeJS 18'
    }

    environment {
        AWS_ACCOUNT_ID="871995868589"
        AWS_DEFAULT_REGION="ap-south-1"
        IMAGE_REPO_NAME="pixell-lite-web"
        IMAGE_TAG="latest"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }

    stages {
        stage('Git Checkout') {
            steps {
                script {
                    git branch: 'main',
                        credentialsId: 'f83747f7-5fa4-45b5-8bbf-c4bc2a399daa',
                        url: 'https://git-codecommit.ap-south-1.amazonaws.com/v1/repos/pixell-lite-web'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                    echo "Happy Linting ..."
                    sh 'npx lerna run lint'
                    echo "Building the app ..."
                    sh 'npx lerna run build'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    echo "Testing ..."
                    sh 'npx lerna run test'
                }
            }
        }
        stage('Sonarqube Scan') {
            steps {
                script {
                    echo "Sonarqube scanning ..."
                    sh 'node ./sonarqube/sonarscan.js'
                }
            }
        }
        stage('deploy'){
            steps {
                script {
                    echo "Deploying ..."
                    sh 'aws s3 sync $WORKSPACE/packages/web/build s3://dev-pixellpay-web/ --sse --profile default'
                }
            }
        }

        // Building Docker images
        stage('Building image') {
            steps{
                script {
                    sh "docker build -t ${REPOSITORY_URI}:${IMAGE_TAG} ."
                }
            }
        }
        stage('Pushing image') {
            steps{
                script {
                    sh """aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"""
                    sh "docker push ${REPOSITORY_URI}:${IMAGE_TAG}"
                }
            }
        }
    }
}