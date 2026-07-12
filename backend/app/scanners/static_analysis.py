import re

RULES = {
    "Dangerous eval()": {
        "pattern": r"\beval\s*\(",
        "severity": "High"
    },
    "Command Injection": {
        "pattern": r"os\.system\s*\(",
        "severity": "Critical"
    },
    "Unsafe Deserialization": {
        "pattern": r"pickle\.loads\s*\(",
        "severity": "High"
    },
    "Weak Hashing (MD5)": {
        "pattern": r"hashlib\.md5\s*\(",
        "severity": "Medium"
    },
    "Debug Mode Enabled": {
        "pattern": r"debug\s*=\s*True",
        "severity": "Low"
    }
}


def scan_static(code: str):
    findings = []

    for line_no, line in enumerate(code.splitlines(), start=1):
        for rule_name, rule in RULES.items():
            if re.search(rule["pattern"], line):
                findings.append({
                    "type": rule_name,
                    "severity": rule["severity"],
                    "line": line_no,
                    "code": line.strip()
                })

    return findings