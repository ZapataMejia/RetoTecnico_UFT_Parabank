pipeline {
    agent any

    environment {
        CI = 'true'
        DOCKER_IMAGE = 'playwright-parabank-ci'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npx playwright test --reporter=junit'
                    }
                }
            }
        }
        
        stage('Publish Test Results') {
            when {
                always()
            }
            steps {
                junit 'test-results/junit.xml'
                
                echo 'Pruebas finalizadas. Revisa los resultados publicados.'
            }
        }
    }
}