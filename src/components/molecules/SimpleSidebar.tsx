import { BaseComponent } from "@/utils/types";
import { Sheet, SheetTrigger } from "../atoms/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export function Simplesidebar({ children }: BaseComponent) {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
      </Sheet>
    </div>
  );
}
