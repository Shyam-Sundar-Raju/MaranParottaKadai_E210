import ProjectItem from "./ProjectItem";
import UserMenu from "../common/UserMenu";
import { Button } from "../ui/button";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r flex flex-col">
      <div className="p-4 font-semibold text-lg">
        Learning AI
      </div>

      <div className="flex-1 overflow-y-auto">
        <ProjectItem title="Grade 6 Biology" />
        <ProjectItem title="Physics Basics" />
      </div>

      <div className="p-4 space-y-2">
        <Button variant="outline" className="w-full">
          + New Project
        </Button>
        <UserMenu />
      </div>
    </div>
  );
}
