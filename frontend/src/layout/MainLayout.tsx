import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import TopBar from "@/components/ui/TopBar";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen app-grid-bg text-foreground flex flex-col overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full overflow-hidden gap-0 p-3 md:p-4"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className="mx-1 w-2 rounded-full border border-primary/25 bg-white/5 shadow-[0_0_16px_-6px_hsl(var(--primary)/0.25)] transition-colors hover:border-primary/40 hover:bg-primary/15 hover:shadow-[0_0_24px_-8px_hsl(var(--primary)/0.35)] data-[panel-resize-handle-active]:border-primary/50 data-[panel-resize-handle-active]:bg-primary/25"
        />

        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <div className="main-shell-glow flex h-full min-h-0 flex-col overflow-hidden">
            <TopBar />
            <div className="min-h-0 flex-1 overflow-hidden">
              <Outlet />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
