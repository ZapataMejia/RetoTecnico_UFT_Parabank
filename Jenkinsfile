pipeline {
    agent any 

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/ZapataMejia/RetoTecnico_UFT_Parabank', credentialsId: 'github-santiago' 
            }
        }
        
        stage('Execute UFT Functional Tests') {
            steps {
                bat '"C:/Program Files (x86)/Micro Focus/UFT One/bin/UFT.exe" -run -test "%WORKSPACE%/Parabank_Test/Parabank_Test.usr" -result "%WORKSPACE%/UFT_Reports"'
            }
        }
        
        stage('Publish Artifacts and Report') {
            steps {
                archiveArtifacts artifacts: 'UFT_Reports/**', onlyIfSuccessful: true
            }
        }
    }
}