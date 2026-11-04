pipeline {
    agent any

    environment {
        NODE_OPTIONS = '--dns-result-order=ipv4first'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'sudo -n -u dattaraj /usr/local/bin/deploy-nextastra'
            }
        }
    }
}
