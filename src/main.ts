import * as core from "@actions/core";
import * as github from "@actions/github";
import findRelease, { type Filter } from "./finder";

const token = core.getInput("token", { required: true });

const octokit = github.getOctokit(token);

const { repo, ref } = github.context;
const branchPrefix = "refs/heads/";

function parseBranchInput() {
  const input = core.getInput("branch");
  if (!input) {
    if (ref.startsWith(branchPrefix)) return ref.substring(branchPrefix.length);
    throw new Error("cannot decode branch from ref, please pass manually");
  }

  if (input === "*") return undefined;
  return input;
}

const type = core.getInput("type") as Filter["type"];
const branch = parseBranchInput();

const match = await findRelease(octokit, repo, { type, branch });

core.setOutput("matched", !!match);
core.setOutput("match", match);
core.setOutput("tag", match?.tag_name);
