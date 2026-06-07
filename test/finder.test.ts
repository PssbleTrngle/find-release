import { getOctokit } from "@actions/github";
import { expect, it } from "bun:test";
import findRelease from "../src/finder";

const repo = { owner: "PssbleTrngle", repo: "find-release" };

it("finds latest draft", async () => {
  const octokit = getOctokit(process.env.GITHUB_TOKEN!!);

  const actual = await findRelease(octokit, repo, { type: "draft" });

  expect(actual).not.toBeNull();
});

it("finds latest for branch", async () => {
  const octokit = getOctokit(process.env.GITHUB_TOKEN!!);

  const actual = await findRelease(octokit, repo, {
    branch: "main/common/1.21.x",
  });

  expect(actual).not.toBeNull();
});
