import * as React from "react";
import { AudioWaveform, Command, Search } from "lucide-react";

import { NavMain } from "@/components/Navbar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { NavChannels } from "./nav-channels";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Innovin Labs",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Workspace 1",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Workspace 2",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "#",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "#",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "#",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "#",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "#",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "#",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "#",
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 py-3 pl-2" {...props}>
      <SidebarHeader className="bg-white">
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavChannels favorites={data.favorites} />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <NavUser user={data.user}></NavUser>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}