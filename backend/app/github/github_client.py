from github import Github, GithubException
import requests


def get_pr_files(repo_name: str, pr_number: int, github_token: str = None):

    try:

        if github_token:
            gh = Github(github_token)
        else:
            gh = Github()


        print(f"Connecting to repository: {repo_name}")


        repo = gh.get_repo(repo_name)

        print("Repository found")


        pr = repo.get_pull(pr_number)

        print(f"PR #{pr_number} opened successfully")


        changed_files = []


        for file in pr.get_files():

            print("Reading:", file.filename)


            code = ""


            try:

                headers = {
                    "User-Agent": "CodeGuardian-AI"
                }


                if github_token:
                    headers["Authorization"] = f"token {github_token}"


                response = requests.get(
                    file.raw_url,
                    headers=headers,
                    timeout=10
                )


                if response.status_code == 200:
                    code = response.text

                else:
                    print(
                        "Download failed:",
                        response.status_code
                    )


            except Exception as e:
                print(
                    "File download error:",
                    e
                )


            changed_files.append(
                {
                    "filename": file.filename,
                    "status": file.status,
                    "changes": file.changes,
                    "content": code,
                    "patch": file.patch
                }
            )


        print(
            "Total files:",
            len(changed_files)
        )


        return changed_files



    except GithubException as e:

        print(
            "GitHub API Error:",
            e
        )

        return []


    except Exception as e:

        print(
            "Unexpected error:",
            e
        )

        return []