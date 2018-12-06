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
    }

    build job: 'teploy', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]

    
}