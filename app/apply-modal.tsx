import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function ApplyModal({
  onAccept,
  onClose,
}: {
  onAccept: () => void;
  onClose: () => void;
}) {
  return (
    <Modal open onOpenChange={() => undefined}>
      <h2 className="text-lg font-semibold mb-4">Let op:</h2>
      <p className="mb-6">
        Je staat op het punt om de website van deze vacature te openen. Je wordt
        doorgestuurd naar een externe pagina buiten onze site.
      </p>
      <div className="flex justify-start gap-3">
        <Button
          className="px-4 py-2 border rounded hover:bg-gray-800"
          onClick={onClose}
        >
          Annuleer
        </Button>

        <Button
          className="px-4 py-2 bg-[#F1592A] hover:bg-[#F1592A]/90 text-white rounded"
          onClick={onAccept}
        >
          Solliciteer
        </Button>
      </div>
    </Modal>
  );
}
