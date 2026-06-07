import { getOctokit } from "@actions/github";
import { expect, it } from "bun:test";
import findRelease from "../src/finder";

it("finds latest draft", async () => {
  const octokit = getOctokit(process.env.GITHUB_TOKEN!!);

  const actual = await findRelease(
    octokit,
    { owner: "PssbleTrngle", repo: "TestMod" },
    { type: "draft" },
  );

  expect(actual).not.toBeNull();
});

it("finds latest for branch", async () => {
  const octokit = getOctokit(process.env.GITHUB_TOKEN!!);

  const actual = await findRelease(
    octokit,
    { owner: "PssbleTrngle", repo: "TestMod" },
    { branch: "main/common/1.21.x" },
  );

  expect(actual).not.toBeNull();
});
