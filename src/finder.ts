import type { GitHub } from "@actions/github/lib/utils";
import type { components } from "@octokit/openapi-types/types";

type Octokit = InstanceType<typeof GitHub>;
type Release = components["schemas"]["release"];
type RepoSeach = { repo: string; owner: string };
type Filter = { branch?: string; type?: "released" | "draft" };

function buildPredicate(filter: Filter) {
  return (it: Release) => {
    if (filter.branch && it.target_commitish !== filter.branch) return false;
    if (filter.type === "released" && it.draft) return false;
    if (filter.type === "draft" && !it.draft) return false;
    return true;
  };
}

export default async function findRelease(
  octokit: Octokit,
  repo: RepoSeach,
  filter: Filter = {},
) {
  const predicate = buildPredicate(filter);
  for await (const { data } of octokit.paginate.iterator(
    octokit.rest.repos.listReleases,
    repo,
  )) {
    console.log(data.map((it) => it.draft));
    const match = data.find(predicate);
    if (match) return match;
  }

  return null;
}
