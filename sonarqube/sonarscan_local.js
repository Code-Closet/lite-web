const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "sqp_86ebb01df9d5d44fb84a69ef610e653ffb5da4d6",
        options: {
            'sonar.projectName': 'pixell-lite-web',
            'sonar.projectDescription': 'Here I can add a description of my project',
            'sonar.projectKey': 'pixell-lite-web',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)