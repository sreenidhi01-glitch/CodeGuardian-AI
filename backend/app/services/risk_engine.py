SEVERITY_POINTS = {
    "Critical": 40,
    "High": 20,
    "Medium": 10,
    "Low": 5
}


def calculate_risk(findings):
    score = 100

    for finding in findings:
        severity = finding["severity"]
        score -= SEVERITY_POINTS.get(severity, 0)

    score = max(score, 0)

    if score >= 80:
        level = "Low Risk"
    elif score >= 60:
        level = "Moderate Risk"
    elif score >= 40:
        level = "High Risk"
    else:
        level = "Critical Risk"

    return {
        "security_score": score,
        "risk_level": level
    }