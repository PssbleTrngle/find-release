import type { GitHub } from "@actions/github/lib/utils";
import type { components } from "@octokit/openapi-types/types";

type Octokit = InstanceType<typeof GitHub>;
type Release = components["schemas"]["release"];
type RepoSeach = { repo: string; owner: string };
export type Filter = { branch?: string; type?: "released" | "draft" };

type Predicate = (release: Release) => boolean;

function buildPredicate(filter: Filter): Predicate {
  const predicates: Predicate[] = [];
  if (filter.branch)
    predicates.push((it) => it.target_commitish !== filter.branch);

  if (filter.type) {
    if (filter.type === "released") predicates.push((it) => !it.draft);
    else if (filter.type === "draft") predicates.push((it) => it.draft);
    else throw new Error(`invalid parameter passed to filter '${filter.type}'`);
  }

  return (it) => predicates.every((predicate) => predicate(it));
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
    const match = data.find(predicate);
    if (match) return match;
  }

  return null;
}
