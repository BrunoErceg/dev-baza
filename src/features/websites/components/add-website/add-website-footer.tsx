import { Button } from "@ui/button";
import { SheetFooter } from "@ui/sheet";
import { Spinner } from "@ui/spinner";

export function AddWebsiteFooter({ loading }: { loading: boolean }) {
  return (
    <SheetFooter>
      <div className="flex justify-end">
        <Button
          type="submit"
          form="form-add-website"
          disabled={loading}
          className="w-45"
        >
          {loading ? <Spinner /> : "Dodaj web stranicu"}
        </Button>
      </div>
    </SheetFooter>
  );
}
