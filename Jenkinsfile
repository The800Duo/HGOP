node {
    def git = checkout scm
    stage("Clean") {
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh "git clean -dfxq"
        sh "git stash"
    }

    stage("Setup") {
        sh "cd game-api/ && npm install"

    }

    stage("Eslint") {
        sh "cd game-api/ && npm run eslint"
    }

    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

    stage("Tests") {
        sh "cd game-api/ && npm run test:unit"

        step([
            $class: 'CloverPublisher',
            cloverReportDir: 'coverage',
            cloverReportFileName: 'clover.xml',
            healthyTarget: [methodCoverage: 80, conditionalCoverage: 80, statementCoverage: 80],
            unhealthyTarget: [methodCoverage: 50, conditionalCoverage: 50, statementCoverage: 50],
            failingTarget: [methodCoverage: 0, conditionalCoverage: 0, statementCoverage: 0]
        ])
    }
    build job: 'apiTest', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]

    build job: 'capacityTest', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
    
    build job: 'teploy', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]   
}