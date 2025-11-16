import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export function MaintenanceSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Wrench className="w-16 h-16 text-gray-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Under Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-lg">
              This section is currently under maintenance. Please check back later.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
