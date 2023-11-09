const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "squ_93a221bf2dfdeb1a4df4a0edd8f664692e576a12",
    options: {
      "sonar.projectName": "pixell-lite-web",
      "sonar.projectDescription": "Here I can add a description of my project",
      "sonar.projectKey": "pixell-lite-web",
      "sonar.projectVersion": "0.0.1",
      "sonar.exclusions": "",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => process.exit()
);
