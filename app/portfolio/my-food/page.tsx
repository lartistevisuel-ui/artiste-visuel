import ProjectPage, { projectMetadata } from "../ProjectPage";

export const metadata = projectMetadata("my-food");

export default function Page() {
  return <ProjectPage slug="my-food" />;
}
