import * as core from "@actions/core";
import * as github from "@actions/github";
import findRelease, { type Filter } from "./finder";

console.log("context", github.context);
console.log("token", github.context.token);
const token = core.getInput("token");

const octokit = github.getOctokit(token);

const { repo } = github.context;

const filter: Filter = {
  branch: core.getInput("branch"),
  type: core.getInput("type") as Filter["type"],
};

const match = await findRelease(octokit, repo, filter);

core.setOutput("matched", !!match);
core.setOutput("match", match);
