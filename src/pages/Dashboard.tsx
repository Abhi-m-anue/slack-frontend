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
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChannelContext from "@/contexts/ChannelContext";
import Chat from "@/components/Chat";

export default function Dashboard() {
  const navigate = useNavigate();

  const { setChannels, setSelectedChannel } = useContext(ChannelContext);

  const fetchChannels = async () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/channels`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChannels(response.data?.channels)
        setSelectedChannel(response.data?.channels[0])
      } catch (err) {
        console.log(err);
        navigate("/sign-in");
      }
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
      <SidebarProvider>
        {/* Navigation bar on left*/}
        <AppSidebar />
        {/* Main content */}
        <SidebarInset>
          {/* content header */}
          <header className="flex shrink-0 items-center gap-2 py-4 px-2 h-max">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="bg-violet-800 text-white hover:bg-violet-800 hover:text-white !text-4xl !font-bold h-12 w-12 !rounded-full flex justify-center items-center" />
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
            <Chat></Chat>
            {/* <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
            <div className="mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50" /> */}
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
}
