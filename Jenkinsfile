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
                sh "docker run --rm -u 1000:1000 -v ${WORKSPACE}:/usr/src/app ${DOCKER_IMAGE} sh -c \"chown -R 1000:1000 . && npx playwright test --reporter=junit\""
            }
        }
        
        stage('Publish Test Results') {
            steps {
                sh 'ls -l junit-report.xml' 
                junit 'junit-report.xml' 
                echo 'Pruebas finalizadas. Revisa los resultados publicados.'
            }
        }
    }
}