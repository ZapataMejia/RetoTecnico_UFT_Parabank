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
                sh "docker run --rm -v ${WORKSPACE}:/usr/src/app ${DOCKER_IMAGE} npx playwright test --reporter=junit"
            }
        }
        
        stage('Publish Test Results') {
            steps {
                junit 'test-results/junit.xml'
                
                echo 'Pruebas finalizadas. Revisa los resultados publicados.'
            }
        }
    }
}