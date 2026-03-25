import { SidebarProvider, SidebarTrigger } from "../../../../packages/ui/src/components/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <SidebarTrigger />
            {/* Тут можно добавить User Nav (аватарку пользователя) позже */}
            <div className="flex items-center gap-4">
               <span className="text-sm font-medium">Admin User</span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}