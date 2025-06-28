import Modal from "@/components/ui/modal";
import { Job } from "./types";

export default function ApplyModal({
  job,
  onAccept,
  onClose,
}: {
  job: Job;
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
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={onClose}
        >
          Annuleer
        </button>
        <button
          className="px-4 py-2 bg-[#F1592A] hover:bg-[#F1592A]/90 text-white rounded"
          onClick={onAccept}
        >
          Solliciteer
        </button>
      </div>
    </Modal>
  );
}
