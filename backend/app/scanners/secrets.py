import re

PATTERNS = {
    "Hardcoded Password": {
        "pattern": r'password\s*=\s*["\'].*?["\']',
        "severity": "High"
    },
    "API Key": {
        "pattern": r'api[_-]?key\s*=\s*["\'].*?["\']',
        "severity": "High"
    },
    "GitHub Token": {
        "pattern": r'ghp_[A-Za-z0-9]{36}',
        "severity": "Critical"
    },
    "AWS Access Key": {
        "pattern": r'AKIA[0-9A-Z]{16}',
        "severity": "Critical"
    },
    "JWT Token": {
        "pattern": r'eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+',
        "severity": "Medium"
    },
    "Private Key": {
        "pattern": r'-----BEGIN PRIVATE KEY-----',
        "severity": "Critical"
    }
}


def scan_secrets(code: str):
    findings = []

    for line_number, line in enumerate(code.splitlines(), start=1):

        for secret_name, config in PATTERNS.items():

            if re.search(config["pattern"], line):

                findings.append({
                    "type": secret_name,
                    "severity": config["severity"],
                    "line": line_number,
                    "code": line.strip()
                })

    return findings