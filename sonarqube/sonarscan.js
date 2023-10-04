const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "sqp_211bff6cdcf022629c96a46847776b6931fa97e0",
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