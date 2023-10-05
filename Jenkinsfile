#!/usr/bin/env groovy
pipeline {
    agent any
    tools {
        nodejs 'NodeJS 18'
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
    }
}