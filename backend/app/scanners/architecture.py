import re

ARCHITECTURE_RULES = {
    "Debug Mode Enabled": {
        "pattern": r"debug\s*=\s*True",
        "severity": "Medium",
    },
    "Permissive CORS Policy": {
        "pattern": r'allow_origins\s*=\s*\["\*"\]',
        "severity": "High",
    },
    "HTTP URL Detected": {
        "pattern": r"http://",
        "severity": "Medium",
    },
    "Hardcoded Database URL": {
        "pattern": r"(DATABASE_URL|database_url)\s*=\s*[\"'].*[\"']",
        "severity": "High",
    },
    "Root User Execution": {
        "pattern": r"user\s*=\s*[\"']root[\"']",
        "severity": "Critical",
    },
    "Disabled SSL Verification": {
        "pattern": r"verify\s*=\s*False",
        "severity": "High",
    },
    "Wildcard Host Binding": {
        "pattern": r"0\.0\.0\.0",
        "severity": "Medium",
    },
}


def scan_architecture(code: str):
    findings = []

    for line_no, line in enumerate(code.splitlines(), start=1):
        for rule_name, rule in ARCHITECTURE_RULES.items():
            if re.search(rule["pattern"], line):
                findings.append({
                    "type": rule_name,
                    "severity": rule["severity"],
                    "line": line_no,
                    "code": line.strip(),
                })

    return findings