import { IconLoader2, IconUser } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Page() {
  return (
    <div className="flex flex-col items-start gap-8">
      <div className="flex gap-4">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="flex gap-4">
        <Button disabled variant="default">
          <IconLoader2 className="mr-2 animate-spin" size={20} /> Loading
        </Button>
        <Button variant="default">
          <IconUser className="mr-2" size={20} /> With Icon
        </Button>
      </div>

      <div className="flex items-start gap-4">
        <Input placeholder="Default" />
        <Input disabled placeholder="Disabled" />
      </div>

      <div className="flex items-start gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Default</Label>
          <Input placeholder="Default" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Disabled</Label>
          <Input disabled placeholder="Disabled" />
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Default</Label>
          <Input placeholder="Default" />
          <p className="text-sm text-muted-foreground">Default</p>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>Disabled</Label>
          <Input disabled placeholder="Disabled" />
          <p className="text-sm text-muted-foreground">Disabled</p>
        </div>
      </div>

      <div className="flex items-start gap-12">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
      </Tabs>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
