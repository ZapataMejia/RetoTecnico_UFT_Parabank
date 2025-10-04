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
                sh 'rm -f junit-report.xml || true' 
                sh "docker run --rm -v ${WORKSPACE}:/usr/src/app ${DOCKER_IMAGE} npx playwright test --reporter=junit"
            }
        }
        
        stage('Publish Test Results') {
            steps {
                sh 'ls -l junit-report.xml || true' 
                junit 'junit-report.xml' 
                echo 'Pruebas finalizadas. Revisa los resultados publicados.'
            }
        }
    }
}