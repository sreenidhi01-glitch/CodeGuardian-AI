def generate_pr_review(findings, security_score):
    """
    Generates an AI-style Pull Request review.
    """

    strengths = []
    concerns = []

    if security_score >= 90:
        strengths.append("No critical security vulnerabilities detected.")
        strengths.append("Code follows secure development practices.")
    elif security_score >= 70:
        strengths.append("Most security practices are followed.")
        concerns.append("Some improvements are recommended.")
    else:
        concerns.append("Multiple security issues were detected.")
        concerns.append("Immediate attention is recommended.")

    # Analyze findings
    for finding in findings:
        issue = finding["type"]

        if issue == "Hardcoded Secret":
            concerns.append("Sensitive credentials are hardcoded.")
        elif issue == "SQL Injection":
            concerns.append("Database queries may be vulnerable to SQL Injection.")
        elif issue == "Command Injection":
            concerns.append("External commands are not safely executed.")
        elif issue == "Weak Cryptography":
            concerns.append("Weak encryption algorithm detected.")
        elif issue == "Unsafe Dependency":
            concerns.append("Project contains insecure dependencies.")

    # Remove duplicates
    strengths = list(dict.fromkeys(strengths))
    concerns = list(dict.fromkeys(concerns))

    recommendation = (
        "✅ Approved"
        if security_score >= 80
        else "❌ Changes Requested"
    )

    summary = (
        "The pull request was automatically reviewed by CodeGuardian AI. "
        "Security analysis, static analysis, dependency scanning, and architecture checks were completed."
    )

    return {
        "status": recommendation,
        "summary": summary,
        "strengths": strengths,
        "concerns": concerns,
    }