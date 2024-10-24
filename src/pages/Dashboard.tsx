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
        setChannels(response.data?.channels);
        setSelectedChannel(response.data?.channels[0]);
      } catch (err) {
        console.log(err);
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
      <SidebarInset className="flex max-h-[100vh] overflow-hidden">
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
        </header>
        {/* content body */}
        <Chat></Chat>
      </SidebarInset>
    </SidebarProvider>
  );
}
