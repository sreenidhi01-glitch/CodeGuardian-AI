from io import BytesIO
from datetime import datetime

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Preformatted,
)


def generate_pdf(result):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    elements = []

    # ============================================================
    # HEADER
    # ============================================================

    elements.append(
        Paragraph(
            "<b>CodeGuardian AI</b>",
            styles["Title"],
        )
    )

    elements.append(
        Paragraph(
            "AI-Powered Secure Code Review Assistant",
            styles["Heading2"],
        )
    )

    elements.append(
        Paragraph(
            "Professional Security Assessment Report",
            styles["Heading3"],
        )
    )

    elements.append(Spacer(1, 12))

    elements.append(
        Paragraph(
            f"<b>Generated:</b> {datetime.now().strftime('%d %B %Y, %I:%M %p')}",
            styles["Normal"],
        )
    )

    elements.append(Spacer(1, 15))

    # ============================================================
    # REPOSITORY DETAILS
    # ============================================================

    if "repository" in result:

        elements.append(
            Paragraph(
                f"<b>Repository:</b> {result['repository']}",
                styles["Heading2"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Pull Request:</b> #{result['pull_request']}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Files Scanned:</b> {result['files_scanned']}",
                styles["Normal"],
            )
        )

    else:

        elements.append(
            Paragraph(
                "<b>Scan Type:</b> Uploaded Source File",
                styles["Heading2"],
            )
        )

    elements.append(Spacer(1, 15))

    # ============================================================
    # EXECUTIVE SUMMARY
    # ============================================================

    elements.append(
        Paragraph(
            "<b>Executive Summary</b>",
            styles["Heading1"],
        )
    )

    elements.append(
        Paragraph(
            "This report includes static code analysis, secret detection, dependency analysis, architecture review and AI-powered remediation recommendations.",
            styles["Normal"],
        )
    )

    elements.append(Spacer(1, 12))

    summary = [

        ("Security Score", f"{result['security_score']}/100"),

        ("Risk Level", result["risk_level"]),

        ("Total Findings", result["total_findings"])

    ]

    for label, value in summary:

        elements.append(

            Paragraph(

                f"<b>{label}:</b> {value}",

                styles["Heading2"]

            )

        )

    elements.append(Spacer(1, 15))

    # ============================================================
    # AI REVIEW
    # ============================================================

    review = result.get("review")

    if review:

        elements.append(
            Paragraph(
                "<b>AI Review</b>",
                styles["Heading1"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Status:</b> {review.get('status','-')}",
                styles["Normal"],
            )
        )

        elements.append(
            Paragraph(
                f"<b>Summary:</b> {review.get('summary','-')}",
                styles["Normal"],
            )
        )

        for title, key in [

            ("Strengths", "strengths"),

            ("Concerns", "concerns"),

            ("Priority Fixes", "priority_fixes"),

        ]:

            items = review.get(key, [])

            if items:

                elements.append(Spacer(1, 8))

                elements.append(
                    Paragraph(
                        f"<b>{title}</b>",
                        styles["Heading2"],
                    )
                )

                for item in items:

                    elements.append(
                        Paragraph(
                            f"• {item}",
                            styles["Normal"],
                        )
                    )

        elements.append(Spacer(1, 15))

    # ============================================================
    # SECURITY FINDINGS
    # ============================================================

    elements.append(
        Paragraph(
            "<b>Security Findings</b>",
            styles["Heading1"],
        )
    )

    findings = result.get("findings", [])

    if not findings:

        elements.append(
            Paragraph(
                "No security vulnerabilities detected.",
                styles["Normal"],
            )
        )

    else:

        for finding in findings:

            elements.append(Spacer(1, 12))

            elements.append(
                Paragraph(
                    "<hr/>",
                    styles["Normal"],
                )
            )

            for key, label in [

                ("type", "Type"),

                ("severity", "Severity"),

                ("file", "File"),

                ("line", "Line"),

            ]:

                if key in finding:

                    elements.append(
                        Paragraph(
                            f"<b>{label}:</b> {finding[key]}",
                            styles["Normal"],
                        )
                    )

            if "code" in finding:

                elements.append(
                    Paragraph(
                        "<b>Detected Code</b>",
                        styles["Heading3"],
                    )
                )

                elements.append(
                    Preformatted(
                        finding["code"],
                        styles["Code"] if "Code" in styles else styles["Normal"],
                    )
                )
                            # ============================================================
            # WHY
            # ============================================================

            if finding.get("why"):

                elements.append(
                    Paragraph(
                        f"<b>Why:</b> {finding['why']}",
                        styles["Normal"],
                    )
                )

            # ============================================================
            # RECOMMENDED FIX
            # ============================================================

            if finding.get("fix"):

                elements.append(
                    Paragraph(
                        f"<b>Recommended Fix:</b> {finding['fix']}",
                        styles["Normal"],
                    )
                )

            # ============================================================
            # BEST PRACTICE
            # ============================================================

            if finding.get("best_practice"):

                elements.append(
                    Paragraph(
                        f"<b>Best Practice:</b> {finding['best_practice']}",
                        styles["Normal"],
                    )
                )

            # ============================================================
            # FIX EXPLANATION
            # ============================================================

            if finding.get("fix_explanation"):

                elements.append(
                    Paragraph(
                        f"<b>Explanation:</b> {finding['fix_explanation']}",
                        styles["Normal"],
                    )
                )

            # ============================================================
            # VULNERABLE EXAMPLE
            # ============================================================

            if finding.get("vulnerable_code"):

                elements.append(Spacer(1, 8))

                elements.append(
                    Paragraph(
                        "<b>Vulnerable Example</b>",
                        styles["Heading3"],
                    )
                )

                elements.append(
                    Preformatted(
                        finding["vulnerable_code"],
                        styles["Code"]
                        if "Code" in styles
                        else styles["Normal"],
                    )
                )

            # ============================================================
            # SECURE EXAMPLE
            # ============================================================

            if finding.get("secure_code"):

                elements.append(Spacer(1, 8))

                elements.append(
                    Paragraph(
                        "<b>Secure Example</b>",
                        styles["Heading3"],
                    )
                )

                elements.append(
                    Preformatted(
                        finding["secure_code"],
                        styles["Code"]
                        if "Code" in styles
                        else styles["Normal"],
                    )
                )

            elements.append(Spacer(1, 15))

    # ============================================================
    # FINAL RECOMMENDATIONS
    # ============================================================

    elements.append(
        Paragraph(
            "<b>Final Recommendations</b>",
            styles["Heading1"],
        )
    )

    recommendations = [
        "Remove all hardcoded credentials from source code.",
        "Validate and sanitize all user inputs.",
        "Use parameterized SQL queries.",
        "Keep third-party dependencies updated.",
        "Run security scans before every deployment.",
        "Store secrets using environment variables or a secrets manager.",
        "Enable HTTPS and SSL verification.",
        "Apply the principle of least privilege."
    ]

    for rec in recommendations:

        elements.append(
            Paragraph(
                f"• {rec}",
                styles["Normal"],
            )
        )

    elements.append(Spacer(1, 20))

    # ============================================================
    # FOOTER
    # ============================================================

    elements.append(
        Paragraph(
            "<b>Generated by CodeGuardian AI</b>",
            styles["Heading2"],
        )
    )

    elements.append(
        Paragraph(
            "AI-Powered Secure Code Review Assistant",
            styles["Normal"],
        )
    )

    elements.append(
        Paragraph(
            "Version 1.0",
            styles["Normal"],
        )
    )

    elements.append(
        Paragraph(
            "Confidential Security Assessment Report",
            styles["Italic"],
        )
    )

    doc.build(elements)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf