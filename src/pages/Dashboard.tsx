"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Navbar/app-sidebar";
import { NavActions } from "@/components/Navbar/nav-actions";

export default function Dashboard() {
  return (
    <SidebarProvider>
      {/* Navigation bar on left*/}
      <AppSidebar/>
      {/* Main content */}
      <SidebarInset>
        {/* content header */}
        <header className="flex shrink-0 items-center gap-2 py-4 px-2 h-max">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="bg-violet-800 text-white hover:bg-violet-800 hover:text-white !text-4xl !font-bold h-12 w-12 !rounded-full flex justify-center items-center"/>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        {/* content body */}
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
          <div className="mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
