import re


VULNERABLE_PACKAGES = {
    "django": {
        "1.11": ("Critical", "Django 1.11 has multiple known CVEs. Upgrade to the latest LTS version.")
    },
    "flask": {
        "0.12": ("High", "Flask 0.12 is outdated and contains security issues.")
    },
    "requests": {
        "2.19": ("High", "Old Requests version with known vulnerabilities.")
    },
    "urllib3": {
        "1.24": ("Medium", "Upgrade urllib3 to a supported secure version.")
    },
    "pyyaml": {
        "5.3": ("High", "Older PyYAML versions contain unsafe loading vulnerabilities.")
    }
}


def scan_dependencies(code: str):
    findings = []

    for line_no, line in enumerate(code.splitlines(), start=1):

        match = re.match(r"([A-Za-z0-9_\-]+)==([0-9\.]+)", line.strip())

        if not match:
            continue

        package = match.group(1).lower()
        version = match.group(2)

        if package in VULNERABLE_PACKAGES:

            vulnerable_versions = VULNERABLE_PACKAGES[package]

            if version in vulnerable_versions:

                severity, reason = vulnerable_versions[version]

                findings.append({
                    "type": "Vulnerable Dependency",
                    "severity": severity,
                    "line": line_no,
                    "code": line.strip(),
                    "why": reason,
                    "fix": f"Upgrade {package} to the latest stable version.",
                    "example": f"{package}>=latest",
                    "best_practice": "Regularly update dependencies and monitor CVEs."
                })

    return findings