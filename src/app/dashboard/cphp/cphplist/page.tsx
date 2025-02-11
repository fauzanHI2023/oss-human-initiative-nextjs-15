import React from "react";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";
import { BookCheck, ListChecks, BookmarkX } from "lucide-react";

const CPHPList: React.FC = () => {
  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 border shadow-xl rounded-xl dark:bg-slate-900 bg-white">
          <h5 className="text-xl font-bold">History CPHP</h5>
          <Tabs defaultValue="verified" className="w-full">
            <TabsList className="w-full flex flex-row">
              <TabsTrigger value="verified" className="w-1/3">
                <BookCheck className="mr-2 h-4 w-4" /> Verified
              </TabsTrigger>
              <TabsTrigger value="revision" className="w-1/3">
                <ListChecks className="mr-2 h-4 w-4" /> Revision
              </TabsTrigger>
              <TabsTrigger value="rejected" className="w-1/3">
                <ListChecks className="mr-2 h-4 w-4" /> Rejected
              </TabsTrigger>
              <TabsTrigger value="proposed" className="w-1/3">
                <ListChecks className="mr-2 h-4 w-4" /> Proposed
              </TabsTrigger>
              <TabsTrigger value="donated" className="w-1/3">
                <ListChecks className="mr-2 h-4 w-4" /> Donated
              </TabsTrigger>
            </TabsList>
            <TabsContent value="verified" className="mt-3">
              <div>
                <h6>Verified CPHP</h6>
              </div>
            </TabsContent>
            <TabsContent value="revision" className="mt-3">
              <div>
                <h6>Revision CPHP</h6>
              </div>
            </TabsContent>
            <TabsContent value="rejected" className="mt-3">
              <div>
                <h6>Rejected CPHP</h6>
              </div>
            </TabsContent>
            <TabsContent value="proposed" className="mt-3">
              <div>
                <h6>Proposed CPHP</h6>
              </div>
            </TabsContent>
            <TabsContent value="donated" className="mt-3">
              <div>
                <h6>Donated CPHP</h6>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default CPHPList;
