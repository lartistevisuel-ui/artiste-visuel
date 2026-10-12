import ProjectPage, { projectMetadata } from "../ProjectPage";

export const metadata = projectMetadata("number-one");

export default function Page() {
  return <ProjectPage slug="number-one" />;
}
