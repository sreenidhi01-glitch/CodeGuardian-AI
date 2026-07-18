from pydantic import BaseModel


class GitHubReviewRequest(BaseModel):
    repo: str
    pr_number: int
    github_token: str | None = None