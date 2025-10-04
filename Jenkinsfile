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
                sh "docker run --rm -v ${WORKSPACE}:/usr/src/app ${DOCKER_IMAGE} sh -c \"npx playwright test --reporter=junit > junit-report.xml && cat junit-report.xml\" > junit-report.xml"
            }
        }
        
        stage('Publish Test Results') {
            steps {
                junit 'junit-report.xml' 
                echo 'Pruebas finalizadas y resultados publicados.'
            }
        }
    }
}