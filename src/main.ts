import * as core from "@actions/core";
import * as github from "@actions/github";

// This should be a token with access to your repository scoped in as a secret.
// The YML workflow will need to set myToken with the GitHub Secret Token
// myToken: ${{ secrets.GITHUB_TOKEN }}
// https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
const myToken = core.getInput("myToken");

const octokit = github.getOctokit(myToken);

const { repo } = github.context;

// You can also pass in additional options as a second parameter to getOctokit
// const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

for await (const { data } of octokit.paginate.iterator(
  octokit.rest.repos.listReleases,
  repo,
)) {
  console.log(data);
}
