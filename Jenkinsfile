pipeline {
    agent any 

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/ZapataMejia/RetoTecnico_UFT_Parabank', credentialsId: 'github-santiago' 
            }
        }
        
        stage('Setup Dependencies') {
            steps {
                sh 'npm install' 
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Execute Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=junit --workers=1'
            }
        }
        
        stage('Publish Artifacts') {
            steps {
                junit 'test-results/junit.xml' 
            }
        }
    }
}