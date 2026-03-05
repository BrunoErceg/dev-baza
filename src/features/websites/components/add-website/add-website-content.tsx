import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@ui/sheet";

export function AddWebsiteContent({ children }: { children: React.ReactNode }) {
  return (
    <SheetContent className="w-[90vw] md:max-w-lg">
      <SheetHeader>
        <SheetTitle>Dodaj web stranicu</SheetTitle>
        <SheetDescription>Ispunite sva polja u nastavku</SheetDescription>
      </SheetHeader>

      {children}
    </SheetContent>
  );
}
